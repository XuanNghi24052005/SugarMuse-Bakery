      import mongoose from "mongoose";

      /* =========================================================
        REVIEW SCHEMA
      ========================================================= */

      const reviewSchema = new mongoose.Schema(
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },

          name: {
            type: String,
            required: true,
            trim: true,
          },

          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
          },

          comment: {
            type: String,
            required: true,
            trim: true,
          },
        },
        {
          timestamps: true,
        }
      );

      /* =========================================================
        PRODUCT SCHEMA
      ========================================================= */

      const productSchema = new mongoose.Schema(
        {
          /* =========================
            BASIC INFORMATION
          ========================= */

          name: {
            type: String,
            trim: true,
            required: [
              true,
              "Please enter Product name",
            ],
          },

          slug: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            sparse: true,
            index: true,
          },

          description: {
            type: String,
            trim: true,
            required: [
              true,
              "Please enter Product description",
            ],
          },

          /* =========================
            PRICE
          ========================= */

          price: {
            type: Number,
            required: [
              true,
              "Please enter Product price",
            ],
            min: [
              0,
              "Price cannot be negative",
            ],
            max: [
              9999999,
              "Price cannot exceed 7 digits",
            ],
          },

          /* =========================
            CATEGORY
          ========================= */

          category: {
            type: String,
            trim: true,
            required: [
              true,
              "Please Enter Product Category",
            ],

            enum: {
              values: [
                "Cake",
                "Pastry",
                "Savory",
                "Gift Box",
                "Combo",
              ],

              message:
                "Category must be one of: Cake, Pastry, Savory, Gift Box, Combo",
            },
          },

          subcategory: {
            type: String,
            trim: true,
            default: "",
          },

          /* =========================
            BAKERY INFORMATION
          ========================= */

          flavor: {
            type: String,
            trim: true,
            default: "",
          },

          ingredients: {
            type: [String],
            default: [],
          },

          allergens: {
            type: [String],
            default: [],
          },

          sizeOptions: {
            type: [String],
            default: [],
          },

          featured: {
            type: Boolean,
            default: false,
          },

          customizable: {
            type: Boolean,
            default: false,
          },

          preparationTime: {
            type: String,
            trim: true,
            default: "",
          },

          /* =========================
            STOCK
          ========================= */

          stock: {
            type: Number,
            required: [
              true,
              "Please Enter Product Stock",
            ],

            min: [
              0,
              "Stock cannot be negative",
            ],

            max: [
              99999,
              "Stock cannot exceed 5 digits",
            ],

            default: 1,
          },

          /* =========================
            PRODUCT IMAGES
          ========================= */

          image: [
            {
              public_id: {
                type: String,
                required: true,
              },

              url: {
                type: String,
                required: true,
              },
            },
          ],

          /* =========================
            RATINGS
          ========================= */

          ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
          },

          numReviews: {
            type: Number,
            default: 0,
          },

          reviews: {
            type: [reviewSchema],
            default: [],
          },

          /* =========================
            ADMIN / CREATOR
          ========================= */

          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
        },

        {
          timestamps: true,
        }
      );

      /* =========================================================
        CREATE PRODUCT SLUG
      ========================================================= */

      /*
        Example:

        Strawberry Cream Cake
                  ↓
        strawberry-cream-cake
      */

      productSchema.pre(
        "validate",
        function () {
          if (!this.slug && this.name) {
            this.slug = this.name
              .normalize("NFD")
              .replace(
                /[\u0300-\u036f]/g,
                ""
              )
              .toLowerCase()
              .trim()
              .replace(
                /[^a-z0-9]+/g,
                "-"
              )
              .replace(
                /^-+|-+$/g,
                ""
              );
          }
        }
      );

      export default mongoose.model(
        "Product",
        productSchema
      );