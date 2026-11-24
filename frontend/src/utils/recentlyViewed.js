const STORAGE_KEY = 'sugarMuserecenlyViewed'
const MAX_ITEMS = 8

const getProductImage = (product) => {
  if (!product) {
    return ''
  }

  if (typeof product.image === 'string') {
    return product.image
  }

  if (
    Array.isArray(product.image) &&
    product.image.length > 0
  ) {
    return (
      product.image[0]?.url ||
      product.image[0] ||
      ''
    )
  }

  if (
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    return (
      product.images[0]?.url ||
      product.images[0] ||
      ''
    )
  }

  return ''
}

export const getrecenlyViewed = () => {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      )

    if (!saved) {
      return []
    }

    const parsed =
      JSON.parse(saved)

    return Array.isArray(parsed)
      ? parsed
      : []
  } catch {
    return []
  }
}

export const saverecenlyViewed = (
  product
) => {
  if (!product) {
    return
  }

  const id =
    product._id ||
    product.id

  if (!id) {
    return
  }

  const item = {
    id: String(id),

    name:
      product.name ||
      product.title ||
      'Sugar Muse Treat',

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
      '',

    subcategory:
      product.subcategory ||
      '',

    ratings:
      Number(
        product.ratings
      ) || 0,

    numReviews:
      Number(
        product.numReviews
      ) || 0
  }

  const current =
    getrecenlyViewed()

  const filtered =
    current.filter(
      (savedProduct) =>
        String(
          savedProduct.id
        ) !==
        String(id)
    )

  const updated = [
    item,
    ...filtered
  ].slice(
    0,
    MAX_ITEMS
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      updated
    )
  )

  return updated
}

export const removerecenlyViewed = (
  id
) => {
  const current =
    getrecenlyViewed()

  const updated =
    current.filter(
      (product) =>
        String(
          product.id
        ) !==
        String(id)
    )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      updated
    )
  )

  return updated
}

export const clearrecenlyViewed =
  () => {
    localStorage.removeItem(
      STORAGE_KEY
    )
  }