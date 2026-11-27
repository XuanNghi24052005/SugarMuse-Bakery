const STORAGE_KEY =
  "sugarMuseRecentlyViewed";

const MAX_ITEMS = 8;

const getProductImage = (
  product
) => {
  if (!product) {
    return "";
  }

  if (
    typeof product.image ===
    "string"
  ) {
    return product.image;
  }

  if (
    Array.isArray(
      product.image
    ) &&
    product.image.length > 0
  ) {
    const firstImage =
      product.image[0];

    if (
      typeof firstImage ===
      "string"
    ) {
      return firstImage;
    }

    return (
      firstImage?.url ||
      ""
    );
  }

  if (
    Array.isArray(
      product.images
    ) &&
    product.images.length > 0
  ) {
    const firstImage =
      product.images[0];

    if (
      typeof firstImage ===
      "string"
    ) {
      return firstImage;
    }

    return (
      firstImage?.url ||
      ""
    );
  }

  return "";
};

export const getRecentlyViewed =
  () => {
    try {
      let saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!saved) {
        saved = localStorage.getItem("sugarMuserecentlyViewed");
      }

      if (!saved) {
        return [];
      }

      const parsed =
        JSON.parse(saved);

      return Array.isArray(
        parsed
      )
        ? parsed
        : [];
    } catch (error) {
      console.error(
        "Unable to read recently viewed products:",
        error
      );

      return [];
    }
  };

export const saveRecentlyViewed =
  (product) => {
    if (!product) {
      return [];
    }

    const productId =
      product._id ||
      product.id;

    if (!productId) {
      return [];
    }

    try {
      const current =
        getRecentlyViewed();

      const item = {
        id:
          String(
            productId
          ),

        name:
          product.name ||
          product.title ||
          "Sugar Muse Treat",

        price:
          Number(
            product.price
          ) || 0,

        image:
          getProductImage(
            product
          ),

        category:
          product.category ||
          "",

        subcategory:
          product.subcategory ||
          "",

        flavor:
          product.flavor ||
          "",

        ratings:
          Number(
            product.ratings
          ) || 0,

        numReviews:
          Number(
            product.numReviews
          ) || 0,

        slug:
          product.slug ||
          "",
      };

      const filtered =
        current.filter(
          (savedProduct) =>
            String(
              savedProduct.id
            ) !==
            String(
              productId
            )
        );

      const updated = [
        item,
        ...filtered,
      ].slice(
        0,
        MAX_ITEMS
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          updated
        )
      );

      return updated;
    } catch (error) {
      console.error(
        "Unable to save recently viewed product:",
        error
      );

      return [];
    }
  };

export const removeRecentlyViewed =
  (productId) => {
    try {
      const current =
        getRecentlyViewed();

      const updated =
        current.filter(
          (product) =>
            String(
              product.id
            ) !==
            String(
              productId
            )
        );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          updated
        )
      );

      return updated;
    } catch (error) {
      console.error(
        "Unable to remove recently viewed product:",
        error
      );

      return [];
    }
  };

export const clearRecentlyViewed =
  () => {
    try {
      localStorage.removeItem(
        STORAGE_KEY
      );

      return [];
    } catch (error) {
      console.error(
        "Unable to clear recently viewed products:",
        error
      );

      return [];
    }
  };

// Export aliases for case-insensitivity
export const saverecentlyViewed = saveRecentlyViewed;
export const getrecentlyViewed = getRecentlyViewed;
export const removerecentlyViewed = removeRecentlyViewed;
export const clearrecentlyViewed = clearRecentlyViewed;
