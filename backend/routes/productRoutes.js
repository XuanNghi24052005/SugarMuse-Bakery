import express from "express";

import {
  createProducts,
  createReview,
  deleteProducts,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getProductReview,
  getSingleProduct,
  updateProducts,
} from "../controller/productController.js";

import {
  roleBasedAuth,
  verifyUserAuth,
  optionalUserAuth,
} from "../middleware/verifyUserAuth.js";

const router = express.Router();

/* =========================================================
   PUBLIC PRODUCT ROUTES
========================================================= */

/*
  Get bakery products

  Examples:

  GET /api/v1/products
  GET /api/v1/products?category=Cake
  GET /api/v1/products?category=Pastry
  GET /api/v1/products?keyword=strawberry
  GET /api/v1/products?limit=all
*/
router
  .route("/products")
  .get(getAllProducts);


/*
  Get one product by MongoDB ID

  GET /api/v1/product/:id
*/
router
  .route("/product/:id")
  .get(getSingleProduct);


/* =========================================================
   PRODUCT REVIEW
========================================================= */

/*
  Create or update review

  PUT /api/v1/product/review/:id

  :id = product id
*/
router
  .route("/product/review/:id")
  .put(
    optionalUserAuth,
    createReview
  );


/* =========================================================
   ADMIN PRODUCT ROUTES
========================================================= */

/*
  Admin - Get all products

  GET /api/v1/admin/products
*/
router
  .route("/admin/products")
  .get(
    verifyUserAuth,
    roleBasedAuth("admin"),
    getAdminProducts
  );


/*
  Admin - Create bakery product

  POST /api/v1/admin/product/create
*/
router
  .route("/admin/product/create")
  .post(
    verifyUserAuth,
    roleBasedAuth("admin"),
    createProducts
  );


/*
  Admin - Update/Delete product

  PUT    /api/v1/admin/product/:id
  DELETE /api/v1/admin/product/:id
*/
router
  .route("/admin/product/:id")
  .put(
    verifyUserAuth,
    roleBasedAuth("admin"),
    updateProducts
  )
  .delete(
    verifyUserAuth,
    roleBasedAuth("admin"),
    deleteProducts
  );


/* =========================================================
   ADMIN REVIEW MANAGEMENT
========================================================= */

/*
  GET:
  /api/v1/admin/product/reviews?id=PRODUCT_ID

  DELETE:
  /api/v1/admin/product/reviews
      ?productId=PRODUCT_ID
      &id=REVIEW_ID
*/
router
  .route("/admin/product/reviews")
  .get(
    verifyUserAuth,
    roleBasedAuth("admin"),
    getProductReview
  )
  .delete(
    verifyUserAuth,
    roleBasedAuth("admin"),
    deleteReview
  );


export default router;