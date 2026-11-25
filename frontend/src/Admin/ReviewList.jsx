import React, { useEffect, useState } from 'react'
import '../AdminStyles/ReviewList.css'
import { Delete, Visibility, Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteReview, fetchAdminProducts, fetchProductReviews, removeErrors, removeSuccess } from '../features/admin/adminSlice'
import { showToast } from '../utils/showToast'
import Loader from '../components/Loader'

const ReviewList = () => {
    const { products, loading, error, reviews, success, message } = useSelector(state => state.admin)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedProductObj, setSelectedProductObj] = useState(null)
    const [viewMode, setViewMode] = useState('byProduct') // 'byProduct' or 'allReviews'
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAdminProducts())
    }, [dispatch])

    const handleViewReviews = (product) => {
        setSelectedProduct(product._id)
        setSelectedProductObj(product)
        dispatch(fetchProductReviews({ productId: product._id }))

        // Auto-scroll to review details section
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
        const confirm = window.confirm("Are you sure you want to delete this review?")
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
            showToast.success(message || "Operation successful!")
            dispatch(removeSuccess())
            dispatch(clearMessage())
            if (selectedProduct) {
                dispatch(fetchProductReviews({ productId: selectedProduct }))
            }
            dispatch(fetchAdminProducts())
        }
    }, [dispatch, error, success, message, selectedProduct])

    // Flatten all reviews for "All Reviews" tab
    const allAggregatedReviews = React.useMemo(() => {
        if (!products || !Array.isArray(products)) return []
        const list = []
        products.forEach(p => {
            if (Array.isArray(p.reviews)) {
                p.reviews.forEach(r => {
                    list.push({
                        ...r,
                        productId: p._id,
                        productName: p.name,
                        productImage: p.image?.[0]?.url || ''
                    })
                })
            }
        })
        return list
    }, [products])

    if (!products || products.length === 0) {
        return (
            <div className="reviews-list-container">
                <h1 className="reviews-list-title">Product Reviews</h1>
                <p style={{ textAlign: "center", color: "#8c6e67", margin: "20px 0" }}>
                    No products in database yet. Add cakes to see customer reviews.
                </p>
            </div>
        )
    }

    return (
        <>
            {loading && !products.length ? (<Loader />) : (
                <div className="reviews-list-container">
                    <div className="reviews-list-header">
                        <div>
                            <h1 className="reviews-list-title">Customer Reviews Management</h1>
                            <p style={{ margin: "4px 0 0", color: "#775953", fontSize: "14px" }}>
                                View and manage all bakery product ratings and customer feedback.
                            </p>
                        </div>
                        <div className="reviews-tabs">
                            <button
                                type="button"
                                className={`reviews-tab-btn ${viewMode === 'byProduct' ? 'active' : ''}`}
                                onClick={() => setViewMode('byProduct')}
                            >
                                By Product ({products.length})
                            </button>
                            <button
                                type="button"
                                className={`reviews-tab-btn ${viewMode === 'allReviews' ? 'active' : ''}`}
                                onClick={() => setViewMode('allReviews')}
                            >
                                All Reviews ({allAggregatedReviews.length})
                            </button>
                        </div>
                    </div>

                    {viewMode === 'byProduct' ? (
                        <>
                            <table className="reviews-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50px' }}>No</th>
                                        <th>Product Name</th>
                                        <th style={{ width: '90px' }}>Image</th>
                                        <th style={{ width: '130px', textAlign: 'center' }}>Total Reviews</th>
                                        <th style={{ width: '160px', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => {
                                        const isSelected = selectedProduct === product._id
                                        const count = product.reviews?.length || product.numReviews || 0
                                        return (
                                            <tr
                                                key={product._id}
                                                style={isSelected ? { backgroundColor: '#fff4f2', outline: '2px solid #e8a59f' } : {}}
                                            >
                                                <td>{index + 1}</td>
                                                <td>
                                                    <strong>{product.name}</strong>
                                                    {product.category && (
                                                        <span style={{ display: 'block', fontSize: '12px', color: '#888' }}>
                                                            {product.category}
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <img
                                                        src={product.image?.[0]?.url || product.image || '/images/products/strawberry-cake.jpg'}
                                                        alt={product.name}
                                                        className='product-image'
                                                    />
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: '700', fontSize: '15px' }}>
                                                    {count > 0 ? (
                                                        <span style={{ color: '#d96560' }}>{count}</span>
                                                    ) : (
                                                        <span style={{ color: '#aaa' }}>0</span>
                                                    )}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {count > 0 ? (
                                                        <button
                                                            type="button"
                                                            className="action-btn view-btn"
                                                            onClick={() => handleViewReviews(product)}
                                                        >
                                                            <Visibility fontSize="small" /> View ({count})
                                                        </button>
                                                    ) : (
                                                        <span className="no-reviews-text">No Reviews</span>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {selectedProduct && (
                                <div id="reviews-details-section" className="reviews-details">
                                    <div className="reviews-details-header">
                                        <div>
                                            <span className="reviews-details-badge">PRODUCT FEEDBACK</span>
                                            <h2>Reviews for: {selectedProductObj?.name || 'Selected Cake'}</h2>
                                        </div>
                                        <button
                                            type="button"
                                            className="action-btn close-reviews-btn"
                                            onClick={() => {
                                                setSelectedProduct(null)
                                                setSelectedProductObj(null)
                                            }}
                                        >
                                            <Close fontSize="small" /> Close
                                        </button>
                                    </div>

                                    {reviews && reviews.length > 0 ? (
                                        <table className="reviews-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '50px' }}>No</th>
                                                    <th style={{ width: '160px' }}>Reviewer</th>
                                                    <th style={{ width: '130px' }}>Rating</th>
                                                    <th>Customer Comment</th>
                                                    <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reviews.map((review, index) => (
                                                    <tr key={review._id || index}>
                                                        <td>{index + 1}</td>
                                                        <td><strong>{review.name || 'Customer'}</strong></td>
                                                        <td>
                                                            <span style={{ color: '#ffb400', fontSize: '15px' }}>
                                                                {'★'.repeat(Math.round(review.rating) || 5)}
                                                                {'☆'.repeat(Math.max(0, 5 - (Math.round(review.rating) || 5)))}
                                                            </span>
                                                            <span style={{ marginLeft: '4px', fontSize: '12px', color: '#777' }}>
                                                                ({review.rating})
                                                            </span>
                                                        </td>
                                                        <td style={{ color: '#444', lineHeight: '1.5' }}>
                                                            "{review.comment}"
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteReviews(review._id, selectedProduct)}
                                                                className="action-btn delete-btn"
                                                                title="Delete Review"
                                                            >
                                                                <Delete fontSize="small" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="no-reviews-msg">No reviews found for this product.</p>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        /* All Reviews Tab */
                        <div style={{ marginTop: '20px' }}>
                            {allAggregatedReviews.length > 0 ? (
                                <table className="reviews-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '50px' }}>No</th>
                                            <th style={{ width: '200px' }}>Product</th>
                                            <th style={{ width: '140px' }}>Reviewer</th>
                                            <th style={{ width: '120px' }}>Rating</th>
                                            <th>Comment</th>
                                            <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allAggregatedReviews.map((item, index) => (
                                            <tr key={item._id || index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <strong>{item.productName}</strong>
                                                </td>
                                                <td>{item.name || 'Customer'}</td>
                                                <td>
                                                    <span style={{ color: '#ffb400', fontSize: '15px' }}>
                                                        {'★'.repeat(Math.round(item.rating) || 5)}
                                                        {'☆'.repeat(Math.max(0, 5 - (Math.round(item.rating) || 5)))}
                                                    </span>
                                                </td>
                                                <td style={{ color: '#444', lineHeight: '1.5' }}>
                                                    "{item.comment}"
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteReviews(item._id, item.productId)}
                                                        className="action-btn delete-btn"
                                                        title="Delete Review"
                                                    >
                                                        <Delete fontSize="small" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="no-reviews-msg">No reviews found across all products yet.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ReviewList
