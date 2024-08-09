import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartRequestView} from "../../modules/cart/models/CartRequestView";
import {CartResponseView} from "../../modules/cart/models/CartResponseView";
import {CartService} from "../../modules/cart/services/CartService";
import {AuthUtil} from "../../util/AuthUtil";

// createCartAction
export const createCartAction: any = createAsyncThunk('carts/createCartAction',
    async (cart: CartRequestView, {rejectWithValue}): Promise<{ msg: string, cart: CartResponseView } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) {
                let response = await CartService.createCart(cart);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// getCartInfoAction
export const getCartInfoAction: any = createAsyncThunk('carts/getCartInfoAction',
    async (payload: {}, {rejectWithValue}): Promise<CartResponseView | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) {
                let response = await CartService.getCartInfo();
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })