import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {CategoryView} from "../../modules/categories/models/CategoryView";
import * as categoryActions from "./category.actions";
import {ToastUtil} from "../../util/ToastUtil";

export const categoryFeatureKey = "categoryFeature";

export interface InitialState {
    loading: boolean;
    error: SerializedError;
    categories: CategoryView[];
    category: CategoryView
}

const initialState: InitialState = {
    loading: false,
    error: {} as SerializedError,
    categories: [] as CategoryView[],
    category: {} as CategoryView
};

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // create Sub Category
        builder.addCase(categoryActions.createSubCategoryAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(categoryActions.createSubCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(categoryActions.createSubCategoryAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Sub Category creation Failed!`);
            }
        })

            // get all Categories
            .addCase(categoryActions.getAllCategoriesAction.pending, (state, action) => {
                state.loading = true;
            }).addCase(categoryActions.getAllCategoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        }).addCase(categoryActions.getAllCategoriesAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to get all categories`);
            }
        })
    }
});

















