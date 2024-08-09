import {Request, Response} from "express";
import * as ErrorUtil from "../util/ErrorUtil";
import {userUtil} from "../util/UserUtil";
import AddressCollection from "../schemas/AddressSchema";
import mongoose from "mongoose";
import {IAddress} from "../models/IAddress";
import UserCollection from "../schemas/UserSchema";

/**
 * Create New Address
 * @param request
 * @param response
 */
export const createNewAddress = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        if (userObj) {
            let {mobile, flat, landmark, street, city, state, country, pinCode} = request.body;
            // check if address exists
            const mongoUserId = new mongoose.Types.ObjectId(userObj._id);
            const userTableObj = await UserCollection.findById(mongoUserId);
            const addressObj = await AddressCollection.findOne({userObj: mongoUserId});
            if (addressObj) {
                await AddressCollection.findOneAndRemove({userObj: mongoUserId});
            }
            if (userTableObj && userTableObj.username && userTableObj.email) {
                // create address
                let newAddress: IAddress = {
                    name: userTableObj?.username,
                    email: userTableObj?.email,
                    mobile: mobile,
                    flat: flat,
                    landmark: landmark,
                    street: street,
                    city: city,
                    state: state,
                    country: country,
                    pinCode: pinCode,
                    userObj: userObj._id
                };
                const theAddress = await new AddressCollection(newAddress).save();
                if (!theAddress) {
                    return response.status(400).json({msg: "Address Creation is failed"});
                }
                return response.status(200).json({
                    msg: "Address is Created",
                    address: theAddress
                });
            }
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * updateAddress
 * @param request
 * @param response
 */
export const updateAddress = async (request: Request, response: Response) => {
    try {
        const {addressId} = request.params;
        const userObj = await userUtil(request, response);
        if (userObj) {

            const mongoAddressId = new mongoose.Types.ObjectId(addressId);
            let {mobile, flat, landmark, street, city, state, country, pinCode} = request.body;
            // check if address exists
            const mongoUserId = new mongoose.Types.ObjectId(userObj._id);
            const userTableObj = await UserCollection.findById(mongoUserId);
            const addressObj = await AddressCollection.findById(mongoAddressId);
            if (!addressObj) {
                return response.status(404).json({msg: "No Address found"});
            }
            if (userTableObj && userTableObj.username && userTableObj.email) {
                // create address
                let newAddress: IAddress = {
                    name: userTableObj?.username,
                    email: userTableObj?.email,
                    mobile: mobile,
                    flat: flat,
                    landmark: landmark,
                    street: street,
                    city: city,
                    state: state,
                    country: country,
                    pinCode: pinCode,
                    userObj: userObj._id
                };
                const theAddress = await AddressCollection.findByIdAndUpdate(mongoAddressId, {
                    $set: newAddress
                }, {new: true});
                if (!theAddress) {
                    return response.status(400).json({msg: "Address Update is failed"});
                }
                return response.status(200).json({
                    msg: "Address is Updated",
                    address: theAddress
                });
            }
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * getAddress
 * @param request
 * @param response
 */
export const getAddress = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        if (userObj) {
            // check if address exists
            const mongoUserId = new mongoose.Types.ObjectId(userObj._id);
            const addressObj = await AddressCollection.findOne({userObj: mongoUserId});
            if (!addressObj) {
                return response.status(404).json({msg: "No Address found"});
            }
            return response.status(200).json(addressObj);
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * deleteAddress
 * @param request
 * @param response
 */
export const deleteAddress = async (request: Request, response: Response) => {
    try {
        const {addressId} = request.params;
        const mongoAddressId = new mongoose.Types.ObjectId(addressId);
        const addressObj = await AddressCollection.findById(mongoAddressId);
        if (!addressObj) {
            return response.status(404).json({msg: "No Address found"});
        }
        const theAddress = await AddressCollection.findByIdAndDelete(mongoAddressId);
        if (!theAddress) {
            return response.status(400).json({msg: "unable to delete the address"});
        }
        return response.status(200).json({msg: "Address is deleted"});
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}