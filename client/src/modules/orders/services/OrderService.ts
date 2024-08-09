import axios from 'axios';
import {OrderRequestView} from "../models/OrderRequestView";
import {OrderResponseView} from "../models/OrderResponseView";

export class OrderService {

    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    // PRIVATE
    public static placeOrder(order: OrderRequestView): Promise<{ data: { msg: string, order: OrderResponseView } }> {
        let dataUrl = `${this.serverUrl}/api/orders/place`;
        return axios.post(dataUrl, order);
    }

    // PRIVATE
    public static getAllOrders(): Promise<{ data: OrderResponseView[] }> {
        let dataUrl = `${this.serverUrl}/api/orders/all`;
        return axios.get(dataUrl);
    }

    // PRIVATE
    public static getMyOrders(): Promise<{ data: OrderResponseView[] }> {
        let dataUrl = `${this.serverUrl}/api/orders/me`;
        return axios.get(dataUrl);
    }

    // PRIVATE
    public static updateOrderStatus(orderStatus: string, orderId: string): Promise<{ data: { msg: string, order: OrderResponseView } }> {
        let dataUrl = `${this.serverUrl}/api/orders/${orderId}`;
        return axios.post(dataUrl, {orderStatus: orderStatus});
    }
}