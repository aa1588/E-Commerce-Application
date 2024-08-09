import {createAsyncThunk} from "@reduxjs/toolkit";
import {OrderRequestView} from "../../modules/orders/models/OrderRequestView";
import {OrderResponseView} from "../../modules/orders/models/OrderResponseView";
import {OrderService} from "../../modules/orders/services/OrderService";
import {AuthUtil} from "../../util/AuthUtil";

// placeOrderAction
export const placeOrderAction: any = createAsyncThunk('orders/placeOrderAction',
    async (order: OrderRequestView, {rejectWithValue}): Promise<{ msg: string, order: OrderResponseView } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) {
                let response = await OrderService.placeOrder(order);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// getAllOrdersAction
export const getAllOrdersAction: any = createAsyncThunk('orders/getAllOrdersAction',
    async (payload: {}, {rejectWithValue}): Promise<OrderResponseView[] | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) {
                let response = await OrderService.getAllOrders();
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// getMyOrdersAction
export const getMyOrdersAction: any = createAsyncThunk('orders/getMyOrdersAction',
    async (payload: {}, {rejectWithValue}): Promise<OrderResponseView[] | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) {
                let response = await OrderService.getMyOrders();
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

// updateOrderStatusAction
export const updateOrderStatusAction: any = createAsyncThunk('orders/updateOrderStatusAction',
    async (payload: { orderStatus: string, orderId: string }, {rejectWithValue}): Promise<{ msg: string, order: OrderResponseView } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) {
                const {orderStatus, orderId} = payload;
                let response = await OrderService.updateOrderStatus(orderStatus, orderId);
                return response.data;
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })