import {Request, Response} from "express";
import mongoose from "mongoose";
import UserCollection from "../schemas/UserSchema";
import {catchErrors} from "./ErrorUtil";

export const userUtil = async (request: Request, response: Response) => {
    try {
        let payload: any = request.headers['user'];
        let {id} = payload;
        if (!id) {
            return response.status(401).json({
                msg: 'Invalid User Request'
            });
        }
        const mongoUserId = new mongoose.Types.ObjectId(id);
        let userObj: any = await UserCollection.findById(mongoUserId);
        if (userObj) {
            return userObj;
        }
    } catch (error) {
        return catchErrors(request, response);
    }
};