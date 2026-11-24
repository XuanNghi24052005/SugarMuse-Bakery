import React, { useEffect, useState } from 'react'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Rating from '../components/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector } from 'react-redux'
import {
    getProductDetails,
    removeErrors,
    createReview,
    removeReviewSuccess,
    removeReviewError
} from '../features/products/productSlice'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { showToast } from '../utils/showToast'
import {
    addItemsToCart,
    removeMessage,
    removeErrors as removeCartErrors
} from '../features/cart/cartSlice'
import {
    addToWishlist,
    removeFromWishlist
} from '../features/wishlist/wishlistSlice'

const saverecenlyViewed = (product, routeId) => {
    if (!product) {
        return
    }

    const productId =
        product._id ||
        product.id ||
        routeId

    if (!productId) {
        return
    }

    try {
        const saved =
            localStorage.getItem(
                'sugarMuserecenlyViewed'
            )

        const parsed =
            saved
                ? JSON.parse(saved)
                : []

        const current =
            Array.isArray(parsed)
                ? parsed
                : []

        const firstImage =
            Array.isArray(product.image) &&
            product.image.length > 0
                ? product.image[0]?.url || ''
                : typeof product.image === 'string'
                    ? product.image
                    : ''

        const productToSave = {
            id: productId,
            name:
                product.name ||
                product.title ||
                'Sugar Muse Treat',
            price:
                Number(product.price) || 0,
            image: firstImage,
            category:
                product.category || '',
            subcategory:
                product.subcategory || ''
        }

        const withoutCurrent =
            current.filter(
                (item) =>
                    String(item.id) !==
                    String(productId)
            )

        const updated = [
            productToSave,
            ...withoutCurrent
        ].slice(0, 8)

        localStorage.setItem(
            'sugarMuserecenlyViewed',
            JSON.stringify(updated)
        )
    } catch (error) {
        console.error(
            'Could not save recently viewed product:',
            error
        )
    }
}

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1)
    const [userRating, setUserRating] = useState(0)
    const [comment, setComment] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedSize, setSelectedSize] = useState('')

    const {
        loading,
        error,
        product,
        reviewSuccess,
        reviewError,
        reviewLoading
    } = useSelector(
        (state) => state.product
    )

    const {
        loading: cartLoading,
        error: cartError,
        success,
        message
    } = useSelector(
        (state) => state.cart
    )

    const {
        isAuthenticated
    } = useSelector(
        (state) => state.user
    )

    const {
        wishlist
    } = useSelector(
        (state) => state.wishlist
    )

    const dispatch = useDispatch()

    const {
        id
    } = useParams()

    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }

    const isWishlisted =
        Boolean(
            wishlist?.products?.some(
                (item) => {
                    const pId =
                        item.product?._id ||
                        item.product ||
                        item._id ||
                        item

                    return (
                        pId?.toString() ===
                        id?.toString()
                    )
                }
            )
        )

    const handleWishlistToggle = () => {
        if (!isAuthenticated) {
            showToast.error(
                'Please login to add items to wishlist'
            )

            return
        }

        if (isWishlisted) {
            dispatch(
                removeFromWishlist(id)
            )
                .unwrap()
                .then(() =>
                    showToast.success(
                        'Removed from wishlist'
                    )
                )
                .catch((err) =>
                    showToast.error(
                        err ||
                        'Failed to remove from wishlist'
                    )
                )
        } else {
            dispatch(
                addToWishlist(id)
            )
                .unwrap()
                .then(() =>
                    showToast.success(
                        'Added to wishlist'
                    )
                )
                .catch((err) =>
                    showToast.error(
                        err ||
                        'Failed to add to wishlist'
                    )
                )
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(
                getProductDetails(id)
            )
        }

        return () => {
            dispatch(
                removeErrors()
            )
        }
    }, [
        dispatch,
        id
    ])

    useEffect(() => {
        if (error) {
            showToast.error(
                typeof error === 'string'
                    ? error
                    : error.response
                        ?.data
                        ?.message ||
                    error.message ||
                    'Unable to load product'
            )
        }

        if (cartError) {
            showToast.error(
                typeof cartError === 'string'
                    ? cartError
                    : cartError?.message ||
                    'Cart error'
            )

            dispatch(
                removeCartErrors()
            )
        }

        if (reviewError) {
            showToast.error(
                typeof reviewError === 'string'
                    ? reviewError
                    : reviewError?.message ||
                    'Unable to submit review'
            )

            dispatch(
                removeReviewError()
            )
        }
    }, [
        dispatch,
        error,
        cartError,
        reviewError
    ])

    useEffect(() => {
        if (success) {
            if (message) {
                showToast.success(
                    message
                )
            }

            dispatch(
                removeMessage()
            )
        }

        if (reviewSuccess) {
            showToast.success(
                'Review submitted successfully!'
            )

            dispatch(
                removeReviewSuccess()
            )

            setUserRating(0)

            setComment('')

            dispatch(
                getProductDetails(id)
            )
        }
    }, [
        dispatch,
        success,
        message,
        reviewSuccess,
        id
    ])

    useEffect(() => {
        if (!product) {
            setSelectedImage(null)
            return
        }

        if (
            Array.isArray(product.image) &&
            product.image.length > 0
        ) {
            setSelectedImage(
                product.image[0]?.url ||
                null
            )
        } else if (
            typeof product.image ===
            'string'
        ) {
            setSelectedImage(
                product.image
            )
        } else {
            setSelectedImage(null)
        }

        setSelectedSize('1')
        setQuantity(1)
    }, [
        product
    ])

    useEffect(() => {
        if (!product) {
            return
        }

        saverecenlyViewed(
            product,
            id
        )
    }, [
        product,
        id
    ])

    const increaseQuantity = () => {
        if (!product) {
            return
        }

        if (
            product.stock <=
            quantity
        ) {
            showToast.error(
                'Only ' +
                product.stock +
                ' items available.'
            )

            return
        }

        setQuantity(
            (qty) =>
                qty + 1
        )
    }

    const decreaseQuantity = () => {
        if (
            quantity <= 1
        ) {
            showToast.error(
                'Quantity cannot be less than 1'
            )

            return
        }

        setQuantity(
            (qty) =>
                qty - 1
        )
    }

    const addToCart = () => {
        if (!product) {
            return
        }

        if (
            !product.stock ||
            product.stock <= 0
        ) {
            showToast.error(
                'Product is out of stock!'
            )

            return
        }

        const fallbackImage =
            Array.isArray(product.image)
                ? product.image[0]?.url || ''
                : typeof product.image === 'string'
                    ? product.image
                    : ''

        dispatch(
            addItemsToCart({
                id,
                quantity,
                size: 'OS',
                stock:
                    product.stock,
                image:
                    selectedImage ||
                    fallbackImage
            })
        )
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            showToast.error(
                'Please login to submit a review'
            )

            return
        }

        if (
            userRating === 0
        ) {
            showToast.error(
                'Please select a rating'
            )

            return
        }

        if (
            !comment.trim()
        ) {
            showToast.error(
                'Please write a review comment.'
            )

            return
        }

        dispatch(
            createReview({
                productId: id,
                rating:
                    userRating,
                comment
            })
        )
    }

    if (loading) {
        return (
            <>
                <Loader />

                <Footer />
            </>
        )
    }

    if (error) {
        const errorMessage =
            typeof error === 'string'
                ? error
                : error.response
                    ?.data
                    ?.message ||
                error.message ||
                'Product information could not be loaded.'

        return (
            <>
                <PageTitle
                    title="Product details"
                />

                <div
                    style={{
                        minHeight: '60vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '40px 20px',
                        textAlign: 'center'
                    }}
                >
                    <h2>
                        Unable to load product
                    </h2>

                    <p>
                        {errorMessage}
                    </p>
                </div>

                <Footer />
            </>
        )
    }

    if (!product) {
        return (
            <>
                <PageTitle
                    title="Product details"
                />

                <div
                    style={{
                        minHeight: '60vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Loader />
                </div>

                <Footer />
            </>
        )
    }

    const productImages =
        Array.isArray(product.image)
            ? product.image
            : []

    const mainImage =
        selectedImage ||
        productImages[0]?.url ||
        (
            typeof product.image ===
            'string'
                ? product.image
                : ''
        )

    return (
        <>
            <PageTitle
                title={`${product.name} - ${product.title || ''}`}
            />

            <div className="product-details-container">
                <div className="product-detail-container">
                    <div className="product-image-container">
                        <img
                            src={
                                mainImage
                            }
                            alt={
                                product.name
                            }
                            className="product-detail-image"
                        />

                        {productImages.length >
                            1 && (
                            <div className="product-thumbnails">
                                {productImages.map(
                                    (
                                        img,
                                        index
                                    ) => (
                                        <img
                                            src={
                                                img.url
                                            }
                                            alt={`Thumbnail${index + 1}`}
                                            className={`thumbnail-image ${
                                                selectedImage ===
                                                img.url
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            key={
                                                img._id ||
                                                img.public_id ||
                                                img.url ||
                                                index
                                            }
                                            onClick={() =>
                                                setSelectedImage(
                                                    img.url
                                                )
                                            }
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <div className="product-info">
                        <h2>
                            {
                                product.name
                            }
                        </h2>

                        {(product.category ||
                            product.subcategory) && (
                            <p className="product-category-subtitle">
                                {
                                    product.category
                                }

                                {product.subcategory
                                    ? ` / ${product.subcategory}`
                                    : ''}
                            </p>
                        )}

                        <p className="product-description">
                            {
                                product.description
                            }
                        </p>

                        <p className="product-price">
                            $
                            {
                                product.price
                            }
                        </p>

                        <div className="product-rating">
                            <Rating
                                value={
                                    product.ratings ||
                                    0
                                }
                                disabled={
                                    true
                                }
                            />

                            <div className="productCardSpan">
                                (
                                {product.numReviews ||
                                    0}{' '}
                                {product.numReviews ===
                                1
                                    ? 'Review'
                                    : 'Reviews'}
                                )
                            </div>

                            <div className="stock-status">
                                <span
                                    className={
                                        product.stock >
                                        0
                                            ? 'in-stock'
                                            : 'out-of-stock'
                                    }
                                >
                                    {product.stock >
                                    0
                                        ? `In stock (${product.stock} available)`
                                        : 'Out Of Stock'}
                                </span>

                                {product.stock >
                                    0 && (
                                    <>
                                        <div className="quantity-controls">
                                            <span className="quantity">
                                                Quantity:{' '}
                                            </span>

                                            <button
                                                type="button"
                                                className="quantity-button"
                                                onClick={
                                                    decreaseQuantity
                                                }
                                            >
                                                -
                                            </button>

                                            <input
                                                type="text"
                                                value={
                                                    quantity
                                                }
                                                className="quantity-value"
                                                readOnly
                                            />

                                            <button
                                                type="button"
                                                className="quantity-button"
                                                onClick={
                                                    increaseQuantity
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="cart-action-group">
                                            <button
                                                type="button"
                                                className="add-to-cart-btn"
                                                disabled={
                                                    cartLoading
                                                }
                                                onClick={
                                                    addToCart
                                                }
                                            >
                                                {cartLoading
                                                    ? 'Adding...'
                                                    : 'Add to Cart'}
                                            </button>

                                            <button
                                                type="button"
                                                className={`details-wishlist-btn ${
                                                    isWishlisted
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={
                                                    handleWishlistToggle
                                                }
                                                title={
                                                    isWishlisted
                                                        ? 'Remove from Wishlist'
                                                        : 'Add to Wishlist'
                                                }
                                                aria-label={
                                                    isWishlisted
                                                        ? 'Remove from Wishlist'
                                                        : 'Add to Wishlist'
                                                }
                                            >
                                                {isWishlisted ? (
                                                    <FavoriteIcon className="wishlist-icon-filled" />
                                                ) : (
                                                    <FavoriteBorderIcon className="wishlist-icon-empty" />
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}

                                <form
                                    className="review-form"
                                    onSubmit={
                                        handleReviewSubmit
                                    }
                                >
                                    <h3>
                                        Write a Review
                                    </h3>

                                    <Rating
                                        value={
                                            userRating
                                        }
                                        disabled={
                                            false
                                        }
                                        onRatingChange={
                                            handleRatingChange
                                        }
                                    />

                                    <textarea
                                        placeholder="Write something about this product here.."
                                        className="review-input"
                                        value={
                                            comment
                                        }
                                        onChange={(e) =>
                                            setComment(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        className="submit-review-btn"
                                        type="submit"
                                        disabled={
                                            reviewLoading
                                        }
                                    >
                                        {reviewLoading
                                            ? 'Submitting...'
                                            : 'Submit Review'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reviews-container">
                    <h3>
                        Reviews
                    </h3>

                    {product.reviews &&
                    product.reviews.length >
                        0 ? (
                        <div className="reviews-section">
                            {product.reviews.map(
                                (
                                    review,
                                    index
                                ) => (
                                    <div
                                        className="review-item"
                                        key={
                                            review._id ||
                                            index
                                        }
                                    >
                                        <div className="review-header">
                                            <Rating
                                                value={
                                                    review.rating
                                                }
                                                disabled={
                                                    true
                                                }
                                            />

                                            <p className="review-comment">
                                                {
                                                    review.comment
                                                }
                                            </p>

                                            <p className="review-name">
                                                By{' '}
                                                {
                                                    review.name
                                                }
                                            </p>

                                            <p className="review-createdAt">
                                                {
                                                    review.createdAt
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="no-review">
                            No reviews yet.
                            Be the first one
                            to review!
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ProductDetails