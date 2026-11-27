import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const extractImageUrl = (prod) => {
  if (!prod) return "/images/products/strawberry-cake.jpg";
  if (typeof prod.image === "string" && prod.image.trim()) {
    return prod.image.trim();
  }
  if (Array.isArray(prod.image) && prod.image[0]?.url) {
    return prod.image[0].url;
  }
  if (Array.isArray(prod.images) && prod.images[0]?.url) {
    return prod.images[0].url;
  }
  if (prod.image?.url) {
    return prod.image.url;
  }
  return "/images/products/strawberry-cake.jpg";
};

const normalizeCartItem = (rawItem, fallbackQty = 1) => {
  if (!rawItem) return null;
  const pId = String(rawItem._id || rawItem.id || "").trim();
  const pName = String(rawItem.name || rawItem.title || "Bakery Sweet").trim();
  const pPrice = Number(rawItem.price) || 0;
  const pStock =
    rawItem.stock !== undefined && rawItem.stock !== null
      ? Number(rawItem.stock)
      : 25;
  const pQty = Math.max(1, Number(rawItem.quantity || fallbackQty) || 1);
  const pImage = extractImageUrl(rawItem);

  return {
    ...rawItem,
    _id: pId,
    id: pId,
    name: pName,
    price: pPrice,
    stock: pStock,
    image: pImage,
    quantity: pQty,
  };
};

const isSameProduct = (itemA, itemBOrId) => {
  if (!itemA || !itemBOrId) return false;

  const targetId =
    typeof itemBOrId === "object"
      ? String(itemBOrId._id || itemBOrId.id || "").trim()
      : String(itemBOrId).trim();

  const targetName =
    typeof itemBOrId === "object"
      ? String(itemBOrId.name || itemBOrId.title || "").trim().toLowerCase()
      : "";

  const aId = String(itemA._id || itemA.id || "").trim();
  const aName = String(itemA.name || itemA.title || "").trim().toLowerCase();

  if (targetId && aId && targetId === aId) return true;
  if (targetName && aName && targetName === aName) return true;

  return false;
};

const deduplicateCart = (items) => {
  if (!Array.isArray(items)) return [];
  const merged = [];

  for (const rawItem of items) {
    if (!rawItem) continue;
    const item = normalizeCartItem(rawItem, rawItem.quantity || 1);
    if (!item) continue;

    const existingIndex = merged.findIndex((m) => isSameProduct(m, item));
    if (existingIndex > -1) {
      merged[existingIndex] = {
        ...merged[existingIndex],
        ...item,
        quantity:
          (Number(merged[existingIndex].quantity) || 1) +
          (Number(item.quantity) || 1),
      };
    } else {
      merged.push(item);
    }
  }

  return merged;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("sugarMuseCart");
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      return deduplicateCart(parsed);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "sugarMuseCart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const qty = Math.max(1, Number(quantity) || 1);
    const itemToAdd = normalizeCartItem(product, qty);
    if (!itemToAdd) return;

    setCartItems((currentItems) => {
      const existingIndex = currentItems.findIndex((item) =>
        isSameProduct(item, itemToAdd)
      );

      if (existingIndex > -1) {
        return currentItems.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                ...itemToAdd,
                quantity: (Number(item.quantity) || 1) + qty,
              }
            : item
        );
      }

      return [...currentItems, itemToAdd];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        isSameProduct(item, productId)
          ? {
              ...item,
              quantity: (Number(item.quantity) || 1) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          isSameProduct(item, productId)
            ? {
                ...item,
                quantity: (Number(item.quantity) || 1) - 1,
              }
            : item
        )
        .filter((item) => (Number(item.quantity) || 0) > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => !isSameProduct(item, productId))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (Number(item.quantity) || 1),
      0
    );
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};

export default CartContext;
