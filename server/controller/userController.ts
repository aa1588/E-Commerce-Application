import {Request, Response} from "express";
import {APP_CONSTANTS} from "../Contants";
import UserCollection from "../schemas/UserSchema";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import {IUser} from "../models/IUser";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import * as ErrorUtil from '../util/ErrorUtil';

/**
 * register a User
 * @param request
 * @param response
 */
export const registerUser = async (request: Request, response: Response) => {
    try {
        let {username, email, password} = request.body; // read the form data

        // check if the user exists
        let userObj = await UserCollection.findOne({email: email});
        if (userObj) {
            return response.status(401).json({
                msg: 'User Already exists',
                data: null,
                status: APP_CONSTANTS.FAILED
            })
        }

        // get the gravatar url
        let imageUrl: string = gravatar.url(email, {
            size: '200',
            rating: 'pg',
            default: 'mm'
        })

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // create a user
        let newUser: IUser = {
            username: username,
            email: email,
            password: hashPassword,
            imageUrl: imageUrl
        };
        let user = await new UserCollection(newUser).save();
        if (user) {
            return response.status(201).json({
                msg: 'Registration is Success'
            });
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};

/**
 * login a user
 * @param request
 * @param response
 */
export const loginUser = async (request: Request, response: Response) => {
    try {
        let {email, password} = request.body;

        // verify email , password
        let userObj = await UserCollection.findOne({email: email});
        if (!userObj) {
            return response.status(401).json({
                msg: 'Invalid Credentials',
                data: null,
                status: APP_CONSTANTS.FAILED
            })
        }
        let isMatch: boolean = await bcryptjs.compare(password, userObj.password);
        if (!isMatch) {
            return response.status(401).json({
                msg: 'Invalid Credentials',
                data: null,
                status: APP_CONSTANTS.FAILED
            })
        }
        // create token & send
        let payload = {
            id: userObj._id,
            email: userObj.email
        };
        let secretKey: string | undefined = process.env.EXPRESS_APP_JWT_SECRET_KEY;
        if (payload && secretKey) {
            let token = jwt.sign(payload, secretKey, {
                expiresIn: 100000
            });
            return response.status(200).json({
                msg: 'Login is Success',
                token: token,
                user: userObj
            });
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};

/**
 * get User Data
 * @param request
 * @param response
 */
export const getUserData = async (request: Request, response: Response) => {
    try {
        let payload: any = request.headers['user'];
        let {id} = payload;
        if (!id) {
            return response.status(401).json({
                msg: 'Invalid User Request'
            });
        }
        const mongoUserId = new mongoose.Types.ObjectId(id);
        let userObj = await UserCollection.findById(mongoUserId);
        return response.status(200).json(
            {
                user: userObj
            }
        );
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};

/**
 * updateProfilePicture
 * @param request
 * @param response
 */
export const updateProfilePicture = async (request: Request, response: Response) => {
    try {
        let {imageUrl} = request.body; // read image url from form
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
            userObj.imageUrl = imageUrl;
            let userResponse = await userObj.save();
            if (userResponse) {
                return response.status(200).json(
                    {
                        user: userObj
                    }
                );
            }
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};


/**
 * changePassword
 * @param request
 * @param response
 */
export const changePassword = async (request: Request, response: Response) => {
    try {
        let {password} = request.body; // read image url from form
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
            // hash password
            const salt = await bcryptjs.genSalt(10);
            userObj.password = await bcryptjs.hash(password, salt);
            let userResponse = await userObj.save();
            if (userResponse) {
                return response.status(200).json(
                    {
                        user: userObj,
                        msg: 'Password is updated, Please Login again!'
                    }
                );
            } else {
                return response.status(400).json({msg: 'Password change is failed'});
            }
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};
