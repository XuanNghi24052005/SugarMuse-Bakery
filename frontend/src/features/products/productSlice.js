import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'

import axios from '../../utils/axiosInstance'

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (
        {
            keyword = '',
            page = 1,
            category,
            subcategory,
            sort,
            limit
        },
        {
            rejectWithValue
        }
    ) => {
        try {
            let link =
                '/api/v1/products?page=' +
                page

            if (limit) {
                link +=
                    `&limit=${limit}`
            }

            if (
                category &&
                category !== 'All'
            ) {
                link +=
                    `&category=${encodeURIComponent(
                        category
                    )}`
            }

            if (
                subcategory &&
                subcategory !== 'All'
            ) {
                link +=
                    `&subcategory=${encodeURIComponent(
                        subcategory
                    )}`
            }

            if (keyword) {
                link +=
                    `&keyword=${encodeURIComponent(
                        keyword
                    )}`
            }

            if (
                sort &&
                sort !== 'default'
            ) {
                link +=
                    `&sort=${sort}`
            }

            const {
                data
            } = await axios.get(
                link
            )

            return data
        } catch (error) {
            console.error(
                'GET PRODUCTS ERROR:',
                error
            )

            return rejectWithValue(
                error.response
                    ?.data
                    ?.message ||
                error.message ||
                'Unable to load products'
            )
        }
    }
)

export const getProductDetails =
    createAsyncThunk(
        'product/getProductDetails',
        async (
            id,
            {
                rejectWithValue
            }
        ) => {
            try {
                const link =
                    `/api/v1/product/${id}`

                const {
                    data
                } = await axios.get(
                    link
                )

                return data
            } catch (error) {
                console.error(
                    'GET PRODUCT DETAILS ERROR:',
                    error
                )

                return rejectWithValue(
                    error.response
                        ?.data
                        ?.message ||
                    error.message ||
                    'Unable to load product'
                )
            }
        }
    )

export const createReview =
    createAsyncThunk(
        'product/createReview',
        async (
            {
                productId,
                rating,
                comment,
                name
            },
            {
                rejectWithValue
            }
        ) => {
            try {
                const config = {
                    headers: {
                        'Content-Type':
                            'application/json'
                    },
                    withCredentials: true
                }

                const {
                    data
                } = await axios.put(
                    `/api/v1/product/review/${productId}`,
                    {
                        rating,
                        comment,
                        productId,
                        name
                    },
                    config
                )

                return data
            } catch (error) {
                console.error(
                    'CREATE REVIEW ERROR:',
                    error
                )

                return rejectWithValue(
                    error.response
                        ?.data
                        ?.message ||
                    error.message ||
                    'Failed to submit review'
                )
            }
        }
    )

const productSlice =
    createSlice({
        name: 'product',

        initialState: {
            products: [],
            productCount: 0,

            loading: false,
            error: null,

            product: null,

            resultsPerPage: 4,
            totalPages: 1,

            filteredProductsCount: 0,

            reviewSuccess: false,
            reviewError: null,
            reviewLoading: false
        },

        reducers: {
            removeErrors: (
                state
            ) => {
                state.error =
                    null
            },

            removeReviewSuccess: (
                state
            ) => {
                state.reviewSuccess =
                    false
            },

            removeReviewError: (
                state
            ) => {
                state.reviewError =
                    null
            }
        },

        extraReducers: (
            builder
        ) => {
            builder

                .addCase(
                    getProduct.pending,
                    (
                        state
                    ) => {
                        state.loading =
                            true

                        state.error =
                            null
                    }
                )

                .addCase(
                    getProduct.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        console.log(
                            'GET PRODUCTS SUCCESS:',
                            action.payload
                        )

                        state.loading =
                            false

                        state.error =
                            null

                        state.products =
                            action
                                .payload
                                ?.products ||
                            []

                        state.productCount =
                            action
                                .payload
                                ?.productsCount ||
                            0

                        state.resultsPerPage =
                            action
                                .payload
                                ?.resultPerPage ||
                            action
                                .payload
                                ?.resultsPerPage ||
                            4

                        state.totalPages =
                            action
                                .payload
                                ?.totalPages ||
                            1

                        state.filteredProductsCount =
                            action
                                .payload
                                ?.filteredProductsCount ||
                            0
                    }
                )

                .addCase(
                    getProduct.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false

                        state.error =
                            action.payload ||
                            'Something went wrong.'

                        state.products =
                            []
                    }
                )

            builder

                .addCase(
                    getProductDetails.pending,
                    (
                        state
                    ) => {
                        state.loading =
                            true

                        state.error =
                            null

                        state.product =
                            null
                    }
                )

                .addCase(
                    getProductDetails.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        console.log(
                            'GET PRODUCT DETAILS SUCCESS:',
                            action.payload
                        )

                        state.loading =
                            false

                        state.error =
                            null

                        state.product =
                            action
                                .payload
                                ?.product ||
                            null
                    }
                )

                .addCase(
                    getProductDetails.rejected,
                    (
                        state,
                        action
                    ) => {
                        console.error(
                            'GET PRODUCT DETAILS REJECTED:',
                            action.payload
                        )

                        state.loading =
                            false

                        state.product =
                            null

                        state.error =
                            action.payload ||
                            'Something went wrong.'
                    }
                )

            builder

                .addCase(
                    createReview.pending,
                    (
                        state
                    ) => {
                        state.reviewLoading =
                            true

                        state.reviewError =
                            null

                        state.reviewSuccess =
                            false
                    }
                )

                .addCase(
                    createReview.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.reviewLoading =
                            false

                        state.reviewError =
                            null

                        state.reviewSuccess =
                            true

                        if (
                            action
                                .payload
                                ?.product
                        ) {
                            state.product =
                                action
                                    .payload
                                    .product
                        }
                    }
                )

                .addCase(
                    createReview.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.reviewLoading =
                            false

                        state.reviewError =
                            action.payload ||
                            'Failed to submit review'

                        state.reviewSuccess =
                            false
                    }
                )
        }
    })

export const {
    removeErrors,
    removeReviewSuccess,
    removeReviewError
} = productSlice.actions

export default productSlice.reducer