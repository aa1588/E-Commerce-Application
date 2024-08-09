import {Request, Response} from "express";
import {APP_CONSTANTS} from "../Contants";
import mongoose from "mongoose";
import * as ErrorUtil from '../util/ErrorUtil';
import {CategoryCollection, SubCategoryCollection} from "../schemas/CategorySchema";
import {ICategory, ISubCategory} from "../models/ICategory";
import {userUtil} from "../util/UserUtil";

/**
 * Create a Category
 * @param request
 * @param response
 */
export const createCategory = async (request: Request, response: Response) => {
    try {
        const userObj = await userUtil(request, response);
        if (userObj) {
            // check if admin
            if (userObj.isAdmin) {
                let {name, description} = request.body; // read the form data

                // check if the user exists
                let categoryObj = await CategoryCollection.findOne({name: name});
                if (categoryObj) {
                    return response.status(401).json({
                        msg: 'Category Already exists',
                        data: null,
                        status: APP_CONSTANTS.FAILED
                    })
                }

                // create a user
                let category: ICategory = {
                    name: name,
                    description: description,
                    subCategories: [] as ISubCategory[]
                };
                let theCategory = await new CategoryCollection(category).save();
                if (theCategory) {
                    return response.status(201).json({
                        msg: 'Category is Created'
                    });
                }
            } else {
                return response.status(401).json({
                    msg: 'You are not authorized to create'
                });
            }

        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};

/**
 * Create a Sub Category
 * @param request
 * @param response
 */
export const createSubCategory = async (request: Request, response: Response) => {
    try {
        const {categoryId} = request.params;
        const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
        const userObj = await userUtil(request, response);
        if (userObj) {
            // check if admin
            if (userObj.isAdmin) {
                let {name, description} = request.body; // read the form data

                // check if the user exists
                let categoryObj = await CategoryCollection.findById(mongoCategoryId);
                if (!categoryObj) {
                    return response.status(401).json({
                        msg: 'Category is not exists',
                        data: null,
                        status: APP_CONSTANTS.FAILED
                    })
                }

                // sub categories
                let theSub = await new SubCategoryCollection({name: name, description: description}).save();
                if (theSub) {
                    categoryObj.subCategories.push(theSub);
                    let theCategory = await categoryObj.save();
                    if (theCategory) {
                        return response.status(201).json({
                            msg: 'Sub Category is Created'
                        });
                    }
                }
            } else {
                return response.status(401).json({
                    msg: 'You are not authorized to create'
                });
            }

        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};

/**
 * getAllCategories
 * @param request
 * @param response
 */
export const getAllCategories = async (request: Request, response: Response) => {
    try {
        let categories: ICategory[] = await CategoryCollection.find().populate('subCategories', ['_id', 'name', 'description']);
        return response.status(200).json(categories);
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
};

