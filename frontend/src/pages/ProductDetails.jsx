import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "../pageStyles/ProductDetails.css";

import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import Loader from "../components/Loader";

import {
  getProductDetails,
  removeErrors,
  createReview,
  removeReviewSuccess,
  removeReviewError,
} from "../features/products/productSlice";



import {
  saveRecentlyViewed,
} from "../utils/recentlyViewed";

import {
  showToast,
} from "../utils/showToast";

import { useCart } from "../Context/Cartcontext";
import { useWishlist } from "../Context/Wishlistcontext";
import { useAuth } from "../Context/Authcontext";

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 7H6" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </svg>
);

const TruckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h11v10H3z" />
    <path d="M14 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 4c-7 0-13 3-15 9-1 3 1 6 4 6 7 0 10-8 11-15Z" />
    <path d="M5 20c3-5 7-8 12-11" />
  </svg>
);

const CakeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 11h14v9H5z" />
    <path d="M5 15h14" />
    <path d="M4 11h16" />
    <path d="M12 4v4" />
    <path d="M10 5c0-1 1-2 2-3 1 1 2 2 2 3a2 2 0 0 1-4 0Z" />
  </svg>
);

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </svg>
);

const StarDisplay = ({
  value = 0,
}) => {
  const rounded =
    Math.round(
      Number(value) || 0
    );

  return (
    <div
      className="sugar-product-stars"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from(
        {
          length: 5,
        },
        (_, index) => (
          <span
            key={index}
            className={
              index < rounded
                ? "filled"
                : ""
            }
          >
            ★
          </span>
        )
      )}
    </div>
  );
};

const getImages = (
  product
) => {
  if (
    !product ||
    !Array.isArray(
      product.image
    )
  ) {
    return [];
  }

  return product.image
    .map(
      (image) => {
        if (
          typeof image ===
          "string"
        ) {
          return {
            url: image,
          };
        }

        if (
          image?.url
        ) {
          return image;
        }

        return null;
      }
    )
    .filter(Boolean);
};

