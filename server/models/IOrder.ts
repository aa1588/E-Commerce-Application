import mongoose from "mongoose";
import {ICartProduct} from "./ICart";

export interface IOrder {
    products: ICartProduct[];
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus?: string,
    orderBy: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}