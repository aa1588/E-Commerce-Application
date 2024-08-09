import {Request, Response} from "express";
import * as ErrorUtil from "../util/ErrorUtil";
import {userUtil} from "../util/UserUtil";
import CartCollection from "../schemas/CartSchema";
import {ICart} from "../models/ICart";
import mongoose from "mongoose";

/**
 * create a Cart
 * @param request
 * @param response
 */
export const createCart = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        if (userObj) {
            const {products, total, tax, grandTotal} = request.body;
            // check if user already have a cart
            const cart = await CartCollection.findOne({userObj: userObj._id});
            if (cart) {
                await CartCollection.findOneAndDelete({userObj: userObj._id});
            }
            const newCart: ICart = {
                products: products,
                total: total,
                tax: tax,
                grandTotal: grandTotal,
                userObj: userObj._id
            };
            const theCart = await new CartCollection(newCart).save();
            if (!theCart) {
                return response.status(400).json({msg: 'Cart Creation is failed'});
            }
            const actualCart = await CartCollection.findById(new mongoose.Types.ObjectId(theCart._id)).populate({
                path: 'products',
                populate: {
                    path: 'product'
                },
                strictPopulate: false
            }).populate({
                path: 'userObj',
                strictPopulate: false
            })
            return response.status(200).json(
                {
                    msg: 'Cart Creation is Success',
                    cart: actualCart
                });
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * getCartInfo
 * @param request
 * @param response
 */
export const getCartInfo = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        const mongoUserId = new mongoose.Types.ObjectId(userObj._id);
        if (userObj) {
            const actualCart = await CartCollection.findOne({userObj: mongoUserId}).populate({
                path: 'products',
                populate: {
                    path: 'product'
                },
                strictPopulate: false
            }).populate({
                path: 'userObj',
                strictPopulate: false
            })
            return response.status(200).json(actualCart);
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

