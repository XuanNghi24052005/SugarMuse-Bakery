import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminProducts,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";
import { showToast } from "../utils/showToast";
import "../AdminStyles/CreateProduct.css";

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const CreateProduct = () => {
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Cake");
  const [subcategory, setSubcategory] = useState("");
  const [flavor, setFlavor] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = ["Cake", "Pastry", "Savory", "Combo"];
  const subcategoriesMap = {
    cake: ["Birthday Cake", "Wedding Cake", "Cheesecake", "Layer Cake", "Cupcake", "Tiramisu"],
    pastry: ["Macaron", "Eclair", "Cream Puff", "Mille-feuille", "Fruit Tart", "Danish"],
    savory: ["Croissant", "Sourdough", "Cheese Roll", "Focaccia", "Baguette", "Sandwich"],
    combo: ["Gift Box", "Party Set", "Afternoon Tea Box", "Mini Assortment", "Seasonal Box"]
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    setSubcategory("");
  };

  const createProductSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast.error("Please enter cake name.");
      return;
    }
    if (Number(price) <= 0) {
      showToast.error("Price must be greater than $0.");
      return;
    }
    if (Number(stock) < 0) {
      showToast.error("Stock cannot be negative.");
      return;
    }
    if (image.length === 0) {
      showToast.error("Please select at least one cake image.");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", Number(price).toFixed(2));
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("subcategory", subcategory);
    myForm.set("flavor", flavor);
    myForm.set("stock", stock);
    image.forEach((img) => {
      myForm.append("image", img);
    });

    dispatch(createAdminProducts(myForm));
  };

  const createProductImagePreview = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImageAt = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setImage((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (error) {
      showToast.error(typeof error === "string" ? error : error?.message || "Failed to create product");
      dispatch(removeErrors());
    }
    if (success) {
      showToast.success("Cake has been added to Sugar Muse Bakery successfully!");
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="bakery-create-product-page">
      <div className="bakery-form-card">
        <div className="bakery-form-header">
          <div>
            <span className="bakery-form-eyebrow">CATALOG MANAGEMENT</span>
            <h2 className="bakery-form-title">Add New Bakery Item</h2>
            <p className="bakery-form-subtitle">
              Fill in the details below to add handcrafted cakes, pastries, or gift boxes to your online storefront.
            </p>
          </div>
          <Link to="/admin/products" className="bakery-back-btn">
            Cancel & Return
          </Link>
        </div>

        <form
          className="bakery-product-form"
          encType="multipart/form-data"
          onSubmit={createProductSubmit}
        >
          {/* Row 1: Name and Category */}
          <div className="bakery-form-row">
            <div className="bakery-form-group flex-2">
              <label>Product Name *</label>
              <input
                type="text"
                className="bakery-input"
                placeholder="e.g. Belgian Dark Chocolate Ganache Cake"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="bakery-form-group flex-1">
              <label>Category *</label>
              <select
                className="bakery-select"
                required
                value={category}
                onChange={handleCategoryChange}
              >
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Subcategory and Flavor */}
          <div className="bakery-form-row">
            <div className="bakery-form-group flex-1">
              <label>Subcategory</label>
              <select
                className="bakery-select"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value="">Choose Subcategory (Optional)</option>
                {category &&
                  subcategoriesMap[category.toLowerCase()]?.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>

            <div className="bakery-form-group flex-1">
              <label>Flavor / Notes</label>
              <input
                type="text"
                className="bakery-input"
                placeholder="e.g. Strawberry Vanilla, Salted Caramel"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Price and Stock */}
          <div className="bakery-form-row">
            <div className="bakery-form-group flex-1">
              <label>Price (USD $) *</label>
              <div className="bakery-input-prefix-wrap">
                <span>$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  className="bakery-input prefixed"
                  placeholder="28.00"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="bakery-form-group flex-1">
              <label>Stock Count *</label>
              <input
                type="number"
                min="0"
                className="bakery-input"
                placeholder="20"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="bakery-form-group">
            <label>Cake Description & Artisan Story</label>
            <textarea
              rows="4"
              className="bakery-textarea"
              placeholder="Describe the layers, cream, textures, and artisanal ingredients that make this creation special..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Row 5: Image Upload Area */}
          <div className="bakery-form-group">
            <label>Product Images *</label>
            <div className="bakery-dropzone">
              <UploadIcon />
              <p className="dropzone-text">
                Click or drag images to upload for this cake
              </p>
              <span className="dropzone-hint">
                Supports JPG, PNG, WEBP (Recommended: 800x800px square photo)
              </span>
              <input
                type="file"
                accept="image/*"
                className="dropzone-file-input"
                multiple
                onChange={createProductImagePreview}
              />
            </div>

            {imagePreview.length > 0 && (
              <div className="bakery-previews-grid">
                {imagePreview.map((img, index) => (
                  <div className="bakery-preview-card" key={index}>
                    <img src={img} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="bakery-preview-delete"
                      onClick={() => removeImageAt(index)}
                      title="Remove image"
                    >
                      <TrashIcon />
                    </button>
                    {index === 0 && <span className="primary-tag">Cover</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bakery-form-actions">
            <button
              type="button"
              className="bakery-cancel-button"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bakery-submit-button"
              disabled={loading}
            >
              {loading ? "Adding to Bakery..." : "Save & Publish Cake"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
