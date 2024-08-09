import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import * as productActions from "./product.actions";
import {ToastUtil} from "../../util/ToastUtil";

export const productFeatureKey = "productFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    products: ProductResponseView[];
    product: ProductResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    products: [] as ProductResponseView[],
    product: {} as ProductResponseView
};

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // createProductAction
        builder.addCase(productActions.createProductAction.pending, (state) => {
            state.loading = true;
        }).addCase(productActions.createProductAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(productActions.createProductAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(action.payload.msg);
            }
        })

        // updateProductAction
        builder.addCase(productActions.updateProductAction.pending, (state) => {
            state.loading = true;
        }).addCase(productActions.updateProductAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(productActions.updateProductAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(action.payload.msg);
            }
        })

        // getAllProductsAction
        builder.addCase(productActions.getAllProductsAction.pending, (state) => {
            state.loading = true;
        }).addCase(productActions.getAllProductsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }).addCase(productActions.getAllProductsAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(action.payload.msg);
            }
        })

        // getProductAction
        builder.addCase(productActions.getProductAction.pending, (state) => {
            state.loading = true;
        }).addCase(productActions.getProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        }).addCase(productActions.getProductAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(action.payload.msg);
            }
        })

        // deleteProductAction
        builder.addCase(productActions.deleteProductAction.pending, (state) => {
            state.loading = true;
        }).addCase(productActions.deleteProductAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displayInfoToast(action.payload.msg);
        }).addCase(productActions.deleteProductAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(action.payload.msg);
            }
        })

        // getAllProductsWithCategoryIdAction
        builder.addCase(productActions.getAllProductsWithCategoryIdAction.pending, (state) => {
            state.loading = true;
        }).addCase(productActions.getAllProductsWithCategoryIdAction.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }).addCase(productActions.getAllProductsWithCategoryIdAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(action.payload.msg);
            }
        })
    }
});


















