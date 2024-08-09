interface OrderProduct {
    product: string;
    count: number;
    price: number;
}

export interface OrderRequestView {
    products: OrderProduct[];
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus?: string;
}