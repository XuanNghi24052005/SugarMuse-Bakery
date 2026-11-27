const STORAGE_KEY = "sugarMuseRecentlyViewed";
const MAX_ITEMS = 8;

const getProductImage = (product) => {
  if (!product) return "";
  if (typeof product.image === "string") return product.image;
  if (Array.isArray(product.image) && product.image.length > 0) {
    const firstImage = product.image[0];
    if (typeof firstImage === "string") return firstImage;
    return firstImage?.url || "";
  }
  if (Array.isArray(product.images) && product.images.length > 0) {
    const firstImage = product.images[0];
    if (typeof firstImage === "string") return firstImage;
    return firstImage?.url || "";
  }
  return "";
};

// Universal smart deduplication helper (matches by both ID and normalized Name)
export const deduplicateViewedList = (list) => {
  if (!Array.isArray(list)) return [];
  const seenIds = new Set();
  const seenNames = new Set();
  const result = [];

  for (const item of list) {
    if (!item) continue;
    const rawId = String(item.id || item._id || "").trim();
    const normName = String(item.name || item.title || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    // Skip if we already have this product either by ID or by Name
    if (rawId && seenIds.has(rawId)) {
      continue;
    }
    if (normName && seenNames.has(normName)) {
      continue;
    }

    if (rawId) seenIds.add(rawId);
    if (normName) seenNames.add(normName);
    result.push({
      ...item,
      id: rawId || String(item._id || Math.random()),
    });
  }

  return result.slice(0, MAX_ITEMS);
};

export const getRecentlyViewed = () => {
  try {
    let saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      saved = localStorage.getItem("sugarMuserecentlyViewed");
    }

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    // Automatically deduplicate any existing items in storage
    const cleanList = deduplicateViewedList(parsed);

    // If duplicates were pruned, update localStorage immediately to keep storage clean
    if (cleanList.length !== parsed.length || !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanList));
      try {
        localStorage.removeItem("sugarMuserecentlyViewed");
      } catch {}
    }

    return cleanList;
  } catch (error) {
    console.error("Unable to read recently viewed products:", error);
    return [];
  }
};

export const saveRecentlyViewed = (product) => {
  if (!product) return [];

  const productId = product._id || product.id;
  if (!productId) return [];

  try {
    const current = getRecentlyViewed();

    const item = {
      id: String(productId),
      name: product.name || product.title || "Sugar Muse Treat",
      price: Number(product.price) || 0,
      image: getProductImage(product),
      category: product.category || "",
      subcategory: product.subcategory || "",
      flavor: product.flavor || "",
      ratings: Number(product.ratings) || 0,
      numReviews: Number(product.numReviews) || 0,
      slug: product.slug || "",
    };

    // Put newly viewed item at the top (index 0) and deduplicate
    const updated = deduplicateViewedList([item, ...current]);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    try {
      localStorage.removeItem("sugarMuserecentlyViewed");
    } catch {}

    return updated;
  } catch (error) {
    console.error("Unable to save recently viewed product:", error);
    return [];
  }
};

export const removeRecentlyViewed = (productId) => {
  try {
    const current = getRecentlyViewed();

    const updated = current.filter(
      (product) => String(product.id) !== String(productId)
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Unable to remove recently viewed product:", error);
    return [];
  }
};

export const clearRecentlyViewed = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    try {
      localStorage.removeItem("sugarMuserecentlyViewed");
    } catch {}
    return [];
  } catch (error) {
    console.error("Unable to clear recently viewed products:", error);
    return [];
  }
};

// Aliases for backwards compatibility
export const saverecentlyViewed = saveRecentlyViewed;
export const getrecentlyViewed = getRecentlyViewed;
export const removerecentlyViewed = removeRecentlyViewed;
export const clearrecentlyViewed = clearRecentlyViewed;
