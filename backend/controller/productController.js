import mongoose from "mongoose";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import ApiFunctionality from "../utils/handleApiFunctionality.js";

import { v2 as cloudinary } from "cloudinary";

/* =========================================================
   HELPER - CONVERT IMAGE INPUT TO ARRAY
========================================================= */

const normalizeImages = (image) => {
    if (!image) {
        return [];
    }

    if (typeof image === "string") {
        return [image];
    }

    if (Array.isArray(image)) {
        return image;
    }

    return [];
};


/* =========================================================
   HELPER - UPLOAD IMAGES TO CLOUDINARY
========================================================= */

const uploadImages = async (images) => {
    const imageLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.uploader.upload(
            images[i],
            {
                folder: "sugar-muse/products"
            }
        );

        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }

    return imageLinks;
};


/* =========================================================
   HELPER - DELETE CLOUDINARY IMAGES
========================================================= */

const deleteCloudinaryImages = async (images = []) => {

    for (let i = 0; i < images.length; i++) {

        if (!images[i]?.public_id) {
            continue;
        }

        try {

            await cloudinary.uploader.destroy(
                images[i].public_id
            );

        } catch (error) {

            console.log(
                `Could not delete image ${images[i].public_id}:`,
                error.message
            );
        }
    }
};


/* =========================================================
   CREATE PRODUCT
   POST /api/v1/admin/product/new
========================================================= */

export const createProducts = handleAsyncError(
    async (req, res, next) => {

        const images = normalizeImages(
            req.body.image
        );

        if (images.length === 0) {

            return next(
                new ErrorHandler(
                    "Please upload at least one product image.",
                    400
                )
            );
        }

        /* Upload bakery images */

        const imageLinks =
            await uploadImages(images);

        req.body.image = imageLinks;

        /* Admin who created product */

        if (req.user) {
            req.body.user =
                req.user._id || req.user.id;
        }

        const product =
            await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    }
);

export const getAllProducts = handleAsyncError(
    async (req, res, next) => {


        let resultPerPage = 8;

        if (
            req.query.limit &&
            req.query.limit !== "undefined"
        ) {

            if (req.query.limit === "all") {

                resultPerPage = 1000;

            } else {

                resultPerPage =
                    Number(req.query.limit) || 8;
            }
        }

    
        const apiFeature =
            new ApiFunctionality(
                Product.find(),
                req.query
            )
                .search()
                .filter()
                .sort();



        const filteredProductsCount =
            await apiFeature.query
                .clone()
                .countDocuments();


        const productsCount =
            await Product.countDocuments();


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    filteredProductsCount /
                    resultPerPage
                )
            );

        const requestedPage =
            Number(req.query.page) || 1;

        if (requestedPage > totalPages) {

            req.query.page = 1;

            apiFeature.queryString.page = 1;
        }


        apiFeature.pagination(
            resultPerPage
        );


        
        const products =
            await apiFeature.query;


        res.status(200).json({
            success: true,

            products:
                products || [],

            productsCount,

            filteredProductsCount,

            resultPerPage,

            totalPages
        });
    }
);



