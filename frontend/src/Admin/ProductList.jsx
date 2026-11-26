import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
  removeErrors,
} from "../features/admin/adminSlice";
import { showToast } from "../utils/showToast";
import Loader from "../components/Loader";
import "../AdminStyles/ProductsList.css";

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, color: "#8c6e67" }}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const ProductList = () => {
  const { products = [], loading, error, deleting = {} } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // Sync search term with URL query
  useEffect(() => {
    setSearchTerm(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    if (error) {
      showToast.error(typeof error === "string" ? error : error?.message || "Error loading products");
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this bakery item?");
    if (isConfirmed) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then(() => {
          showToast.success("Product deleted successfully");
        })
        .catch((err) => {
          showToast.error(err?.message || "Failed to delete product");
        });
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  // Filter products by name, category, subcategory, flavor, or ID
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;

    return products.filter((p) => {
      const nameMatch = p.name?.toLowerCase().includes(term);
      const catMatch = p.category?.toLowerCase().includes(term);
      const subMatch = p.subcategory?.toLowerCase().includes(term);
      const flavorMatch = p.flavor?.toLowerCase().includes(term);
      const idMatch = p._id?.toLowerCase().includes(term);
      return nameMatch || catMatch || subMatch || flavorMatch || idMatch;
    });
  }, [products, searchTerm]);

  return (
    <div className="bakery-product-list-page">
      {/* Page Header */}
      <div className="bakery-list-header">
        <div>
          <span className="bakery-list-eyebrow">CATALOG</span>
          <h2 className="bakery-list-title">All Bakery Products</h2>
          <p className="bakery-list-subtitle">
            Manage your store menu, pricing, stock levels, and handcrafted creations.
          </p>
        </div>
        <Link to="/admin/product/create" className="bakery-add-btn">
          <PlusIcon /> Add New Cake
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Loader />
        </div>
      ) : products.length === 0 ? (
        <div className="bakery-empty-card">
          <div className="bakery-empty-icon">🍰</div>
          <h3>Your Bakery Catalog is Clean & Empty</h3>
          <p>
            No bakery items in database right now. Click the button below to add your first real handcrafted cake!
          </p>
          <Link to="/admin/product/create" className="bakery-add-btn">
            <PlusIcon /> Add Your First Cake
          </Link>
        </div>
      ) : (
        <>
          {/* Toolbar: In-page filter & product count stats */}
          <div className="bakery-toolbar">
            <div className="bakery-search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Filter by name, category, ID..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="bakery-search-clear"
                  onClick={handleClearSearch}
                  title="Clear search filter"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="bakery-toolbar-stats">
              <span>
                Total: <strong>{products.length}</strong> cakes
              </span>
              {searchTerm && (
                <span>
                  {" "}
                  | Matching: <strong>{filteredProducts.length}</strong>
                </span>
              )}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bakery-empty-card">
              <div className="bakery-empty-icon">🔍</div>
              <h3>No Bakery Products Found</h3>
              <p>
                No cakes or pastries matched your search query "
                <strong>{searchTerm}</strong>".
              </p>
              <button
                type="button"
                className="bakery-add-btn"
                onClick={handleClearSearch}
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="bakery-table-card">
              <table className="bakery-data-table">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>No</th>
                    <th style={{ width: "90px" }}>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => {
                    const imgUrl =
                      product.image?.[0]?.url ||
                      product.images?.[0]?.url ||
                      "/images/sugar-muse-favicon.svg";

                    return (
                      <tr key={product._id}>
                        <td>
                          <span className="index-pill">{index + 1}</span>
                        </td>
                        <td>
                          <img
                            src={imgUrl}
                            alt={product.name}
                            className="bakery-table-thumb"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/sugar-muse-favicon.svg";
                            }}
                          />
                        </td>
                        <td>
                          <div className="product-name-cell">
                            <strong>{product.name}</strong>
                            {product.subcategory && (
                              <small>{product.subcategory}</small>
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`category-tag ${(
                              product.category || ""
                            ).toLowerCase()}`}
                          >
                            {product.category || "Bakery"}
                          </span>
                        </td>
                        <td>
                          <strong className="price-tag">
                            ${Number(product.price || 0).toFixed(2)}
                          </strong>
                        </td>
                        <td>
                          <span
                            className={`stock-pill ${
                              product.stock > 0 ? "in-stock" : "out-of-stock"
                            }`}
                          >
                            {product.stock > 0
                              ? `${product.stock} available`
                              : "Out of Stock"}
                          </span>
                        </td>
                        <td>
                          <span className="rating-pill">
                            ⭐ {Number(product.ratings || 5).toFixed(1)}
                            <small>({product.numReviews || 0})</small>
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="actions-wrap">
                            <Link
                              to={`/admin/product/${product._id}`}
                              className="action-btn edit"
                              title="Edit Cake"
                            >
                              <EditIcon />
                            </Link>
                            <button
                              type="button"
                              className="action-btn delete"
                              disabled={deleting[product._id]}
                              onClick={() => handleDelete(product._id)}
                              title="Delete Cake"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
