import React from "react";
import "../componentStyles/Product.css";

import { Link } from "react-router-dom";

import Rating from "./Rating";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

import { showToast } from "../utils/showToast";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const { isAuthenticated } =
    useSelector((state) => state.user);

  const { wishlist } =
    useSelector((state) => state.wishlist);

  /* =====================================================
     CHECK WISHLIST
  ===================================================== */

  const isWishlisted = Boolean(
    wishlist?.products?.some((item) => {
      const productId =
        item.product?._id ||
        item.product ||
        item._id ||
        item;

      return (
        productId?.toString() ===
        product?._id?.toString()
      );
    })
  );

  /* =====================================================
     WISHLIST
  ===================================================== */

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      showToast.error(
        "Please login to add items to your wishlist."
      );

      return;
    }

    if (isWishlisted) {
      dispatch(
        removeFromWishlist(product._id)
      )
        .unwrap()
        .then(() =>
          showToast.success(
            "Removed from wishlist."
          )
        )
        .catch((error) =>
          showToast.error(
            error ||
              "Failed to remove from wishlist."
          )
        );

      return;
    }

    dispatch(
      addToWishlist(product._id)
    )
      .unwrap()
      .then(() =>
        showToast.success(
          "Added to wishlist."
        )
      )
      .catch((error) =>
        showToast.error(
          error ||
            "Failed to add to wishlist."
        )
      );
  };

  /* =====================================================
     IMAGE
  ===================================================== */

  const productImage =
    product?.image?.[0]?.url ||
    "/images/products/strawberry-cake.jpg";

  /* =====================================================
     PRICE
  ===================================================== */

  const formattedPrice = `$${Number(
    product?.price || 0
  ).toFixed(2)}`;

  /* =====================================================
     REVIEWS
  ===================================================== */

  const reviewCount =
    product?.numReviews ||
    product?.numOfReviews ||
    0;

  return (
    <article className="bakery-product-card">

      {/* ===============================================
          PRODUCT IMAGE
      ================================================ */}

      <div className="bakery-product-image-wrapper">

        <Link
          to={`/product/${product._id}`}
          className="bakery-product-image-link"
        >
          <img
            src={productImage}
            alt={product.name}
            className="bakery-product-image"
          />
        </Link>

        {/* CATEGORY */}

        {product.category && (
          <span className="bakery-product-category-badge">
            {product.category}
          </span>
        )}

        {/* FEATURED */}

        {product.featured && (
          <span className="bakery-featured-badge">
            Best Seller
          </span>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          className={`bakery-wishlist-button ${
            isWishlisted
              ? "active"
              : ""
          }`}
          onClick={
            handleWishlistToggle
          }
          title={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isWishlisted ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>

      </div>

      {/* ===============================================
          PRODUCT INFORMATION
      ================================================ */}

      <div className="bakery-product-details">

        {/* SUBCATEGORY */}

        {product.subcategory && (
          <span className="bakery-product-subcategory">
            {product.subcategory}
          </span>
        )}

        {/* PRODUCT NAME */}

        <Link
          to={`/product/${product._id}`}
          className="bakery-product-name-link"
        >
          <h3 className="bakery-product-title">
            {product.name}
          </h3>
        </Link>

        {/* DESCRIPTION */}

        {product.description && (
          <p className="bakery-product-description">
            {product.description}
          </p>
        )}

        {/* RATING */}

        <div className="bakery-product-rating">

          <Rating
            value={
              product.ratings || 0
            }
            disabled={true}
          />

          <span>
            ({reviewCount}{" "}
            {reviewCount === 1
              ? "Review"
              : "Reviews"}
            )
          </span>

        </div>

        {/* BOTTOM */}

        <div className="bakery-product-footer">

          <div className="bakery-product-price">
            {formattedPrice}
          </div>

          <Link
            to={`/product/${product._id}`}
            className="bakery-view-product-button"
          >
            View Details

            <ArrowForwardIcon
              fontSize="small"
            />
          </Link>

        </div>

      </div>

    </article>
  );
};

export default Product;