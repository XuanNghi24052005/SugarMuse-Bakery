    import React, { useMemo, useState } from "react";
    import { useSearchParams } from "react-router-dom";
    import Product from "../components/Product";
    import "../pageStyles/Products.css";

    const products = [
      {
        _id: "1",
        name: "Chocolate Ganache Cake",
        price: 35,
        category: "Cake",
        ratings: 4.9,
        numReviews: 24,
        image: "/images/products/chocolate-cake.jpg",
      },
      {
        _id: "2",
        name: "Strawberry Cream Cake",
        price: 32,
        category: "Cake",
        ratings: 4.8,
        numReviews: 18,
        image: "/images/products/strawberry-cake.jpg",
      },
      {
        _id: "3",
        name: "Classic Tiramisu",
        price: 18,
        category: "Cake",
        ratings: 4.8,
        numReviews: 31,
        image: "/images/products/tiramisu.jpg",
      },
      {
        _id: "4",
        name: "Matcha Cream Cake",
        price: 30,
        category: "Cake",
        ratings: 4.7,
        numReviews: 20,
        image: "/images/products/matcha-cake.jpg",
      },
      {
        _id: "5",
        name: "Blueberry Vanilla Cake",
        price: 34,
        category: "Cake",
        ratings: 4.9,
        numReviews: 16,
        image: "/images/products/blueberry-cake.jpg",
      },
      {
        _id: "6",
        name: "Red Velvet Cake",
        price: 33,
        category: "Cake",
        ratings: 4.8,
        numReviews: 21,
        image: "/images/products/red-velvet-cake.jpg",
      },
      {
        _id: "7",
        name: "Lemon Berry Cake",
        price: 31,
        category: "Cake",
        ratings: 4.7,
        numReviews: 14,
        image: "/images/products/lemon-berry-cake.jpg",
      },
      {
        _id: "8",
        name: "Caramel Lotus Cake",
        price: 36,
        category: "Cake",
        ratings: 4.9,
        numReviews: 19,
        image: "/images/products/caramel-lotus-cake.jpg",
      },

      {
        _id: "9",
        name: "Butter Croissant",
        price: 4.5,
        category: "Pastry",
        ratings: 4.8,
        numReviews: 27,
        image: "/images/products/croissant.jpg",
      },
      {
        _id: "10",
        name: "Cinnamon Swirl",
        price: 5.5,
        category: "Pastry",
        ratings: 4.7,
        numReviews: 17,
        image: "/images/products/cinnamon-roll.jpg",
      },
      {
        _id: "11",
        name: "Almond Danish",
        price: 5.8,
        category: "Pastry",
        ratings: 4.8,
        numReviews: 13,
        image: "/images/products/almond-danish.jpg",
      },
      {
        _id: "12",
        name: "Fresh Fruit Tart",
        price: 8,
        category: "Pastry",
        ratings: 4.9,
        numReviews: 25,
        image: "/images/products/fruit-tart.jpg",
      },
      {
        _id: "13",
        name: "Vanilla Cupcake",
        price: 4,
        category: "Pastry",
        ratings: 4.7,
        numReviews: 12,
        image: "/images/products/cupcake.jpg",
      },
      {
        _id: "14",
        name: "Chocolate Danish",
        price: 5.9,
        category: "Pastry",
        ratings: 4.8,
        numReviews: 15,
        image: "/images/products/chocolate-danish.jpg",
      },
      {
        _id: "15",
        name: "Cream Puff",
        price: 4.8,
        category: "Pastry",
        ratings: 4.6,
        numReviews: 11,
        image: "/images/products/cream-puff.jpg",
      },
      {
        _id: "16",
        name: "Strawberry Danish",
        price: 6.2,
        category: "Pastry",
        ratings: 4.8,
        numReviews: 18,
        image: "/images/products/strawberry-danish.jpg",
      },

      {
        _id: "17",
        name: "Chicken Mushroom Pie",
        price: 7.5,
        category: "Savory",
        ratings: 4.8,
        numReviews: 20,
        image: "/images/products/chicken-mushroom-pie.jpg",
      },
      {
        _id: "18",
        name: "Spinach Mushroom Quiche",
        price: 8.5,
        category: "Savory",
        ratings: 4.9,
        numReviews: 18,
        image: "/images/products/spinach-quiche.jpg",
      },
      {
        _id: "19",
        name: "Ham & Cheese Croissant",
        price: 6.5,
        category: "Savory",
        ratings: 4.7,
        numReviews: 14,
        image: "/images/products/ham-cheese-croissant.jpg",
      },
      {
        _id: "20",
        name: "Classic Sausage Roll",
        price: 6,
        category: "Savory",
        ratings: 4.6,
        numReviews: 12,
        image: "/images/products/sausage-roll.jpg",
      },
      {
        _id: "21",
        name: "Mini Savory Tart",
        price: 7,
        category: "Savory",
        ratings: 4.7,
        numReviews: 15,
        image: "/images/products/savory-tart.jpg",
      },
      {
        _id: "22",
        name: "Chicken Puff Pastry",
        price: 6.8,
        category: "Savory",
        ratings: 4.8,
        numReviews: 16,
        image: "/images/products/chicken-puff.jpg",
      },
      {
        _id: "23",
        name: "Cheese Garlic Roll",
        price: 5.5,
        category: "Savory",
        ratings: 4.6,
        numReviews: 10,
        image: "/images/products/cheese-garlic-roll.jpg",
      },
      {
        _id: "24",
        name: "Bacon Egg Tart",
        price: 7.8,
        category: "Savory",
        ratings: 4.8,
        numReviews: 13,
        image: "/images/products/bacon-egg-tart.jpg",
      },

      {
        _id: "25",
        name: "Macaron Gift Box",
        price: 24,
        category: "Gift Box",
        ratings: 4.9,
        numReviews: 21,
        image: "/images/products/macaron-box.jpg",
      },
      {
        _id: "26",
        name: "Cookie Gift Box",
        price: 20,
        category: "Gift Box",
        ratings: 4.8,
        numReviews: 17,
        image: "/images/products/cookies.jpg",
      },
      {
        _id: "27",
        name: "Afternoon Tea Box",
        price: 28,
        category: "Gift Box",
        ratings: 4.9,
        numReviews: 19,
        image: "/images/products/afternoon-tea-box.jpg",
      },
      {
        _id: "28",
        name: "Birthday Treat Box",
        price: 30,
        category: "Gift Box",
        ratings: 4.8,
        numReviews: 23,
        image: "/images/products/birthday-treat-box.jpg",
      },
      {
        _id: "29",
        name: "Mixed Pastry Box",
        price: 26,
        category: "Gift Box",
        ratings: 4.7,
        numReviews: 16,
        image: "/images/products/pastry-box.jpg",
      },
      {
        _id: "30",
        name: "Mini Cake Gift Box",
        price: 32,
        category: "Gift Box",
        ratings: 4.9,
        numReviews: 20,
        image: "/images/products/mini-cake-box.jpg",
      },
      {
        _id: "31",
        name: "Sweet Celebration Box",
        price: 35,
        category: "Gift Box",
        ratings: 4.9,
        numReviews: 25,
        image: "/images/products/celebration-box.jpg",
      },
      {
        _id: "32",
        name: "Sugar Muse Signature Box",
        price: 38,
        category: "Gift Box",
        ratings: 5,
        numReviews: 29,
        image: "/images/products/signature-box.jpg",
      },
    ];

    const categories = [
      "All",
      "Cake",
      "Pastry",
      "Savory",
      "Gift Box",
    ];

    const Products = () => {
      const [searchParams, setSearchParams] = useSearchParams();

      const selectedCategory =
        searchParams.get("category") || "All";

      const [search, setSearch] = useState("");
      const [sort, setSort] = useState("newest");
      const [currentPage, setCurrentPage] = useState(1);

      const productsPerPage = 4;

      const handleCategoryChange = (category) => {
        setCurrentPage(1);

        if (category === "All") {
          setSearchParams({});
        } else {
          setSearchParams({
            category,
          });
        }
      };

      const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== "All") {
          result = result.filter(
            (product) =>
              product.category === selectedCategory
          );
        }

        if (search.trim()) {
          const keyword = search
            .trim()
            .toLowerCase();

          result = result.filter((product) =>
            product.name
              .toLowerCase()
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

        if (sort === "rating") {
          result.sort(
            (a, b) =>
              Number(b.ratings) -
              Number(a.ratings)
          );
        }

        if (sort === "name") {
          result.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }

        return result;
      }, [
        selectedCategory,
        search,
        sort,
      ]);

      const totalPages = Math.max(
        1,
        Math.ceil(
          filteredProducts.length /
            productsPerPage
        )
      );

      const safeCurrentPage = Math.min(
        currentPage,
        totalPages
      );

      const startIndex =
        (safeCurrentPage - 1) *
        productsPerPage;

      const currentProducts =
        filteredProducts.slice(
          startIndex,
          startIndex + productsPerPage
        );

      return (
        <main className="sugar-products-page">
          <section className="bakery-menu-hero">
            <div className="menu-hero-copy">
              <div className="menu-eyebrow-row">
                <span>
                  FRESH FROM THE OVEN
                </span>

                <span className="eyebrow-line" />
              </div>

              <h1>
                Our Bakery Menu
              </h1>

              <p>
                Handcrafted cakes, pastries and
                savory treats made fresh for every
                sweet moment.
              </p>

              <div className="menu-ribbon-line">
                ♡
              </div>
            </div>

            <div className="menu-hero-visual">
              <div className="hero-arch">
                <img
                  src="/images/products/strawberry-cake.jpg"
                  alt="Sugar Muse bakery"
                />
              </div>

              <div className="hero-round-label">
                <span>
                  CAKES • PASTRIES
                </span>

                <strong>
                  ♡
                </strong>

                <span>
                  SAVORY • GIFT BOXES
                </span>
              </div>
            </div>
          </section>

          <section className="menu-controls">
            <div className="category-tabs">
              {categories.map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      selectedCategory ===
                      category
                        ? "category-tab active"
                        : "category-tab"
                    }
                    onClick={() =>
                      handleCategoryChange(
                        category
                      )
                    }
                  >
                    <span className="category-tab-icon">
                      {category === "All" &&
                        "♡"}

                      {category === "Cake" &&
                        "🍰"}

                      {category ===
                        "Pastry" && "🥐"}

                      {category ===
                        "Savory" && "🥧"}

                      {category ===
                        "Gift Box" && "🎁"}
                    </span>

                    {category}
                  </button>
                )
              )}
            </div>

            <div className="menu-controls-divider" />

            <div className="menu-search">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
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
                placeholder="Search our bakes..."
                value={search}
                onChange={(event) => {
                  setSearch(
                    event.target.value
                  );

                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              className="menu-sort"
              value={sort}
              onChange={(event) => {
                setSort(
                  event.target.value
                );

                setCurrentPage(1);
              }}
            >
              <option value="newest">
                Newest
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="name">
                Name: A-Z
              </option>
            </select>
          </section>

          <section className="bakery-products-section">
            {currentProducts.length >
            0 ? (
              <div className="boutique-product-grid">
                {currentProducts.map(
                  (product) => (
                    <Product
                      key={product._id}
                      product={product}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="menu-empty-state">
                <div>
                  ♡
                </div>

                <h3>
                  No bakes found
                </h3>

                <p>
                  Try another search or category.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="boutique-pagination">
                <button
                  type="button"
                  disabled={
                    safeCurrentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          1,
                          page - 1
                        )
                    )
                  }
                >
                  ←
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={
                      safeCurrentPage ===
                      page
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={
                    safeCurrentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          totalPages,
                          page + 1
                        )
                    )
                  }
                >
                  →
                </button>
              </div>
            )}
          </section>
        </main>
      );
    };

    export default Products;