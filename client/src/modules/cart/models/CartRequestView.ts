export interface CartProduct {
    product: string;
    count: number;
    price: number;
}

export interface CartRequestView {
    products: CartProduct[];
    total: number,
    tax: number,
    grandTotal: number,
    
}