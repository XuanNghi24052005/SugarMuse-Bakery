  import React, { useEffect, useMemo, useState } from "react";

  import { useSearchParams } from "react-router-dom";
  import ProductCard from "../components/Product";
  import "../pageStyles/Products.css";

  /*
    Ảnh hero: nên dùng một ảnh riêng (bánh nằm giữa khung, còn khoảng thở
    xung quanh, thấy đủ đế đĩa) thay vì dùng chung ảnh của thẻ sản phẩm.
    Đổi đường dẫn tại đây khi bạn có ảnh hero riêng.
  */
  const HERO_IMAGE = "/images/products/strawberry-cake.jpg";

  /*
    Đặt true khi HERO_IMAGE là ảnh hero ngang riêng (tỉ lệ khoảng 2.3:1).
    Để false khi dùng ảnh gần vuông như ảnh sản phẩm: khi đó ảnh được hiện
    trọn bánh, hai bên mờ dần vào nền hồng của khung vòm.
  */
  const HERO_IMAGE_IS_WIDE = false;

  const products = [
    { _id: "1", name: "Chocolate Ganache Cake", price: 35, category: "Cake", ratings: 4.9, numReviews: 24, image: "/images/products/chocolate-cake.jpg" },
    { _id: "2", name: "Strawberry Cream Cake", price: 32, category: "Cake", ratings: 4.8, numReviews: 18, image: "/images/products/strawberry-cake.jpg" },
    { _id: "3", name: "Classic Tiramisu", price: 18, category: "Cake", ratings: 4.8, numReviews: 31, image: "/images/products/tiramisu.jpg" },
    { _id: "4", name: "Matcha Cream Cake", price: 30, category: "Cake", ratings: 4.7, numReviews: 20, image: "/images/products/matcha-cake.jpg" },
    { _id: "5", name: "Blueberry Vanilla Cake", price: 34, category: "Cake", ratings: 4.9, numReviews: 16, image: "/images/products/blueberry-cake.jpg" },
    { _id: "6", name: "Red Velvet Cake", price: 33, category: "Cake", ratings: 4.8, numReviews: 21, image: "/images/products/red-velvet-cake.jpg" },
    { _id: "7", name: "Lemon Berry Cake", price: 31, category: "Cake", ratings: 4.7, numReviews: 14, image: "/images/products/lemon-berry-cake.jpg" },
    { _id: "8", name: "Caramel Lotus Cake", price: 36, category: "Cake", ratings: 4.9, numReviews: 19, image: "/images/products/caramel-lotus-cake.jpg" },
    { _id: "9", name: "Butter Croissant", price: 4.5, category: "Pastry", ratings: 4.8, numReviews: 27, image: "/images/products/croissant.jpg" },
    { _id: "10", name: "Cinnamon Swirl", price: 5.5, category: "Pastry", ratings: 4.7, numReviews: 17, image: "/images/products/cinnamon-roll.jpg" },
    { _id: "11", name: "Almond Danish", price: 5.8, category: "Pastry", ratings: 4.8, numReviews: 13, image: "/images/products/almond-danish.jpg" },
    { _id: "12", name: "Fresh Fruit Tart", price: 8, category: "Pastry", ratings: 4.9, numReviews: 25, image: "/images/products/fruit-tart.jpg" },
    { _id: "13", name: "Vanilla Cupcake", price: 4, category: "Pastry", ratings: 4.7, numReviews: 12, image: "/images/products/cupcake.jpg" },
    { _id: "14", name: "Chocolate Danish", price: 5.9, category: "Pastry", ratings: 4.8, numReviews: 15, image: "/images/products/chocolate-danish.jpg" },
    { _id: "15", name: "Cream Puff", price: 4.8, category: "Pastry", ratings: 4.6, numReviews: 11, image: "/images/products/cream-puff.jpg" },
    { _id: "16", name: "Strawberry Danish", price: 6.2, category: "Pastry", ratings: 4.8, numReviews: 18, image: "/images/products/strawberry-danish.jpg" },
    { _id: "17", name: "Chicken Mushroom Pie", price: 7.5, category: "Savory", ratings: 4.8, numReviews: 20, image: "/images/products/chicken-mushroom-pie.jpg" },
    { _id: "18", name: "Spinach Mushroom Quiche", price: 8.5, category: "Savory", ratings: 4.9, numReviews: 18, image: "/images/products/spinach-quiche.jpg" },
    { _id: "19", name: "Ham & Cheese Croissant", price: 6.5, category: "Savory", ratings: 4.7, numReviews: 14, image: "/images/products/ham-cheese-croissant.jpg" },
    { _id: "20", name: "Classic Sausage Roll", price: 6, category: "Savory", ratings: 4.6, numReviews: 12, image: "/images/products/classic-sausage-roll.jpg" },
    { _id: "21", name: "Mini Savory Tart", price: 7, category: "Savory", ratings: 4.7, numReviews: 15, image: "/images/products/mini-savory-tart.jpg" },
    { _id: "22", name: "Chicken Puff Pastry", price: 6.8, category: "Savory", ratings: 4.8, numReviews: 16, image: "/images/products/chicken-puff-pastry.jpg" },
    { _id: "23", name: "Cheese Garlic Roll", price: 5.5, category: "Savory", ratings: 4.6, numReviews: 10, image: "/images/products/cheese-garlic-roll.jpg" },
    { _id: "24", name: "Bacon Egg Tart", price: 7.8, category: "Savory", ratings: 4.8, numReviews: 13, image: "/images/products/bacon-egg-tart.jpg" },
    { _id: "25", name: "Macaron Gift Box", price: 24, category: "Gift Box", ratings: 4.9, numReviews: 21, image: "/images/products/macaron-box.jpg" },
    { _id: "26", name: "Cookie Gift Box", price: 20, category: "Gift Box", ratings: 4.8, numReviews: 17, image: "/images/products/cookies.jpg" },
    { _id: "27", name: "Afternoon Tea Box", price: 28, category: "Gift Box", ratings: 4.9, numReviews: 19, image: "/images/products/afternoon-tea-box.jpg" },
    { _id: "28", name: "Birthday Treat Box", price: 30, category: "Gift Box", ratings: 4.8, numReviews: 23, image: "/images/products/birthday-treat-box.jpg" },
    { _id: "29", name: "Mixed Pastry Box", price: 26, category: "Gift Box", ratings: 4.7, numReviews: 16, image: "/images/products/mixed-pastry-box.jpg" },
    { _id: "30", name: "Mini Cake Gift Box", price: 32, category: "Gift Box", ratings: 4.9, numReviews: 20, image: "/images/products/mini-cake-gift-box.jpg" },
    { _id: "31", name: "Sweet Celebration Box", price: 35, category: "Gift Box", ratings: 4.9, numReviews: 25, image: "/images/products/sweet-celebration-box.jpg" },
    { _id: "32", name: "Sugar Muse Signature Box", price: 38, category: "Gift Box", ratings: 5, numReviews: 29, image: "/images/products/sugar-muse-signature-box.jpg" },
  ];

  const categories = ["All", "Cake", "Pastry", "Savory", "Gift Box"];

  const CategoryIcon = ({ category }) => {
    const props = {
      viewBox: "0 0 32 32",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
    };

    if (category === "All") {
      return (
        <svg {...props}>
          <path d="M5 13h22v12H5z" />
          <path d="M5 17h22" />
          <path d="M8 13 16 7l8 6" />
          <path d="M12 21h8" />
          <path d="M16 7V4" />
        </svg>
      );
    }

    if (category === "Cake") {
      return (
        <svg {...props}>
          <path d="M6 15 25 8v17H6z" />
          <path d="M6 19h19" />
          <path d="M10 15c2 2 4 2 6 0 2 2 4 2 6 0" />
          <path d="M18 10c0-2 1-3 2-4" />
        </svg>
      );
    }

    if (category === "Pastry") {
      return (
        <svg {...props}>
          <path d="M5 21c2-8 6-12 11-12s9 4 11 12" />
          <path d="M8 20c2 2 4 3 8 3s6-1 8-3" />
          <path d="M11 12c1 3 1 6 0 9" />
          <path d="M16 9c-1 4-1 9 0 14" />
          <path d="M21 12c-1 3-1 6 0 9" />
        </svg>
      );
    }

    if (category === "Savory") {
      return (
        <svg {...props}>
          <ellipse cx="16" cy="12" rx="10" ry="4" />
          <path d="M6 12v9c0 3 4 5 10 5s10-2 10-5v-9" />
          <path d="M10 12c2 2 4 3 6 3s4-1 6-3" />
          <path d="M12 8c1-2 3-3 4-3" />
        </svg>
      );
    }

    return (
      <svg {...props}>
        <rect x="7" y="12" width="18" height="15" rx="1" />
        <path d="M5 9h22v6H5z" />
        <path d="M16 9v18" />
        <path d="M16 9c-4 0-7-1-7-4 0-2 2-3 4-2 2 1 3 4 3 6Z" />
        <path d="M16 9c4 0 7-1 7-4 0-2-2-3-4-2-2 1-3 4-3 6Z" />
      </svg>
    );
  };

  const ChevronDown = ({ className = "" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  const ArrowIcon = ({ direction = "right" }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <>
          <path d="M19 12H5" />
          <path d="m11 6-6 6 6 6" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
    </svg>
  );

  const FloralSprig = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 150 220" fill="none" aria-hidden="true">
      <path d="M18 210C38 164 59 126 93 90C112 69 126 42 132 10" stroke="#84934e" strokeWidth="1.4" />
      <path d="M50 152C35 142 25 132 17 118" stroke="#84934e" strokeWidth="1.1" />
      <path d="M72 124C89 115 101 105 112 92" stroke="#84934e" strokeWidth="1.1" />
      <path d="M94 90C78 80 67 68 59 53" stroke="#84934e" strokeWidth="1.1" />

      {[
        [18, 116],
        [27, 126],
        [36, 137],
        [107, 91],
        [116, 80],
        [124, 67],
        [59, 51],
        [68, 61],
        [129, 28],
        [136, 17],
      ].map(([cx, cy], index) => (
        <g key={index}>
          <circle cx={cx} cy={cy} r="5.5" fill="#f7cfc8" />
          <circle cx={cx + 5} cy={cy + 3} r="4" fill="#fce4df" />
          <circle cx={cx - 4} cy={cy + 4} r="3.6" fill="#fff3ef" />
        </g>
      ))}
    </svg>
  );

  /* viền gợn sóng của huy hiệu: 30 vòng tròn nhỏ quanh một đường tròn lớn */
  const SCALLOPS = Array.from({ length: 30 }, (_, index) => {
    const angle = (index / 30) * Math.PI * 2;
    return [80 + Math.cos(angle) * 70, 80 + Math.sin(angle) * 70];
  });

  const HeroBadge = () => (
    <div className="hero-round-label">
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <defs>
          <path
            id="badge-circle"
            d="M80,80 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"
          />
        </defs>

        <g className="badge-bg">
          <circle cx="80" cy="80" r="70" />
          {SCALLOPS.map(([cx, cy], index) => (
            <circle key={index} cx={cx} cy={cy} r="8" />
          ))}
        </g>

        <text className="badge-circle-text" transform="rotate(-20 80 80)">
          <textPath href="#badge-circle" startOffset="0">
            CAKES • PASTRIES • SAVORY • GIFT BOXES •
          </textPath>
        </text>

        <path
          className="badge-heart"
          d="M80 98 66 84c-9-9 4-22 14-12 10-10 23 3 14 12Z"
        />
      </svg>
    </div>
  );

  const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    /* không có ?category=... trên URL thì mặc định là "All" */
    const selectedCategory = searchParams.get("category") || "All";

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 4;

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    const handleCategoryChange = (category) => {
      setCurrentPage(1);

      if (category === "All") {
        setSearchParams({});
      } else {
        setSearchParams({ category });
      }
    };

    const filteredProducts = useMemo(() => {
      let result = [...products];

      if (selectedCategory !== "All") {
        result = result.filter((product) => product.category === selectedCategory);
      }

      if (search.trim()) {
        const keyword = search.trim().toLowerCase();

        result = result.filter((product) =>
          product.name.toLowerCase().includes(keyword)
        );
      }

      if (sort === "price-low") {
        result.sort((a, b) => a.price - b.price);
      }

      if (sort === "price-high") {
        result.sort((a, b) => b.price - a.price);
      }

      if (sort === "rating") {
        result.sort((a, b) => b.ratings - a.ratings);
      }

      if (sort === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }

      return result;
    }, [selectedCategory, search, sort]);

    const totalPages = Math.max(
      1,
      Math.ceil(filteredProducts.length / productsPerPage)
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const startIndex = (safeCurrentPage - 1) * productsPerPage;

    const currentProducts = filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

    return (
      <main className="sugar-products-page">
        <FloralSprig className="page-flower page-flower-right" />
        <FloralSprig className="page-flower page-flower-card" />
        <FloralSprig className="page-flower page-flower-left" />

        <section className="bakery-menu-hero">
          <div className="bakery-menu-hero-inner">
            <div className="menu-hero-copy">
              <div className="menu-eyebrow-row">
                <span>FRESH FROM THE OVEN</span>
                <span className="eyebrow-line" />
              </div>

              <h1>Our Bakery Menu</h1>

              <p>
                Handcrafted cakes, pastries and savory treats
                <br />
                made fresh for every sweet moment.
              </p>

              <svg
                className="menu-ribbon"
                viewBox="0 0 380 80"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 62C60 66 100 56 150 40C175 30 195 8 175 4C150 0 140 30 170 46C220 66 300 50 376 20" />
              </svg>
            </div>

            <div className="menu-hero-visual">
              <div
                className={
                  HERO_IMAGE_IS_WIDE ? "hero-arch is-wide" : "hero-arch"
                }
              >
                <img
                  className="hero-arch-img"
                  src={HERO_IMAGE}
                  alt="Sugar Muse bakery"
                />
              </div>

              <HeroBadge />
            </div>
          </div>
        </section>

        <section className="menu-controls">
          <div className="menu-controls-inner">
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory === category
                      ? "category-tab active"
                      : "category-tab"
                  }
                  onClick={() => handleCategoryChange(category)}
                >
                  <CategoryIcon category={category} />

                  <span>{category}</span>
                </button>
              ))}
            </div>

            <div className="menu-controls-divider" />

            <div className="menu-search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              <input
                type="text"
                placeholder="Search our bakes..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="menu-sort-wrap">
              <select
                className="menu-sort"
                value={sort}
                aria-label="Sort products"
                onChange={(event) => {
                  setSort(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>

              <ChevronDown className="menu-sort-chevron" />
            </div>
          </div>
        </section>

        <section className="bakery-products-section">
          <div className="bakery-products-inner">
            {currentProducts.length > 0 ? (
              <div className="boutique-product-grid">
                {currentProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="menu-empty-state">
                <div>♡</div>

                <h3>No bakes found</h3>

                <p>Try another search or category.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="boutique-pagination">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  <ArrowIcon direction="left" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      className={safeCurrentPage === page ? "active" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  aria-label="Next page"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  };

  export default Products;