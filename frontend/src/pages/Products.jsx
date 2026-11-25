import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import Product from "../components/Product";
import axiosInstance from "../utils/axiosInstance";
import "../pageStyles/Products.css";
import {
  saverecentlyViewed,
} from "../utils/RecentlyViewed";
const HERO_IMAGE =
  "/images/products/strawberry-cake.jpg";

const HERO_IMAGE_IS_WIDE = false;

const products = [
  {
    "_id": "1",
    "name": "Chocolate Ganache Cake",
    "price": 35,
    "category": "Cake",
    "description": "Rich dark Belgian chocolate sponge layered with silky ganache and chocolate curls.",
    "flavor": "Dark Chocolate",
    "ratings": 4.9,
    "numReviews": 24,
    "image": "/images/products/chocolate-cake.jpg",
    "stock": 20
  },
  {
    "_id": "2",
    "name": "Strawberry Cream Cake",
    "price": 32,
    "category": "Cake",
    "description": "Light vanilla sponge cake enveloped in fresh Hokkaido whipped cream and hand-picked strawberries.",
    "flavor": "Strawberry Vanilla",
    "ratings": 4.8,
    "numReviews": 18,
    "image": "/images/products/strawberry-cake.jpg",
    "stock": 25
  },
  {
    "_id": "3",
    "name": "Classic Tiramisu",
    "price": 18,
    "category": "Cake",
    "description": "Authentic Italian tiramisu with espresso-soaked savoiardi, mascarpone cream and cocoa powder.",
    "flavor": "Coffee Mascarpone",
    "ratings": 4.8,
    "numReviews": 31,
    "image": "/images/products/tiramisu.jpg",
    "stock": 30
  },
  {
    "_id": "4",
    "name": "Matcha Cream Cake",
    "price": 30,
    "category": "Cake",
    "description": "Ceremonial grade Uji matcha sponge with delicate white chocolate chantilly cream.",
    "flavor": "Uji Matcha",
    "ratings": 4.7,
    "numReviews": 20,
    "image": "/images/products/matcha-cake.jpg",
    "stock": 18
  },
  {
    "_id": "5",
    "name": "Blueberry Vanilla Cake",
    "price": 34,
    "category": "Cake",
    "description": "Soft vanilla bean sponge infused with wild blueberry compote and lavender cream.",
    "flavor": "Wild Blueberry",
    "ratings": 4.9,
    "numReviews": 16,
    "image": "/images/products/blueberry-vanilla-cake.jpg",
    "stock": 15
  },
  {
    "_id": "6",
    "name": "Red Velvet Cake",
    "price": 33,
    "category": "Cake",
    "description": "Velvety cocoa buttermilk cake layered with smooth vanilla bean cream cheese frosting.",
    "flavor": "Red Velvet",
    "ratings": 4.8,
    "numReviews": 21,
    "image": "/images/products/red-velvet-cake.jpg",
    "stock": 20
  },
  {
    "_id": "7",
    "name": "Lemon Berry Cake",
    "price": 31,
    "category": "Cake",
    "description": "Zesty Meyer lemon curd and mixed summer berries between moist citrus sponge layers.",
    "flavor": "Lemon & Mixed Berry",
    "ratings": 4.7,
    "numReviews": 14,
    "image": "/images/products/lemon-berry-cake.jpg",
    "stock": 16
  },
  {
    "_id": "8",
    "name": "Caramel Lotus Cake",
    "price": 36,
    "category": "Cake",
    "description": "Caramelized Biscoff spread infused layers with crushed Lotus cookies and salted caramel drip.",
    "flavor": "Caramel Lotus Biscoff",
    "ratings": 4.9,
    "numReviews": 19,
    "image": "/images/products/caramel-lotus-cake.jpg",
    "stock": 15
  },
  {
    "_id": "9",
    "name": "Butter Croissant",
    "price": 4.5,
    "category": "Pastry",
    "description": "Golden flaky croissant laminated with 100% French AOP butter, crispy outside and honeycomb airy inside.",
    "flavor": "French Butter",
    "ratings": 4.8,
    "numReviews": 27,
    "image": "/images/products/croissant.jpg",
    "stock": 50
  },
  {
    "_id": "10",
    "name": "Cinnamon Swirl",
    "price": 5.5,
    "category": "Pastry",
    "description": "Tender brioche swirled with Ceylon cinnamon sugar and topped with vanilla glaze.",
    "flavor": "Ceylon Cinnamon",
    "ratings": 4.7,
    "numReviews": 17,
    "image": "/images/products/cinnamon-roll.jpg",
    "stock": 35
  },
  {
    "_id": "11",
    "name": "Almond Danish",
    "price": 5.8,
    "category": "Pastry",
    "description": "Flaky Danish pastry filled with rich almond frangipane cream and topped with toasted almond flakes.",
    "flavor": "Almond Frangipane",
    "ratings": 4.8,
    "numReviews": 13,
    "image": "/images/products/almond-danish.jpg",
    "stock": 30
  },
  {
    "_id": "12",
    "name": "Fresh Fruit Tart",
    "price": 8,
    "category": "Pastry",
    "description": "Crisp sweet pastry shell filled with Tahitian vanilla pastry cream and topped with seasonal berries.",
    "flavor": "Vanilla & Fresh Fruit",
    "ratings": 4.9,
    "numReviews": 25,
    "image": "/images/products/fruit-tart.jpg",
    "stock": 25
  },
  {
    "_id": "13",
    "name": "Vanilla Cupcake",
    "price": 4,
    "category": "Pastry",
    "description": "Moist Madagascan vanilla cupcake with whipped buttercream swirl and edible pearl sprinkles.",
    "flavor": "Madagascar Vanilla",
    "ratings": 4.7,
    "numReviews": 12,
    "image": "/images/products/cupcake.jpg",
    "stock": 40
  },
  {
    "_id": "14",
    "name": "Chocolate Danish",
    "price": 5.9,
    "category": "Pastry",
    "description": "Crispy laminated layers folded around rich Belgian chocolate ganache filling.",
    "flavor": "Dark Chocolate",
    "ratings": 4.8,
    "numReviews": 15,
    "image": "/images/products/chocolate-danish.jpg",
    "stock": 30
  },
  {
    "_id": "15",
    "name": "Cream Puff",
    "price": 4.8,
    "category": "Pastry",
    "description": "Light choux pastry with a crunchy craquelin crust, bursting with diplomat vanilla bean cream.",
    "flavor": "Vanilla Custard",
    "ratings": 4.6,
    "numReviews": 11,
    "image": "/images/products/cream-puff.jpg",
    "stock": 35
  },
  {
    "_id": "16",
    "name": "Strawberry Danish",
    "price": 6.2,
    "category": "Pastry",
    "description": "Buttery layered pastry filled with vanilla custard and glazed ripe strawberries.",
    "flavor": "Strawberry Custard",
    "ratings": 4.8,
    "numReviews": 18,
    "image": "/images/products/strawberry-danish.jpg",
    "stock": 28
  },
  {
    "_id": "17",
    "name": "Chicken Mushroom Pie",
    "price": 7.5,
    "category": "Savory",
    "description": "Slow-cooked tender chicken breast and portobello mushrooms in a creamy thyme white sauce.",
    "flavor": "Chicken & Mushroom",
    "ratings": 4.8,
    "numReviews": 20,
    "image": "/images/products/chicken-mushroom-pie.jpg",
    "stock": 25
  },
  {
    "_id": "18",
    "name": "Spinach Mushroom Quiche",
    "price": 8.5,
    "category": "Savory",
    "description": "French savory tart filled with sauteed baby spinach, wild mushrooms, gruyere cheese and egg custard.",
    "flavor": "Spinach & Gruyere",
    "ratings": 4.9,
    "numReviews": 18,
    "image": "/images/products/spinach-quiche.jpg",
    "stock": 20
  },
  {
    "_id": "19",
    "name": "Ham & Cheese Croissant",
    "price": 6.5,
    "category": "Savory",
    "description": "Flaky butter croissant stuffed with smoked country ham and melted emmental cheese with bechamel.",
    "flavor": "Smoked Ham & Emmental",
    "ratings": 4.7,
    "numReviews": 14,
    "image": "/images/products/ham-cheese-croissant.jpg",
    "stock": 35
  },
  {
    "_id": "20",
    "name": "Classic Sausage Roll",
    "price": 6,
    "category": "Savory",
    "description": "Seasoned pork mince wrapped in crisp puff pastry with a hint of sage, apple and black pepper.",
    "flavor": "Pork & Herb",
    "ratings": 4.6,
    "numReviews": 12,
    "image": "/images/products/classic-sausage-roll.jpg",
    "stock": 30
  },
  {
    "_id": "21",
    "name": "Mini Savory Tart",
    "price": 7,
    "category": "Savory",
    "description": "Assorted bite-sized quiches with caramelized onion, goat cheese, and sundried tomato.",
    "flavor": "Caramelized Onion & Goat Cheese",
    "ratings": 4.7,
    "numReviews": 15,
    "image": "/images/products/mini-savory-tart.jpg",
    "stock": 25
  },
  {
    "_id": "22",
    "name": "Chicken Puff Pastry",
    "price": 6.8,
    "category": "Savory",
    "description": "Golden puff parcel filled with mild curry-spiced chicken, sweet onions and green peas.",
    "flavor": "Curry Spiced Chicken",
    "ratings": 4.8,
    "numReviews": 16,
    "image": "/images/products/chicken-puff-pastry.jpg",
    "stock": 28
  },
  {
    "_id": "23",
    "name": "Cheese Garlic Roll",
    "price": 5.5,
    "category": "Savory",
    "description": "Soft brioche roll filled with sweet cream cheese and drenched in roasted garlic herb butter.",
    "flavor": "Garlic Butter Cream Cheese",
    "ratings": 4.6,
    "numReviews": 10,
    "image": "/images/products/cheese-garlic-roll.jpg",
    "stock": 30
  },
  {
    "_id": "24",
    "name": "Bacon Egg Tart",
    "price": 7.8,
    "category": "Savory",
    "description": "Flaky puff pastry base topped with smoked bacon, fresh cage-free eggs and cheddar cheese.",
    "flavor": "Bacon & Cheddar",
    "ratings": 4.8,
    "numReviews": 13,
    "image": "/images/products/bacon-egg-tart.jpg",
    "stock": 22
  },
  {
    "_id": "25",
    "name": "Macaron Gift Box",
    "price": 24,
    "category": "Gift Box",
    "description": "Luxury box of 12 artisan French macarons in assorted flavors: pistachio, salted caramel, rose, chocolate, vanilla and raspberry.",
    "flavor": "Assorted 12 Flavors",
    "ratings": 4.9,
    "numReviews": 21,
    "image": "/images/products/macaron-box.jpg",
    "stock": 20
  },
  {
    "_id": "26",
    "name": "Cookie Gift Box",
    "price": 20,
    "category": "Gift Box",
    "description": "Handcrafted butter cookies and sablés assortment including matcha sablé, chocolate diamond and earl grey shortbread.",
    "flavor": "Butter Sablé & Chocolate",
    "ratings": 4.8,
    "numReviews": 17,
    "image": "/images/products/cookies.jpg",
    "stock": 25
  },
  {
    "_id": "27",
    "name": "Afternoon Tea Box",
    "price": 28,
    "category": "Gift Box",
    "description": "A delightful tea-time set with mini scones, fruit tarts, macarons, clotted cream and strawberry jam.",
    "flavor": "Tea Time Assortment",
    "ratings": 4.9,
    "numReviews": 19,
    "image": "/images/products/afternoon-tea-box.jpg",
    "stock": 18
  },
  {
    "_id": "28",
    "name": "Birthday Treat Box",
    "price": 30,
    "category": "Gift Box",
    "description": "Celebration box featuring 2 mini bento cakes, 4 decorated cupcakes, candles and a custom greeting card.",
    "flavor": "Celebration Set",
    "ratings": 4.8,
    "numReviews": 23,
    "image": "/images/products/birthday-treat-box.jpg",
    "stock": 15
  },
  {
    "_id": "29",
    "name": "Mixed Pastry Box",
    "price": 26,
    "category": "Gift Box",
    "description": "Morning baker's box featuring 6 of our best fresh pastries: croissants, pain au chocolat, cinnamon rolls and danishes.",
    "flavor": "Pastry Selection",
    "ratings": 4.7,
    "numReviews": 16,
    "image": "/images/products/mixed-pastry-box.jpg",
    "stock": 20
  },
  {
    "_id": "30",
    "name": "Mini Cake Gift Box",
    "price": 32,
    "category": "Gift Box",
    "description": "4 distinct miniature layer cakes: Chocolate Truffle, Strawberry Shortcake, Earl Grey Lavender and Mango Coconut.",
    "flavor": "4 Mini Flavors",
    "ratings": 4.9,
    "numReviews": 20,
    "image": "/images/products/mini-cake-gift-box.jpg",
    "stock": 16
  },
  {
    "_id": "31",
    "name": "Sweet Celebration Box",
    "price": 35,
    "category": "Gift Box",
    "description": "Grand assortment of artisanal chocolates, macarons, cake pops and meringue kisses in our signature Sugar Muse gift packaging.",
    "flavor": "Deluxe Assortment",
    "ratings": 4.9,
    "numReviews": 25,
    "image": "/images/products/sweet-celebration-box.jpg",
    "stock": 15
  },
  {
    "_id": "32",
    "name": "Sugar Muse Signature Box",
    "price": 38,
    "category": "Gift Box",
    "description": "Our crowning collection: the ultimate curation of Sugar Muse's most beloved artisan creations tied with a silk ribbon.",
    "flavor": "Chef's Signature Selection",
    "ratings": 5,
    "numReviews": 29,
    "image": "/images/products/sugar-muse-signature-box.jpg",
    "stock": 12
  }
];

