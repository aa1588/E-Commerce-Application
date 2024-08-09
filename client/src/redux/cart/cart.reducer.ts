import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {ToastUtil} from "../../util/ToastUtil";
import * as cartActions from './cart.actions';
import {Cart, CartResponseView} from "../../modules/cart/models/CartResponseView";
import * as userActions from "../users/user.actions";

export const cartFeatureKey = "cartFeature";

export interface InitialState {
    loading: boolean;
    error: SerializedError;
    products: ProductResponseView[];
    total: string;
    tax: string;
    grandTotal: string;
    cart: Cart;
}

const initialState: InitialState = {
    cart: {} as Cart,
    loading: false,
    error: {} as SerializedError,
    products: [] as ProductResponseView[],
    total: "",
    tax: "",
    grandTotal: ""
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialState,
    reducers: {
        clearCart: (state, action) => {
            state.products = [];
        },
        addToCart: (state, action) => {
            const {product} = action.payload;
            // check if the product is exists
            let isExists = state.products.find(item => item._id === product._id);
            if (isExists) {
                ToastUtil.displayInfoToast("Item is already in the cart");
                return;
            }
            ToastUtil.displaySuccessToast("Item is added to cart");
            state.products = [...state.products, product]
        },
        incrementCartProductCount: (state, action) => {
            const {productId} = action.payload;
            state.products = state.products.map(item => {
                if (item._id === productId) {
                    return {
                        ...item,
                        count: item.count + 1
                    }
                }
                return item
            })
        },
        decrementCartProductCount: (state, action) => {
            const {productId} = action.payload;
            state.products = state.products.map(item => {
                if (item._id === productId) {
                    return {
                        ...item,
                        count: item.count - 1 > 0 ? item.count - 1 : 1
                    }
                }
                return item
            })
        },
        deleteProductFromCart: (state, action) => {
            const {productId} = action.payload;
            state.products = state.products.filter(item => item._id !== productId);
        }
    },
    extraReducers: (builder) => {
        // createCartAction
        builder.addCase(cartActions.createCartAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(cartActions.createCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
        }).addCase(cartActions.createCartAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to create cart at server`);
            }
        })

        // getCartInfoAction
        builder.addCase(cartActions.getCartInfoAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(cartActions.getCartInfoAction.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        }).addCase(cartActions.getCartInfoAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to Get cart from server`);
            }
        })
    }
})
export const {
    addToCart,
    clearCart,
    incrementCartProductCount,
    decrementCartProductCount,
    deleteProductFromCart
} = cartSlice.actions;