export const getSingleProduct = handleAsyncError(
    async (req, res, next) => {
        let product;
        const paramId = req.params.id;

        if (mongoose.Types.ObjectId.isValid(paramId)) {
            product = await Product.findById(paramId);
        } else if (paramId && paramId.startsWith("collection-")) {
            const seasonalMap = {
                "collection-1": { name: "Strawberry Shortcake", price: 28, category: "Cake", flavor: "Strawberry Vanilla", image: "/images/products/strawberry-shortcake.jpg", description: "Soft vanilla sponge, fresh Hokkaido whipped cream and hand-picked strawberries." },
                "collection-2": { name: "Strawberry Roll", price: 22, category: "Pastry", flavor: "Strawberry Cream", image: "/images/products/strawberry-roll.jpg", description: "Light strawberry sponge wrapped around fresh whipped cream and berries." },
                "collection-3": { name: "Strawberry Tart", price: 18, category: "Pastry", flavor: "Strawberry Vanilla", image: "/images/products/strawberry-tart.jpg", description: "Buttery tart crust, rich vanilla bean pastry cream and glazed fresh strawberries." },
                "collection-4": { name: "Strawberry Macaron Box", price: 24, category: "Gift Box", flavor: "Strawberry White Chocolate", image: "/images/products/strawberry-macaron-box.jpg", description: "Delicate Parisian strawberry macarons made for gifting." },
                "collection-5": { name: "Strawberry Mini Cake", price: 20, category: "Cake", flavor: "Strawberry Chiffon", image: "/images/products/strawberry-mini-cake.jpg", description: "A petite celebration cake with fresh strawberry cream and edible flowers." },
            };
            const item = seasonalMap[paramId];
            if (item) {
                product = await Product.findOne({ name: new RegExp(item.name, "i") });
                if (!product) {
                    product = await Product.findOne({ name: new RegExp("Strawberry", "i") });
                }
                if (!product) {
                    product = {
                        _id: paramId,
                        name: item.name,
                        price: item.price,
                        category: item.category,
                        flavor: item.flavor,
                        stock: 25,
                        ratings: 5.0,
                        numReviews: 1,
                        reviews: [
                            {
                                name: "Sugar Muse Guest",
                                rating: 5,
                                comment: "One of the most exquisite strawberry bakes I have ever tasted! Perfectly balanced sweetness and fresh cream.",
                                createdAt: new Date()
                            }
                        ],
                        image: [{ public_id: paramId, url: item.image }],
                        description: item.description
                    };
                }
            }
        } else {
            // Support numeric index (e.g., /product/1 -> 1st product) or name match
            const numericIndex = parseInt(paramId, 10);
            if (!isNaN(numericIndex) && numericIndex > 0) {
                const all = await Product.find().limit(numericIndex);
                if (all.length >= numericIndex) {
                    product = all[numericIndex - 1];
                }
            }
            if (!product) {
                product = await Product.findOne({ name: new RegExp(paramId, "i") });
            }
        }

        if (!product) {
            return next(
                new ErrorHandler(
                    "Product Not Found!",
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            product
        });
    }
);


/* =========================================================
   UPDATE PRODUCT
   PUT /api/v1/admin/product/:id
========================================================= */

export const updateProducts = handleAsyncError(
    async (req, res, next) => {

        let product =
            await Product.findById(
                req.params.id
            );

        if (!product) {

            return next(
                new ErrorHandler(
                    "Product Not Found!",
                    404
                )
            );
        }


        /* =============================================
           USER UPLOADS NEW IMAGES
        ============================================= */

        if (req.body.image) {

            const newImages =
                normalizeImages(
                    req.body.image
                );


            if (
                newImages.length === 0
            ) {

                return next(
                    new ErrorHandler(
                        "Please upload at least one product image.",
                        400
                    )
                );
            }


            /*
                Upload new images FIRST.

                This is safer than deleting
                the old image first.
            */

            const newImageLinks =
                await uploadImages(
                    newImages
                );


            /*
                New images successfully uploaded.
                Now delete old Cloudinary images.
            */

            await deleteCloudinaryImages(
                product.image
            );


            req.body.image =
                newImageLinks;
        }


        /* =============================================
           UPDATE PRODUCT
        ============================================= */

        product =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    returnDocument: "after",
                    runValidators: true
                }
            );


        res.status(200).json({
            success: true,
            product
        });
    }
);


/* =========================================================
   DELETE PRODUCT
   DELETE /api/v1/admin/product/:id
========================================================= */

export const deleteProducts = handleAsyncError(
    async (req, res, next) => {

        /*
            Find first so images can be removed
            from Cloudinary.
        */

        const product =
            await Product.findById(
                req.params.id
            );


        if (!product) {

            return next(
                new ErrorHandler(
                    "Product Not Found!",
                    404
                )
            );
        }


        /*
            Remove Cloudinary images
        */

        await deleteCloudinaryImages(
            product.image
        );


        /*
            Remove MongoDB product
        */

        await Product.findByIdAndDelete(
            req.params.id
        );


        res.status(200).json({
            success: true,
            message:
                "Product Deleted Successfully!"
        });
    }
);


/* =========================================================
   ADMIN - GET ALL PRODUCTS
   GET /api/v1/admin/products
========================================================= */

export const getAdminProducts =
    handleAsyncError(
        async (req, res, next) => {

            const products =
                await Product.find()
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({
                success: true,
                products
            });
        }
    );


/* =========================================================
   CREATE / UPDATE PRODUCT REVIEW
========================================================= */

export const createReview =
    handleAsyncError(
        async (req, res, next) => {

            const {
                rating,
                comment
            } = req.body;


            if (!rating) {

                return next(
                    new ErrorHandler(
                        "Please provide a rating.",
                        400
                    )
                );
            }


            if (!comment) {

                return next(
                    new ErrorHandler(
                        "Please provide a review comment.",
                        400
                    )
                );
            }


            /*
                Never accept userId from client.

                User comes from authentication middleware.
            */

            const review = {
                user: req.user ? req.user._id : new mongoose.Types.ObjectId(),
                name: (req.user && (req.user.name || req.user.fullName)) || req.body.name || "Customer",
                rating: Number(rating),
                comment: String(comment).trim()
            };

            const productId = req.params.id || req.body.productId;
            let product;
            if (mongoose.Types.ObjectId.isValid(productId)) {
                product = await Product.findById(productId);
            } else {
                const numericIndex = parseInt(productId, 10);
                if (!isNaN(numericIndex) && numericIndex > 0) {
                    const all = await Product.find().limit(numericIndex);
                    if (all.length >= numericIndex) {
                        product = all[numericIndex - 1];
                    }
                }
                if (!product) {
                    product = await Product.findOne({ name: new RegExp(productId, "i") });
                }
            }

            if (!product) {
                return next(
                    new ErrorHandler(
                        "Product not found.",
                        404
                    )
                );
            }

            const reviewExists = req.user
                ? product.reviews.find(
                    (item) =>
                        item.user &&
                        item.user.toString() === req.user._id.toString()
                )
                : false;


            if (reviewExists) {

                /*
                    Update old review
                */

                product.reviews.forEach(
                    (item) => {

                        if (
                            item.user &&
                            req.user &&
                            item.user.toString() ===
                            req.user._id.toString()
                        ) {

                            item.rating =
                                Number(rating);

                            item.comment =
                                String(comment).trim();
                        }
                    }
                );

            } else {

                /*
                    Create new review
                */

                product.reviews.push(
                    review
                );
            }


            /*
                Number of reviews
            */

            product.numReviews =
                product.reviews.length;


            /*
                Recalculate average rating
            */

            let sum = 0;

            product.reviews.forEach(
                (item) => {

                    sum += item.rating;
                }
            );


            product.ratings =
                product.reviews.length > 0
                    ? sum /
                      product.reviews.length
                    : 0;


            await product.save({
                validateBeforeSave: false
            });


            res.status(200).json({
                success: true,
                product
            });
        }
    );


/* =========================================================
   DELETE REVIEW
========================================================= */

export const deleteReview =
    handleAsyncError(
        async (req, res, next) => {

            /*
                Example:

                ?productId=xxx&id=reviewId
            */

            const product =
                await Product.findById(
                    req.query.productId
                );


            if (!product) {

                return next(
                    new ErrorHandler(
                        "Product not found.",
                        404
                    )
                );
            }


            /*
                Remove selected review
            */

            const reviews =
                product.reviews.filter(
                    (review) =>
                        review._id.toString() !==
                        req.query.id.toString()
                );


            /*
                Calculate new rating
            */

            let sum = 0;

            reviews.forEach(
                (review) => {

                    sum += review.rating;
                }
            );


            const ratings =
                reviews.length > 0
                    ? sum /
                      reviews.length
                    : 0;


            const numReviews =
                reviews.length;


            /*
                Update product
            */

            await Product.findByIdAndUpdate(
                req.query.productId,
                {
                    reviews,
                    ratings,
                    numReviews
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            );


            res.status(200).json({
                success: true,
                message:
                    "Review Deleted Successfully!"
            });
        }
    );


/* =========================================================
   GET PRODUCT REVIEWS
========================================================= */

export const getProductReview =
    handleAsyncError(
        async (req, res, next) => {

            const product =
                await Product.findById(
                    req.query.id
                );


            if (!product) {

                return next(
                    new ErrorHandler(
                        "Product not found.",
                        404
                    )
                );
            }


            res.status(200).json({
                success: true,
                reviews:
                    product.reviews || []
            });
        }
    );