const categories = [
  "All",
  "Cake",
  "Pastry",
  "Savory",
  "Gift Box",
];

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
        <ellipse
          cx="16"
          cy="12"
          rx="10"
          ry="4"
        />
        <path d="M6 12v9c0 3 4 5 10 5s10-2 10-5v-9" />
        <path d="M10 12c2 2 4 3 6 3s4-1 6-3" />
        <path d="M12 8c1-2 3-3 4-3" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <rect
        x="7"
        y="12"
        width="18"
        height="15"
        rx="1"
      />
      <path d="M5 9h22v6H5z" />
      <path d="M16 9v18" />
      <path d="M16 9c-4 0-7-1-7-4 0-2 2-3 4-2 2 1 3 4 3 6Z" />
      <path d="M16 9c4 0 7-1 7-4 0-2-2-3-4-2-2 1-3 4-3 6Z" />
    </svg>
  );
};

const ChevronDown = ({
  className = "",
}) => (
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

const ArrowIcon = ({
  direction = "right",
}) => (
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

const FloralSprig = ({
  className = "",
}) => (
  <svg
    className={className}
    viewBox="0 0 150 220"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M18 210C38 164 59 126 93 90C112 69 126 42 132 10"
      stroke="#84934e"
      strokeWidth="1.4"
    />

    <path
      d="M50 152C35 142 25 132 17 118"
      stroke="#84934e"
      strokeWidth="1.1"
    />

    <path
      d="M72 124C89 115 101 105 112 92"
      stroke="#84934e"
      strokeWidth="1.1"
    />

    <path
      d="M94 90C78 80 67 68 59 53"
      stroke="#84934e"
      strokeWidth="1.1"
    />

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
    ].map(
      ([cx, cy], index) => (
        <g key={index}>
          <circle
            cx={cx}
            cy={cy}
            r="5.5"
            fill="#f7cfc8"
          />

          <circle
            cx={cx + 5}
            cy={cy + 3}
            r="4"
            fill="#fce4df"
          />

          <circle
            cx={cx - 4}
            cy={cy + 4}
            r="3.6"
            fill="#fff3ef"
          />
        </g>
      )
    )}
  </svg>
);

