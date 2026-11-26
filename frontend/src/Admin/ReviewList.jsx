import React, { useEffect, useState, useMemo } from 'react'
import '../AdminStyles/ReviewList.css'
import { Delete, Visibility, Close, Star, StarBorder } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearMessage,
    deleteReview,
    fetchAdminProducts,
    fetchProductReviews,
    removeErrors,
    removeSuccess
} from '../features/admin/adminSlice'
import { showToast } from '../utils/showToast'
import Loader from '../components/Loader'

const ReviewList = () => {
    const { products = [], loading, error, reviews = [], success, message } = useSelector(state => state.admin)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedProductObj, setSelectedProductObj] = useState(null)
    const [viewMode, setViewMode] = useState('byProduct') // 'byProduct' | 'allReviews'
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAdminProducts())
    }, [dispatch])

    const handleViewReviews = (product) => {
        if (selectedProduct === product._id) {
            // Toggle off if already opened
            setSelectedProduct(null)
            setSelectedProductObj(null)
            return
        }
        setSelectedProduct(product._id)
        setSelectedProductObj(product)
        dispatch(fetchProductReviews({ productId: product._id }))

        setTimeout(() => {
            const section = document.getElementById('reviews-details-section')
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 120)
    }

    const handleDeleteReviews = (reviewId, productId) => {
        if (!reviewId || !productId) {
            showToast.error("Invalid review or product ID.")
            return
        }
        const confirm = window.confirm("Are you sure you want to permanently delete this customer review?")
        if (confirm) {
            dispatch(deleteReview({ reviewId, productId }))
        }
    }

    useEffect(() => {
        if (error) {
            showToast.error(typeof error === 'string' ? error : error.message || 'An error occurred')
            dispatch(removeErrors())
        }
        if (success) {
            showToast.success(message || "Review deleted successfully!")
            dispatch(removeSuccess())
            dispatch(clearMessage())
            if (selectedProduct) {
                dispatch(fetchProductReviews({ productId: selectedProduct }))
            }
            dispatch(fetchAdminProducts())
        }
    }, [dispatch, error, success, message, selectedProduct])

    // Format review date cleanly
    const formatReviewDate = (dateStr) => {
        if (!dateStr) return 'Recently'
        try {
            const d = new Date(dateStr)
            if (isNaN(d.getTime())) return 'Recently'
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        } catch {
            return 'Recently'
        }
    }

    // Helper for category badge class
    const getCategoryClass = (category) => {
        if (!category) return 'default'
        const cat = category.toLowerCase().trim()
        if (cat.includes('cake')) return 'cake'
        if (cat.includes('pastry')) return 'pastry'
        if (cat.includes('savory')) return 'savory'
        if (cat.includes('gift')) return 'gift-box'
        if (cat.includes('combo')) return 'combo'
        return 'default'
    }

    // Render 5-star rating nicely
    const renderStars = (rating) => {
        const val = Math.min(5, Math.max(0, Math.round(rating) || 0))
        return (
            <div className="reviews-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    star <= val ? (
                        <Star key={star} style={{ fontSize: 16, color: '#f59e0b' }} />
                    ) : (
                        <StarBorder key={star} style={{ fontSize: 16, color: '#d4c0ba' }} />
                    )
                ))}
                <span className="reviews-rating-num">{(rating || 0).toFixed(1)}</span>
            </div>
        )
    }

    // Flatten all reviews across all products for "All Reviews" tab
    const allAggregatedReviews = useMemo(() => {
        if (!products || !Array.isArray(products)) return []
        const list = []
        products.forEach(p => {
            if (Array.isArray(p.reviews)) {
                p.reviews.forEach(r => {
                    list.push({
                        ...r,
                        productId: p._id,
                        productName: p.name,
                        productCategory: p.category,
                        productImage: p.image?.[0]?.url || p.images?.[0]?.url || '/images/sugar-muse-favicon.svg'
                    })
                })
            }
        })
        return list
    }, [products])

    return (
        <div className="reviews-list-container">
            {/* Header */}
            <div className="reviews-list-header">
                <div>
                    <span className="reviews-eyebrow">CUSTOMER FEEDBACK</span>
                    <h1 className="reviews-list-title">Reviews Management</h1>
                    <p className="reviews-list-subtitle">
                        Monitor ratings, read guest feedback, and manage reviews across all bakery products.
                    </p>
                </div>
                <div className="reviews-tabs">
                    <button
                        type="button"
                        className={`reviews-tab-btn ${viewMode === 'byProduct' ? 'active' : ''}`}
                        onClick={() => setViewMode('byProduct')}
                    >
                        <span>By Product</span>
                        <span className="reviews-tab-count">{products.length}</span>
                    </button>
                    <button
                        type="button"
                        className={`reviews-tab-btn ${viewMode === 'allReviews' ? 'active' : ''}`}
                        onClick={() => setViewMode('allReviews')}
                    >
                        <span>All Reviews</span>
                        <span className="reviews-tab-count">{allAggregatedReviews.length}</span>
                    </button>
                </div>
            </div>

            {loading && !products.length ? (
                <div style={{ padding: '60px 0', textAlign: 'center' }}>
                    <Loader />
                </div>
            ) : viewMode === 'byProduct' ? (
                <>
                    {/* Products Table */}
                    <div className="reviews-table-card">
                        <table className="reviews-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                                    <th>Product</th>
                                    <th style={{ width: '130px' }}>Category</th>
                                    <th style={{ width: '160px' }}>Average Rating</th>
                                    <th style={{ width: '130px', textAlign: 'center' }}>Reviews</th>
                                    <th style={{ width: '180px', textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => {
                                    const isSelected = selectedProduct === product._id
                                    const count = product.reviews?.length || product.numOfReviews || product.numReviews || 0
                                    const avgRating = product.ratings || (count > 0 && product.reviews ? (product.reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / count) : 5)
                                    const imgUrl = product.image?.[0]?.url || product.images?.[0]?.url || product.image || '/images/sugar-muse-favicon.svg'

                                    return (
                                        <tr
                                            key={product._id}
                                            className={isSelected ? 'selected-row' : ''}
                                        >
                                            <td style={{ textAlign: 'center', color: '#8c6e67', fontWeight: '600' }}>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <div className="reviews-product-cell">
                                                    <img
                                                        src={imgUrl}
                                                        alt={product.name}
                                                        className="reviews-product-thumb"
                                                        onError={(e) => {
                                                            e.target.onerror = null
                                                            e.target.src = '/images/sugar-muse-favicon.svg'
                                                        }}
                                                    />
                                                    <div className="reviews-product-meta">
                                                        <span className="reviews-product-name">{product.name}</span>
                                                        <span className="reviews-product-cat-hint">{product.category || 'Bakery Item'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`reviews-cat-badge ${getCategoryClass(product.category)}`}>
                                                    {product.category || 'Cake'}
                                                </span>
                                            </td>
                                            <td>
                                                {count > 0 ? (
                                                    renderStars(avgRating)
                                                ) : (
                                                    <span style={{ color: '#a89490', fontSize: '12px', fontStyle: 'italic' }}>
                                                        No ratings yet
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <span className={`reviews-count-badge ${count > 0 ? 'has-reviews' : 'no-reviews'}`}>
                                                    {count} {count === 1 ? 'review' : 'reviews'}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {count > 0 ? (
                                                    <button
                                                        type="button"
                                                        className={`review-view-btn ${isSelected ? 'is-active' : ''}`}
                                                        onClick={() => handleViewReviews(product)}
                                                        title="View customer reviews"
                                                    >
                                                        <Visibility style={{ fontSize: 16 }} />
                                                        <span>{isSelected ? 'Viewing' : 'View'} ({count})</span>
                                                    </button>
                                                ) : (
                                                    <span className="review-empty-badge">0 Reviews</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Selected Product Review Details View */}
                    {selectedProduct && (
                        <div id="reviews-details-section" className="reviews-details-card">
                            <div className="reviews-details-top">
                                <div className="reviews-details-product-meta">
                                    <img
                                        src={selectedProductObj?.image?.[0]?.url || selectedProductObj?.images?.[0]?.url || '/images/sugar-muse-favicon.svg'}
                                        alt={selectedProductObj?.name}
                                        className="reviews-details-product-img"
                                    />
                                    <div className="reviews-details-title-wrap">
                                        <span className="reviews-details-badge">PRODUCT FEEDBACK</span>
                                        <h3 className="reviews-details-title">{selectedProductObj?.name}</h3>
                                        <div className="reviews-details-score-row">
                                            <span className="reviews-details-score-pill">
                                                ★ {(selectedProductObj?.ratings || 5).toFixed(1)} / 5.0
                                            </span>
                                            <span style={{ fontSize: '13px', color: '#8c6e67' }}>
                                                Total {reviews?.length || 0} customer {reviews?.length === 1 ? 'review' : 'reviews'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="review-close-btn"
                                    onClick={() => {
                                        setSelectedProduct(null)
                                        setSelectedProductObj(null)
                                    }}
                                >
                                    <Close style={{ fontSize: 16 }} />
                                    <span>Close</span>
                                </button>
                            </div>

                            {reviews && reviews.length > 0 ? (
                                <div className="reviews-table-card">
                                    <table className="reviews-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                                                <th style={{ width: '220px' }}>Reviewer</th>
                                                <th style={{ width: '160px' }}>Rating</th>
                                                <th>Customer Comment</th>
                                                <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reviews.map((rev, idx) => (
                                                <tr key={rev._id || idx}>
                                                    <td style={{ textAlign: 'center', color: '#8c6e67', fontWeight: '600' }}>
                                                        {idx + 1}
                                                    </td>
                                                    <td>
                                                        <div className="reviews-reviewer-cell">
                                                            <div className="reviews-avatar-circle">
                                                                {(rev.name || 'C').charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="reviews-reviewer-info">
                                                                <span className="reviews-reviewer-name">{rev.name || 'Valued Customer'}</span>
                                                                <span className="reviews-date-text">{formatReviewDate(rev.createdAt)}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {renderStars(rev.rating)}
                                                    </td>
                                                    <td>
                                                        <div className="reviews-comment-box">
                                                            "{rev.comment}"
                                                        </div>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteReviews(rev._id, selectedProduct)}
                                                            className="review-delete-btn"
                                                            title="Delete this review"
                                                        >
                                                            <Delete style={{ fontSize: 17 }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="reviews-empty-state">
                                    <h4>No Customer Reviews Yet</h4>
                                    <p>Customers haven't submitted reviews for this cake item yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                /* All Reviews Tab */
                <div className="reviews-table-card">
                    {allAggregatedReviews.length > 0 ? (
                        <table className="reviews-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                                    <th style={{ width: '240px' }}>Product</th>
                                    <th style={{ width: '200px' }}>Reviewer</th>
                                    <th style={{ width: '150px' }}>Rating</th>
                                    <th>Feedback Comment</th>
                                    <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allAggregatedReviews.map((item, idx) => (
                                    <tr key={item._id || idx}>
                                        <td style={{ textAlign: 'center', color: '#8c6e67', fontWeight: '600' }}>
                                            {idx + 1}
                                        </td>
                                        <td>
                                            <div className="reviews-product-cell">
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    className="reviews-product-thumb"
                                                    style={{ width: 44, height: 44, minWidth: 44 }}
                                                    onError={(e) => {
                                                        e.target.onerror = null
                                                        e.target.src = '/images/sugar-muse-favicon.svg'
                                                    }}
                                                />
                                                <div className="reviews-product-meta">
                                                    <span className="reviews-product-name">{item.productName}</span>
                                                    <span className="reviews-product-cat-hint">{item.productCategory || 'Cake'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="reviews-reviewer-cell">
                                                <div className="reviews-avatar-circle" style={{ width: 34, height: 34, minWidth: 34, fontSize: 13 }}>
                                                    {(item.name || 'C').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="reviews-reviewer-info">
                                                    <span className="reviews-reviewer-name">{item.name || 'Customer'}</span>
                                                    <span className="reviews-date-text">{formatReviewDate(item.createdAt)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {renderStars(item.rating)}
                                        </td>
                                        <td>
                                            <div className="reviews-comment-box">
                                                "{item.comment}"
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteReviews(item._id, item.productId)}
                                                className="review-delete-btn"
                                                title="Delete this review"
                                            >
                                                <Delete style={{ fontSize: 17 }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="reviews-empty-state">
                            <h4>No Reviews in Database</h4>
                            <p>Customers have not submitted any reviews yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ReviewList