const formatDate = (
  value
) => {
  if (!value) {
    return "";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const ProductDetails = () => {
  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState("");

  const [
    userRating,
    setUserRating,
  ] = useState(0);

  const [
    comment,
    setComment,
  ] = useState("");

  const {
    loading,
    error,
    product,
    reviewSuccess,
    reviewError,
    reviewLoading,
  } = useSelector(
    (state) =>
      state.product
  );

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted: checkIsWishlisted } = useWishlist();

  const productImages =
    useMemo(
      () =>
        getImages(
          product
        ),
      [product]
    );

  const reviews =
    Array.isArray(
      product?.reviews
    )
      ? product.reviews
      : [];

  const currentProductId = product?._id || product?.id || id;
  const isWishlisted = Boolean(checkIsWishlisted(currentProductId));

  const ratingBreakdown =
    useMemo(() => {
      const result = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };

      reviews.forEach(
        (review) => {
          const rating =
            Math.max(
              1,
              Math.min(
                5,
                Math.round(
                  Number(
                    review.rating
                  ) || 0
                )
              )
            );

          result[
            rating
          ] += 1;
        }
      );

      return result;
    }, [
      reviews,
    ]);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(
      getProductDetails(
        id
      )
    );

    return () => {
      dispatch(
        removeErrors()
      );
    };
  }, [
    dispatch,
    id,
  ]);

  useEffect(() => {
    if (
      productImages.length >
      0
    ) {
      setSelectedImage(
        productImages[0].url
      );
    } else {
      setSelectedImage(
        ""
      );
    }

    setQuantity(1);
  }, [
    productImages,
  ]);

  useEffect(() => {
    if (product && (product._id || product.id)) {
      saveRecentlyViewed(product);
    }
  }, [product]);

  useEffect(() => {
    if (reviewError) {
      showToast.error(
        typeof reviewError === "string"
          ? reviewError
          : reviewError?.message || "Unable to submit review"
      );
      dispatch(removeReviewError());
    }
  }, [dispatch, reviewError]);

  useEffect(() => {
    if (reviewSuccess) {
      showToast.success("Review submitted successfully!");
      dispatch(removeReviewSuccess());
      setUserRating(0);
      setComment("");
      dispatch(getProductDetails(id));
    }
  }, [dispatch, reviewSuccess, id]);

  const increaseQuantity =
    () => {
      if (!product) {
        return;
      }

      if (
        quantity >=
        product.stock
      ) {
        showToast.error(
          `Only ${product.stock} items available.`
        );

        return;
      }

      setQuantity(
        (current) =>
          current + 1
      );
    };

  const decreaseQuantity =
    () => {
      if (
        quantity <= 1
      ) {
        return;
      }

      setQuantity(
        (current) =>
          current - 1
      );
    };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (!product.stock || product.stock <= 0) {
      showToast.error("Product is out of stock.");
      return;
    }

    const pId = product._id || product.id || id;
    const pImage =
      selectedImage ||
      (productImages.length > 0
        ? productImages[0]?.url
        : product.image || "/images/products/strawberry-cake.jpg");

    addToCart(
      {
        _id: pId,
        id: pId,
        name: product.name,
        price: Number(product.price) || 0,
        image: pImage,
        stock: Number(product.stock) || 20,
        category: product.category || "Cake",
        flavor: product.flavor || "",
        description: product.description || "",
      },
      quantity
    );

    showToast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleWishlistToggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!product) return;

    const pId = product._id || product.id || id;
    const pImage =
      selectedImage ||
      (productImages.length > 0
        ? productImages[0]?.url
        : product.image || "/images/products/strawberry-cake.jpg");

    toggleWishlist({
      _id: pId,
      id: pId,
      name: product.name,
      price: Number(product.price) || 0,
      image: pImage,
      category: product.category || "Cake",
      stock: Number(product.stock) || 20,
      description: product.description || "",
    });

    showToast.success(!isWishlisted ? "Added to wishlist! ♡" : "Removed from wishlist");
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (userRating === 0) {
      showToast.error("Please click on the stars to select a rating.");
      return;
    }

    if (!comment.trim()) {
      showToast.error("Please write a review comment.");
      return;
    }

    const targetId = product._id || id;
    const authorName = user?.name || user?.fullName || "Sugar Muse Customer";

    try {
      const resultAction = await dispatch(
        createReview({
          productId: targetId,
          rating: userRating,
          comment: comment.trim(),
          name: authorName,
        })
      );

      if (createReview.fulfilled.match(resultAction)) {
        showToast.success("Thank you! Your review has been submitted.");
        setComment("");
        setUserRating(0);
        dispatch(getProductDetails(id));
      } else {
        const errMsg = resultAction.payload || "Could not submit review.";
        showToast.error(errMsg);
      }
    } catch {
      showToast.error("Failed to submit review.");
    }
  };

  if (
    loading
  ) {
    return (
      <>
        <div className="sugar-product-loading">
          <Loader />
        </div>

        <Footer />
      </>
    );
  }

  if (
    error ||
    !product
  ) {
    const errorMessage =
      typeof error ===
      "string"
        ? error
        : error
            ?.message ||
          "Product information could not be loaded.";

    return (
      <>
        <PageTitle
          title="Product Details"
        />

        <main className="sugar-product-error-page">
          <span>
            ♡
          </span>

          <h1>
            We couldn&apos;t
            find this treat
          </h1>

          <p>
            {
              errorMessage
            }
          </p>

          <Link
            to="/products"
          >
            Back to Shop
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const inStock =
    Number(
      product.stock
    ) > 0;

  const totalReviews =
    Number(
      product.numReviews
    ) || 0;

  const writtenReviewCount =
    reviews.length;

  return (
    <>
      <PageTitle
        title={
          product.name
        }
      />

      <main className="sugar-product-detail-page">
        <div className="sugar-product-detail-inner">
          <nav
            className="sugar-product-breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/">
              <HomeIcon />

              Home
            </Link>

            <span>
              ›
            </span>

            <Link
              to="/products"
            >
              Shop
            </Link>

            {product.category && (
              <>
                <span>
                  ›
                </span>

                <Link
                  to={`/products?category=${encodeURIComponent(
                    product.category
                  )}`}
                >
                  {
                    product.category
                  }
                </Link>
              </>
            )}

            <span>
              ›
            </span>

            <strong>
              {
                product.name
              }
            </strong>
          </nav>

          <section className="sugar-product-main">
            <div className="sugar-product-gallery">
              <div className="sugar-product-main-image">
                {product.featured && (
                  <span className="sugar-product-featured-badge">
                    SUGAR MUSE PICK
                  </span>
                )}

                <img
                  src={
                    selectedImage ||
                    productImages[0]
                      ?.url ||
                    ""
                  }
                  alt={
                    product.name
                  }
                />

                <button
                  type="button"
                  className={`sugar-product-image-heart ${
                    isWishlisted
                      ? "active"
                      : ""
                  }`}
                  onClick={
                    handleWishlistToggle
                  }
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "22px", height: "22px", pointerEvents: "none" }}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                  </svg>
                </button>
              </div>

              {productImages.length >
                1 && (
                <div className="sugar-product-thumbnails">
                  {productImages.map(
                    (
                      image,
                      index
                    ) => (
                      <button
                        type="button"
                        key={
                          image._id ||
                          image.public_id ||
                          image.url ||
                          index
                        }
                        className={
                          selectedImage ===
                          image.url
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setSelectedImage(
                            image.url
                          )
                        }
                      >
                        <img
                          src={
                            image.url
                          }
                          alt={`${product.name} ${index + 1}`}
                        />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="sugar-product-info">
              <div className="sugar-product-category-row">
                <span>
                  {
                    product.category
                  }
                </span>

                <i />

                {product.featured && (
                  <em>
                    Featured
                  </em>
                )}
              </div>

              <h1>
                {
                  product.name
                }
              </h1>

              <p className="sugar-product-description">
                {
                  product.description
                }
              </p>

              {product.flavor && (
                <div className="sugar-product-flavor">
                  <span>
                    FLAVOR
                  </span>

                  <strong>
                    {
                      product.flavor
                    }
                  </strong>
                </div>
              )}

              <div className="sugar-product-buy-info">
                <div className="sugar-product-price-row">
                  <strong className="sugar-product-price">
                    $
                    {Number(
                      product.price
                    ).toFixed(
                      2
                    )}
                  </strong>

                  <span className="sugar-product-price-divider" />

                  <div className="sugar-product-rating-summary">
                    <StarDisplay
                      value={
                        product.ratings
                      }
                    />

                    <span>
                      (
                      {
                        totalReviews
                      }{" "}
                      {totalReviews ===
                      1
                        ? "Review"
                        : "Reviews"}
                      )
                    </span>
                  </div>
                </div>

                <div
                  className={`sugar-product-stock ${
                    inStock
                      ? "in-stock"
                      : "out-of-stock"
                  }`}
                >
                  <i />

                  {inStock
                    ? `In stock (${product.stock} available)`
                    : "Out of stock"}
                </div>
              </div>

              {inStock && (
                <>
                  <div className="sugar-product-quantity-row">
                    <strong>
                      Quantity:
                    </strong>

                    <div className="sugar-product-quantity-control">
                      <button
                        type="button"
                        onClick={
                          decreaseQuantity
                        }
                        disabled={
                          quantity <=
                          1
                        }
                      >
                        −
                      </button>

                      <span>
                        {
                          quantity
                        }
                      </span>

                      <button
                        type="button"
                        onClick={
                          increaseQuantity
                        }
                        disabled={
                          quantity >=
                          product.stock
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="sugar-product-actions">
                    <button
                      type="button"
                      className="sugar-product-add-cart"
                      onClick={handleAddToCart}
                    >
                      <CartIcon />
                      <span>Add to Cart</span>
                    </button>

                    
                  </div>
                </>
              )}

              <div className="sugar-product-benefits">
                <div>
                  <TruckIcon />

                  <span>
                    <strong>
                      Fast Delivery
                    </strong>

                    <small>
                      Within 2–3 days
                    </small>
                  </span>
                </div>

                <div>
                  <ShieldIcon />

                  <span>
                    <strong>
                      Freshly Baked
                    </strong>

                    <small>
                      Every day
                    </small>
                  </span>
                </div>

                <div>
                  <LeafIcon />

                  <span>
                    <strong>
                      Quality Ingredients
                    </strong>

                    <small>
                      Selected with care
                    </small>
                  </span>
                </div>
              </div>

              {(product.ingredients?.length >
                0 ||
                product.allergens?.length >
                  0) && (
                <div className="sugar-product-extra-info">
                  {product.ingredients
                    ?.length >
                    0 && (
                    <div>
                      <span>
                        INGREDIENTS
                      </span>

                      <p>
                        {product.ingredients.join(
                          ", "
                        )}
                      </p>
                    </div>
                  )}

                  {product.allergens
                    ?.length >
                    0 && (
                    <div>
                      <span>
                        ALLERGENS
                      </span>

                      <p>
                        {product.allergens.join(
                          ", "
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="sugar-product-reviews">
            <div className="sugar-review-title">
              <span />

              <div>
                <CakeIcon />

                <h2>
                  Reviews
                </h2>
              </div>

              <span />
            </div>

            <div className="sugar-review-top">
              <div className="sugar-rating-overview">
                <div className="sugar-rating-score">
                  <strong>
                    {Number(
                      product.ratings ||
                        0
                    ).toFixed(
                      1
                    )}
                  </strong>

                  <StarDisplay
                    value={
                      product.ratings
                    }
                  />

                  <span>
                    {
                      totalReviews
                    }{" "}
                    {totalReviews ===
                    1
                      ? "Review"
                      : "Reviews"}
                  </span>
                </div>

                <div className="sugar-rating-breakdown">
                  {writtenReviewCount >
                  0 ? (
                    [
                      5,
                      4,
                      3,
                      2,
                      1,
                    ].map(
                      (
                        rating
                      ) => {
                        const count =
                          ratingBreakdown[
                            rating
                          ];

                        const percentage =
                          writtenReviewCount >
                          0
                            ? (count /
                                writtenReviewCount) *
                              100
                            : 0;

                        return (
                          <div
                            className="sugar-rating-row"
                            key={
                              rating
                            }
                          >
                            <span>
                              {
                                rating
                              }{" "}
                              ★
                            </span>

                            <div>
                              <i
                                style={{
                                  width:
                                    `${percentage}%`,
                                }}
                              />
                            </div>

                            <strong>
                              {
                                count
                              }
                            </strong>
                          </div>
                        );
                      }
                    )
                  ) : (
                    <div className="sugar-rating-no-breakdown">
                      <strong>
                        Customer rating
                      </strong>

                      <p>
                        Individual
                        written reviews
                        will appear here
                        as customers
                        share their
                        experience.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <form
                className="sugar-review-form"
                onSubmit={
                  handleReviewSubmit
                }
              >
                <span className="sugar-review-eyebrow">
                  SHARE YOUR EXPERIENCE
                </span>

                <h3>
                  Write a Review
                </h3>

                <div className="sugar-review-rating-input">
                  <Rating
                    value={
                      userRating
                    }
                    disabled={
                      false
                    }
                    onRatingChange={
                      setUserRating
                    }
                  />
                </div>

                <textarea
                  value={
                    comment
                  }
                  onChange={(
                    event
                  ) =>
                    setComment(
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="Share your thoughts about this product..."
                />

                <button
                  type="submit"
                  disabled={
                    reviewLoading
                  }
                >
                  {reviewLoading
                    ? "Submitting..."
                    : "Submit Review"}
                </button>
              </form>
            </div>

            {reviews.length >
            0 ? (
              <div className="sugar-review-list">
                {reviews.map(
                  (
                    review,
                    index
                  ) => (
                    <article
                      key={
                        review._id ||
                        index
                      }
                    >
                      <div className="sugar-review-avatar">
                        {(
                          review.name?.[0] ||
                          "S"
                        ).toUpperCase()}
                      </div>

                      <div className="sugar-review-content">
                        <div className="sugar-review-header">
                          <div>
                            <strong>
                              {review.name ||
                                "Sugar Muse Customer"}
                            </strong>

                            <StarDisplay
                              value={
                                review.rating
                              }
                            />
                          </div>

                          <span>
                            {formatDate(
                              review.createdAt
                            )}
                          </span>
                        </div>

                        <p>
                          {
                            review.comment
                          }
                        </p>
                      </div>
                    </article>
                  )
                )}
              </div>
            ) : (
              <div className="sugar-review-empty">
                <span>
                  ♡
                </span>

                <h3>
                  Be the first to
                  share some love
                </h3>

                <p>
                  No written reviews
                  have been submitted
                  for this treat yet.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;