const SCALLOPS = Array.from(
  {
    length: 30,
  },
  (_, index) => {
    const angle =
      (index / 30) *
      Math.PI *
      2;

    return [
      80 +
        Math.cos(angle) *
          70,
      80 +
        Math.sin(angle) *
          70,
    ];
  }
);

const HeroBadge = () => (
  <div className="hero-round-label">
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
    >
      <defs>
        <path
          id="badge-circle"
          d="M80,80 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"
        />
      </defs>

      <g className="badge-bg">
        <circle
          cx="80"
          cy="80"
          r="70"
        />

        {SCALLOPS.map(
          ([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r="8"
            />
          )
        )}
      </g>

      <text
        className="badge-circle-text"
        transform="rotate(-20 80 80)"
      >
        <textPath
          href="#badge-circle"
          startOffset="0"
        >
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
  const [liveProducts, setLiveProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("/api/v1/products?limit=all")
      .then(({ data }) => {
        if (
          isMounted &&
          data &&
          Array.isArray(data.products) &&
          data.products.length > 0
        ) {
          const mapped = data.products.map((p) => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            category: p.category,
            subcategory: p.subcategory || "",
            description: p.description || "",
            flavor: p.flavor || "",
            ratings: p.ratings || 5,
            numReviews: p.numReviews || 0,
            image:
              Array.isArray(p.image) && p.image.length > 0
                ? p.image[0].url
                : typeof p.image === "string"
                ? p.image
                : "/images/products/strawberry-cake.jpg",
            stock: p.stock || 20,
          }));
          setLiveProducts(mapped);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch products from MongoDB, using fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const selectedCategory =
    searchParams.get(
      "category"
    ) || "All";

  const searchFromUrl =
    searchParams.get(
      "search"
    ) || "";

  const [search, setSearch] =
    useState(
      searchFromUrl
    );

  const [sort, setSort] =
    useState("newest");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const productsPerPage = 4;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    setSearch(
      searchFromUrl
    );

    setCurrentPage(1);
  }, [searchFromUrl]);

  const handleCategoryChange = (
    category
  ) => {
    setCurrentPage(1);

    const nextParams =
      new URLSearchParams(
        searchParams
      );

    if (
      category === "All"
    ) {
      nextParams.delete(
        "category"
      );
    } else {
      nextParams.set(
        "category",
        category
      );
    }

    setSearchParams(
      nextParams
    );
  };

  const handleProductView = (
    event,
    product
  ) => {
    const clickedButton =
      event.target.closest(
        "button"
      );

    if (clickedButton) {
      return;
    }

    const clickedLink =
      event.target.closest(
        "a"
      );

    if (!clickedLink) {
      return;
    }

    const href =
      clickedLink.getAttribute(
        "href"
      ) || "";

    const productPath =
      `/product/${product._id}`;

    if (
      href === productPath ||
      href.startsWith(
        `${productPath}?`
      )
    ) {
      saverecenlyViewed(
        product
      );
    }
  };

  const filteredProducts =
    useMemo(() => {
      const source = liveProducts.length > 0 ? liveProducts : products;
      let result = [...source];

      if (
        selectedCategory !==
        "All"
      ) {
        result =
          result.filter(
            (product) =>
              product.category ===
              selectedCategory
          );
      }

      const keyword =
        search
          .trim()
          .toLowerCase();

      if (keyword) {
        result =
          result.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(
                  keyword
                )
          );
      }

      if (
        sort ===
        "price-low"
      ) {
        result.sort(
          (a, b) =>
            a.price -
            b.price
        );
      }

      if (
        sort ===
        "price-high"
      ) {
        result.sort(
          (a, b) =>
            b.price -
            a.price
        );
      }

      if (
        sort === "rating"
      ) {
        result.sort(
          (a, b) =>
            b.ratings -
            a.ratings
        );
      }

      if (
        sort === "name"
      ) {
        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      return result;
    }, [
      selectedCategory,
      search,
      sort,
    ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProducts.length /
          productsPerPage
      )
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const startIndex =
    (safeCurrentPage -
      1) *
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex +
        productsPerPage
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
              <span>
                FRESH FROM THE OVEN
              </span>

              <span className="eyebrow-line" />
            </div>

            <h1>
              Our Bakery Menu
            </h1>

            <p>
              Handcrafted cakes,
              pastries and savory
              treats
              <br />
              made fresh for every
              sweet moment.
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
                HERO_IMAGE_IS_WIDE
                  ? "hero-arch is-wide"
                  : "hero-arch"
              }
            >
              <img
                className="hero-arch-img"
                src={
                  HERO_IMAGE
                }
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
            {categories.map(
              (category) => (
                <button
                  key={
                    category
                  }
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
                  <CategoryIcon
                    category={
                      category
                    }
                  />

                  <span>
                    {
                      category
                    }
                  </span>
                </button>
              )
            )}
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
              value={
                search
              }
              onChange={(
                event
              ) => {
                setSearch(
                  event
                    .target
                    .value
                );

                setCurrentPage(
                  1
                );
              }}
            />
          </div>

          <div className="menu-sort-wrap">
            <select
              className="menu-sort"
              value={sort}
              aria-label="Sort products"
              onChange={(
                event
              ) => {
                setSort(
                  event
                    .target
                    .value
                );

                setCurrentPage(
                  1
                );
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

            <ChevronDown className="menu-sort-chevron" />
          </div>
        </div>
      </section>

      <section className="bakery-products-section">
        <div className="bakery-products-inner">
          {currentProducts.length >
          0 ? (
            <div className="boutique-product-grid">
              {currentProducts.map(
                (product) => (
                  <div
                    key={
                      product._id
                    }
                    style={{
                      display: "contents",
                    }}
                    onClickCapture={(
                      event
                    ) =>
                      handleProductView(
                        event,
                        product
                      )
                    }
                  >
                    <Product
                      product={
                        product
                      }
                    />
                  </div>
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
                Try another search
                or category.
              </p>
            </div>
          )}

          {totalPages >
            1 && (
            <div className="boutique-pagination">
              <button
                type="button"
                aria-label="Previous page"
                disabled={
                  safeCurrentPage ===
                  1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.max(
                        1,
                        page -
                          1
                      )
                  )
                }
              >
                <ArrowIcon direction="left" />
              </button>

              {Array.from(
                {
                  length:
                    totalPages,
                },
                (
                  _,
                  index
                ) =>
                  index +
                  1
              ).map(
                (page) => (
                  <button
                    key={
                      page
                    }
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
                    {
                      page
                    }
                  </button>
                )
              )}

              <button
                type="button"
                aria-label="Next page"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.min(
                        totalPages,
                        page +
                          1
                      )
                  )
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