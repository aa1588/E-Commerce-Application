import {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {APP_CONSTANTS} from "../Contants";
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import UserCollection from "../schemas/UserSchema";
import {IUser} from "../models/IUser";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import {tokenVerifier} from "../middleware/tokenVerifier";
import * as userController from '../controller/userController';
import {validateForm} from "../middleware/validateForm";
import {updateProfilePicture} from "../controller/userController";

const userRouter: Router = Router();

/**
 * @usage : Register a User
 * @url : http://localhost:9000/api/users/register
 * @params : username , email , password
 * @method : POST
 * @access : PUBLIC
 */
userRouter.post('/register', [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isStrongPassword().withMessage('Password is required'),
], validateForm, async (request: Request, response: Response) => {
    await userController.registerUser(request, response);
})

/**
 * @usage : Login a User
 * @url : http://localhost:9000/api/users/login
 * @params : email , password
 * @method : POST
 * @access : PUBLIC
 */
userRouter.post('/login', [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isStrongPassword().withMessage('Password is required'),
], validateForm, async (request: Request, response: Response) => {
    await userController.loginUser(request, response);
})

/**
 *  @usage : get users Data
 *  @url : http://localhost:9000/api/users/me
 *  @method : GET
 *  @param : no-params
 *  @access : PRIVATE
 */
userRouter.get('/me', tokenVerifier, async (request: Request, response: Response) => {
    await userController.getUserData(request, response);
})

/**
 * @usage : update profile Picture
 * @url : http://localhost:9000/api/users/profile
 * @params : imageUrl
 * @method : POST
 * @access : PRIVATE
 */
userRouter.post('/profile', [
    body("imageUrl").not().isEmpty().withMessage("Profile Image url is required")
], validateForm, tokenVerifier, async (request: Request, response: Response) => {
    await userController.updateProfilePicture(request, response);
})

/**
 * @usage : change the password
 * @url : http://localhost:9000/api/users/change-password
 * @params : password
 * @method : POST
 * @access : PRIVATE
 */
userRouter.post('/change-password', [
    body("password").isStrongPassword().withMessage("Password is required")
], validateForm, tokenVerifier, async (request: Request, response: Response) => {
    await userController.changePassword(request, response);
})


export default userRouter;
