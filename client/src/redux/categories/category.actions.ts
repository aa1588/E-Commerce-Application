import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryView, SubCategoryView} from "../../modules/categories/models/CategoryView";
import {CategoryService} from "../../modules/categories/services/CategoryService";
import {AuthUtil} from "../../util/AuthUtil";

/**
 * PRIVATE
 */
export const createSubCategoryAction: any = createAsyncThunk('users/createSubCategoryAction',
    async (payload: { sub: SubCategoryView, categoryId: string }, {rejectWithValue}): Promise<{ msg: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                const {sub, categoryId} = payload;
                let response = await CategoryService.createSubCategory(sub, categoryId);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

/**
 * PRIVATE
 */
export const getAllCategoriesAction: any = createAsyncThunk('users/getAllCategoriesAction',
    async (payload, {rejectWithValue}): Promise<CategoryView[] | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
                let response = await CategoryService.getAllCategories();
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })