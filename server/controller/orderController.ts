import {Request, Response} from "express";
import * as ErrorUtil from "../util/ErrorUtil";
import {userUtil} from "../util/UserUtil";
import {IOrder} from "../models/IOrder";
import OrderCollection from "../schemas/OrderSchema";
import mongoose from "mongoose";

/**
 * place an order
 * @param request
 * @param response
 */
export const placeOrder = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        if (userObj) {
            const {products, total, tax, grandTotal, paymentType} = request.body;
            const newOrder: IOrder = {
                products: products,
                total: total,
                tax: tax,
                grandTotal: grandTotal,
                paymentType: paymentType,
                orderBy: userObj._id
            };
            const theOrder = await new OrderCollection(newOrder).save();

            if (theOrder) {
                const theActualOrder = await OrderCollection.findById(new mongoose.Types.ObjectId(theOrder._id)).populate({
                    path: 'products',
                    populate: {
                        path: 'product'
                    },
                    strictPopulate: false
                }).populate({
                    path: 'orderBy',
                    strictPopulate: false
                });
                if (!theOrder) {
                    return response.status(400).json({msg: 'Order Creation is failed'});
                }
                return response.status(200).json({msg: "Order is placed successfully", order: theActualOrder})
            }
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * getAllOrders
 * @param request
 * @param response
 */
export const getAllOrders = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        if (userObj) {
            const orders = await OrderCollection.find().sort('-createdAt').populate({
                path: 'products',
                populate: {
                    path: 'product'
                },
                strictPopulate: false
            }).populate({
                path: 'orderBy',
                strictPopulate: false
            });
            return response.status(200).json(orders);
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * getMyOrders
 * @param request
 * @param response
 */
export const getMyOrders = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        if (userObj) {
            const mongoUserId = new mongoose.Types.ObjectId(userObj._id);
            const orders = await OrderCollection.find({orderBy: mongoUserId}).sort('-createdAt').populate({
                path: 'products',
                populate: {
                    path: 'product'
                },
                strictPopulate: false
            }).populate({
                path: 'orderBy',
                strictPopulate: false
            });
            return response.status(200).json(orders);
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * updateOrderStatus
 * @param request
 * @param response
 */
export const updateOrderStatus = async (request: Request, response: Response) => {
    try {
        const {orderId} = request.params;
        const mongoOrderId = new mongoose.Types.ObjectId(orderId);
        const userObj = await userUtil(request, response);
        if (userObj) {
            const {orderStatus} = request.body;

            const orderObj = await OrderCollection.findById(mongoOrderId);
            if (!orderObj) {
                return response.status(400).json({msg: 'No Order found'});
            }
            orderObj.orderStatus = orderStatus;
            await orderObj.save();
            const theActualOrder = await OrderCollection.findById(mongoOrderId).populate({
                path: 'products',
                populate: {
                    path: 'product'
                },
                strictPopulate: false
            }).populate({
                path: 'orderBy',
                strictPopulate: false
            });
            return response.status(200).json({msg: 'Status is Updated', order: theActualOrder});
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}


