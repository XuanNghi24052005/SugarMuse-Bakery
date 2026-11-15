import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";

import "../componentStyles/Product.css";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { showToast } from "../utils/showToast";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { wishlist } = useSelector(
    (state) => state.wishlist
  );

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

  const getFallbackImage = () => {
    switch (product?.category) {
      case "Cake":
        return "/images/products/cake-category.jpg";

      case "Pastry":
        return "/images/products/pastry-category.jpg";

      case "Savory":
        return "/images/products/savory-category.jpg";

      case "Gift Box":
        return "/images/products/gift-box-category.jpg";

      default:
        return "/images/products/strawberry-cake.jpg";
    }
  };

  const getProductImage = () => {
    if (typeof product?.image === "string") {
      return product.image;
    }

    if (
      Array.isArray(product?.image) &&
      product.image.length > 0
    ) {
      return (
        product.image[0]?.url ||
        product.image[0]
      );
    }

    if (
      Array.isArray(product?.images) &&
      product.images.length > 0
    ) {
      return (
        product.images[0]?.url ||
        product.images[0]
      );
    }

    return getFallbackImage();
  };

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      showToast.error(
        "Please login to add items to wishlist"
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
            "Removed from wishlist"
          )
        )
        .catch((error) =>
          showToast.error(
            error ||
              "Failed to remove from wishlist"
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
          "Added to wishlist"
        )
      )
      .catch((error) =>
        showToast.error(
          error ||
            "Failed to add to wishlist"
        )
      );
  };

  return (
    <article className="boutique-product-card">

      <div className="boutique-image-wrap">

        <Link
          to={`/product/${product._id}`}
          className="boutique-image-link"
        >
          <img
            src={getProductImage()}
            alt={product.name}
            className="boutique-product-image"
            onError={(event) => {
              event.currentTarget.onerror =
                null;

              event.currentTarget.src =
                getFallbackImage();
            }}
          />
        </Link>

        <button
          type="button"
          className={`boutique-heart ${
            isWishlisted ? "active" : ""
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
          {isWishlisted ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>

      </div>

      <div className="boutique-product-info">

        <Link
          to={`/product/${product._id}`}
          className="boutique-product-name"
        >
          {product.name}
        </Link>

        <div className="boutique-product-bottom">

          <strong>
            $
            {Number(
              product.price || 0
            ).toFixed(2)}
          </strong>

          <Link
            to={`/product/${product._id}`}
            className="boutique-add-button"
            aria-label={`View ${product.name}`}
          >
            +
          </Link>

        </div>

      </div>

    </article>
  );
};

export default Product;