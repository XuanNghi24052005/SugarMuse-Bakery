import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import "../pageStyles/Products.css";

const categories = [
  "All",
  "Cake",
  "Pastry",
  "Savory",
  "Gift Box",
];

const sortOptions = [
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "name",
    label: "Name: A–Z",
  },
];

const Products = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [category, setCategory] =
    useState(initialCategory);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  const [page, setPage] =
    useState(1);

  const [favorites, setFavorites] =
    useState([]);

  const pageSize = 8;

  /* ======================================
     GET PRODUCTS FROM BACKEND
  ====================================== */

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL =
          import.meta.env.VITE_API_URL ||
          "http://localhost:8000";

         const response = await fetch(
        `${API_URL}/api/v1/products?limit=all`
       );

        if (!response.ok) {
          throw new Error(
            "Unable to load products."
          );
        }

        const data = await response.json();

        /*
          Existing backend may return:
          {
            products: [...]
          }

          or directly [...]
        */

        const productList =
          data.products || data || [];

        setProducts(
          Array.isArray(productList)
            ? productList
            : []
        );
      } catch (err) {
        console.error(err);

        setError(
          "We couldn't load the bakery menu. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  /* ======================================
     URL CATEGORY
  ====================================== */

  useEffect(() => {
    const urlCategory =
      searchParams.get("category");

    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [searchParams]);

  /* ======================================
     FILTER + SEARCH + SORT
  ====================================== */

  const filteredProducts =
    useMemo(() => {
      let result = [...products];

      if (category !== "All") {
        result = result.filter(
          (product) =>
            product.category
              ?.toLowerCase()
              .trim() ===
            category
              .toLowerCase()
              .trim()
        );
      }

      if (search.trim()) {
        const keyword =
          search
            .toLowerCase()
            .trim();

        result = result.filter(
          (product) =>
            product.name
              ?.toLowerCase()
              .includes(keyword) ||
            product.description
              ?.toLowerCase()
              .includes(keyword) ||
            product.category
              ?.toLowerCase()
              .includes(keyword)
        );
      }

      if (sort === "price-low") {
        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );
      }

      if (sort === "price-high") {
        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );
      }

      if (sort === "name") {
        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      if (sort === "newest") {
        result.sort(
          (a, b) =>
            new Date(
              b.createdAt || 0
            ) -
            new Date(
              a.createdAt || 0
            )
        );
      }

      return result;
    }, [
      products,
      category,
      search,
      sort,
    ]);

  /* ======================================
     PAGINATION
  ====================================== */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProducts.length /
          pageSize
      )
    );

  const currentProducts =
    filteredProducts.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  useEffect(() => {
    setPage(1);
  }, [
    category,
    search,
    sort,
  ]);

  /* ======================================
     CATEGORY CHANGE
  ====================================== */

  const handleCategoryChange = (
    newCategory
  ) => {
    setCategory(newCategory);

    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: newCategory,
      });
    }
  };

  /* ======================================
     FAVORITE
  ====================================== */

  const toggleFavorite = (
    productId
  ) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter(
            (id) =>
              id !== productId
          )
        : [
            ...current,
            productId,
          ]
    );
  };

  /* ======================================
     PRICE
  ====================================== */

  const formatPrice = (
    value
  ) => {
    return (
      Number(value || 0)
        .toLocaleString(
          "vi-VN"
        ) + "đ"
    );
  };

  /* ======================================
     PRODUCT IMAGE
  ====================================== */

  const getProductImage = (
    product
  ) => {
    if (
      product.images &&
      product.images.length > 0
    ) {
      return (
        product.images[0].url ||
        product.images[0]
      );
    }

    if (product.image) {
      return product.image;
    }

    return "/images/products/strawberry-cake.jpg";
  };

  return (
    <main className="bakery-products-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="menu-hero">
        <div className="menu-hero-content">

          <span className="menu-eyebrow">
            FRESH FROM THE OVEN
          </span>

          <h1>
            Our Bakery Menu
          </h1>

          <p>
            Discover handcrafted cakes,
            pastries and treats made fresh
            for every sweet moment.
          </p>

        </div>
      </section>

      {/* =================================
          CATEGORY NAVIGATION
      ================================= */}

      <section className="menu-category-section">

        <div className="menu-category-list">

          {categories.map(
            (item) => (
              <button
                key={item}
                type="button"
                className={`menu-category-button ${
                  category === item
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleCategoryChange(
                    item
                  )
                }
              >
                {item}
              </button>
            )
          )}

        </div>

      </section>

      {/* =================================
          SEARCH / SORT
      ================================= */}

      <section className="menu-toolbar">

        <div className="menu-search">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <path d="m20 20-3.5-3.5" />
          </svg>

          <input
            type="text"
            placeholder="Search cakes, pastries and treats..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>

        <div className="menu-toolbar-right">

          <span className="product-result-count">
            {
              filteredProducts.length
            }{" "}
            products
          </span>

          <div className="sort-container">

            <span>
              Sort by
            </span>

            <select
              value={sort}
              onChange={(
                event
              ) =>
                setSort(
                  event.target.value
                )
              }
            >
              {sortOptions.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {
                      option.label
                    }
                  </option>
                )
              )}
            </select>

          </div>

        </div>

      </section>

      {/* =================================
          CONTENT
      ================================= */}

      <section className="menu-products-section">

        {loading && (
          <div className="menu-status">
            <div className="bakery-loader" />

            <h3>
              Preparing the menu...
            </h3>

            <p>
              Fresh treats are on the
              way.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="menu-status">
            <span className="status-icon">
              ♡
            </span>

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          currentProducts.length ===
            0 && (
            <div className="menu-status">

              <span className="status-icon">
                🍰
              </span>

              <h3>
                No treats found
              </h3>

              <p>
                Try another category
                or search term.
              </p>

              <button
                type="button"
                className="clear-filter-button"
                onClick={() => {
                  setSearch("");
                  handleCategoryChange(
                    "All"
                  );
                }}
              >
                View All Products
              </button>

            </div>
          )}

        {!loading &&
          !error &&
          currentProducts.length >
            0 && (
            <div className="bakery-product-grid">

              {currentProducts.map(
                (product) => {
                  const liked =
                    favorites.includes(
                      product._id
                    );

                  return (
                    <article
                      key={
                        product._id
                      }
                      className="bakery-product-card"
                    >

                      <div className="bakery-product-image">

                        <Link
                          to={`/product/${product._id}`}
                        >
                          <img
                            src={getProductImage(
                              product
                            )}
                            alt={
                              product.name
                            }
                          />
                        </Link>

                        {product.featured && (
                          <span className="bakery-product-badge">
                            Best Seller
                          </span>
                        )}

                        <button
                          type="button"
                          className={`bakery-favorite-button ${
                            liked
                              ? "liked"
                              : ""
                          }`}
                          onClick={() =>
                            toggleFavorite(
                              product._id
                            )
                          }
                          aria-label="Add to favorites"
                        >
                          {liked
                            ? "♥"
                            : "♡"}
                        </button>

                      </div>

                      <div className="bakery-product-info">

                        <span className="bakery-product-category">
                          {
                            product.category
                          }
                        </span>

                        <Link
                          to={`/product/${product._id}`}
                        >
                          <h3>
                            {
                              product.name
                            }
                          </h3>
                        </Link>

                        {product.description && (
                          <p className="bakery-product-description">
                            {
                              product.description
                            }
                          </p>
                        )}

                        <div className="bakery-product-bottom">

                          <strong>
                            {formatPrice(
                              product.price
                            )}
                          </strong>

                          <Link
                            to={`/product/${product._id}`}
                            className="view-product-button"
                          >
                            View
                            <span>
                              →
                            </span>
                          </Link>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          )}

      </section>

      {/* =================================
          PAGINATION
      ================================= */}

      {!loading &&
        !error &&
        filteredProducts.length >
          pageSize && (
          <div className="bakery-pagination">

            <button
              type="button"
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  (current) =>
                    current - 1
                )
              }
            >
              ←
            </button>

            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (
                pageNumber
              ) => (
                <button
                  key={
                    pageNumber
                  }
                  type="button"
                  className={
                    page ===
                    pageNumber
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPage(
                      pageNumber
                    )
                  }
                >
                  {
                    pageNumber
                  }
                </button>
              )
            )}

            <button
              type="button"
              disabled={
                page ===
                totalPages
              }
              onClick={() =>
                setPage(
                  (current) =>
                    current + 1
                )
              }
            >
              →
            </button>

          </div>
        )}

      {/* =================================
          CUSTOM CAKE CTA
      ================================= */}

      <section className="menu-custom-banner">

        <div>
          <span>
            MADE JUST FOR YOU
          </span>

          <h2>
            Looking for something
            special?
          </h2>

          <p>
            Create a custom cake for
            birthdays, anniversaries and
            unforgettable celebrations.
          </p>
        </div>

        <a href="/#custom-cakes">
          Design Your Cake
          <span>→</span>
        </a>

      </section>

    </main>
  );
};

export default Products;