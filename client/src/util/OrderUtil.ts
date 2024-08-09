export class OrderUtil {
    static orderStatus: string[] = ["Order Placed", "Processing", "Dispatched", "Delivered", "Cancelled", "Completed"];

    public static getOrderStatuses() {
        return this.orderStatus;
    }
}