import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {OrderResponseView} from "../../modules/orders/models/OrderResponseView";
import * as orderActions from "../order/order.actions";
import {ToastUtil} from "../../util/ToastUtil";

export const orderFeatureKey = "orderFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    orders: OrderResponseView[];
    order: OrderResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    orders: [] as OrderResponseView[],
    order: {} as OrderResponseView
};

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // placeOrderAction
        builder.addCase(orderActions.placeOrderAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.placeOrderAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast(action.payload.msg);
            state.order = action.payload.order;
        }).addCase(orderActions.placeOrderAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to Place an order`);
            }
        })

        // getAllOrdersAction
        builder.addCase(orderActions.getAllOrdersAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.getAllOrdersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        }).addCase(orderActions.getAllOrdersAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to get Orders from server`);
            }
        })

        // getMyOrdersAction
        builder.addCase(orderActions.getMyOrdersAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.getMyOrdersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        }).addCase(orderActions.getMyOrdersAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to get Orders from server`);
            }
        })

        // updateOrderStatusAction
        builder.addCase(orderActions.updateOrderStatusAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.updateOrderStatusAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast(action.payload.msg);
            state.order = action.payload.order;
        }).addCase(orderActions.updateOrderStatusAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to update the status`);
            }
        })
    }
})