import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

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
  if (targetId && aName && targetId.toLowerCase() === aName) return true;
  if (targetName && aName && targetName === aName) return true;

  return false;
};

const deduplicateCart = (items) => {
  if (!Array.isArray(items)) return [];
  const merged = [];

  for (const item of items) {
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
      merged.push({
        ...item,
        quantity: Math.max(1, Number(item.quantity) || 1),
      });
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
    setCartItems((currentItems) => {
      const existingIndex = currentItems.findIndex((item) =>
        isSameProduct(item, product)
      );

      if (existingIndex > -1) {
        return currentItems.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + qty,
              }
            : item
        );
      }

      const pId = product._id || product.id || "";
      return [
        ...currentItems,
        {
          ...product,
          _id: pId,
          id: pId,
          quantity: qty,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        isSameProduct(item, productId)
          ? {
              ...item,
              quantity: item.quantity + 1,
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
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
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
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price) * item.quantity,
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