import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductRequestView} from "../../modules/products/models/ProductRequestView";
import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import {ProductService} from "../../modules/products/services/ProductService";
import {AuthUtil} from "../../util/AuthUtil";

// PRIVATE
export const createProductAction: any = createAsyncThunk('products/createProductAction',
    async (product: ProductRequestView, {rejectWithValue}): Promise<{ msg: string; product: ProductResponseView } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                let response = await ProductService.createProduct(product);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// PRIVATE
export const updateProductAction: any = createAsyncThunk('products/updateProductAction',
    async (payload: { product: ProductRequestView, productId: string }, {rejectWithValue}): Promise<{ msg: string; product: ProductResponseView } | any> => {
        try {
            let {product, productId} = payload;
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                let response = await ProductService.updateProduct(product, productId);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// PRIVATE
export const getAllProductsAction: any = createAsyncThunk('products/getAllProductsAction',
    async (payload: any, {rejectWithValue}): Promise<ProductResponseView[] | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                let response = await ProductService.getAllProducts();
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// PRIVATE
export const getProductAction: any = createAsyncThunk('products/getProductAction',
    async (payload: { productId: string }, {rejectWithValue}): Promise<ProductResponseView | any> => {
        try {
            const {productId} = payload;
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                let response = await ProductService.getProduct(productId);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// PRIVATE
export const deleteProductAction: any = createAsyncThunk('products/deleteProductAction',
    async (payload: { productId: string }, {rejectWithValue}): Promise<{ msg: string } | any> => {
        try {
            const {productId} = payload;
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                let response = await ProductService.deleteProduct(productId);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// PRIVATE
export const getAllProductsWithCategoryIdAction: any = createAsyncThunk('products/getAllProductsWithCategoryIdAction',
    async (payload: { categoryId: string }, {rejectWithValue}): Promise<ProductResponseView[] | any> => {
        try {
            const {categoryId} = payload;
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                let response = await ProductService.getAllProductsWithCategoryId(categoryId);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })
