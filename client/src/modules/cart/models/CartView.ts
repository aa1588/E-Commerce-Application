import {ProductResponseView} from "../../products/models/ProductResponseView";

export interface CartView {
    products: ProductResponseView[];
    total: number;
    tax: number;
    grandTotal: number;
}