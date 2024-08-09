import {Request, Response} from "express";
import * as ErrorUtil from "../util/ErrorUtil";
import {userUtil} from "../util/UserUtil";
import ProductCollection from "../schemas/ProductSchema";
import {IProduct} from "../models/IProduct";
import mongoose from "mongoose";

/**
 * createProduct
 * @param request
 * @param response
 */
export const createProduct = async (request: Request, response: Response) => {
    try {
        let {title, description, imageUrl, brand, price, quantity, categoryId, subCategoryId} = request.body;
        const userObj = await userUtil(request, response);
        if (userObj) {
            // check if admin
            if (userObj.isAdmin) {
                // check if the product is exists
                let product = await ProductCollection.findOne({title: title})
                if (product) {
                    return response.status(400).json({msg: 'Product is already exists'});
                }
                // create a product
                let newProduct: IProduct = {
                    title: title,
                    imageUrl: imageUrl,
                    description: description,
                    brand: brand,
                    quantity: quantity,
                    price: price,
                    categoryObj: categoryId,
                    subCategoryObj: subCategoryId,
                    userObj: userObj._id
                }
                const theProduct = await new ProductCollection(newProduct).save();
                if (!theProduct) {
                    return response.status(400).json({
                        msg: "Product Creation is Failed"
                    })
                }
                const actualProduct = await ProductCollection.findById(new mongoose.Types.ObjectId(theProduct._id)).populate({
                    path: 'userObj',
                    strictPopulate: false
                }).populate({
                    path: 'categoryObj',
                    strictPopulate: false
                }).populate({
                    path: 'subCategoryObj',
                    strictPopulate: false
                })
                return response.status(200).json({
                    msg: "Product Creation is Success",
                    product: actualProduct
                })
            }
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * updateProduct
 * @param request
 * @param response
 */
export const updateProduct = async (request: Request, response: Response) => {
    const {productId} = request.params;
    try {
        const mongoProductId = new mongoose.Types.ObjectId(productId);
        let {title, description, imageUrl, brand, price, quantity, categoryId, subCategoryId} = request.body;
        const userObj = await userUtil(request, response);
        if (userObj && userObj.isAdmin) {
            // check if the product is exists
            let product = await ProductCollection.findById(mongoProductId);
            if (!product) {
                return response.status(400).json({msg: 'Product is not found'});
            }
            let newProduct: IProduct = {
                title: title,
                imageUrl: imageUrl,
                description: description,
                brand: brand,
                quantity: quantity,
                price: price,
                categoryObj: categoryId,
                subCategoryObj: subCategoryId,
                userObj: userObj._id
            }
            let theProduct = await ProductCollection.findByIdAndUpdate(mongoProductId, {
                $set: newProduct
            }, {new: true}).populate({
                path: 'userObj',
                strictPopulate: false
            }).populate({
                path: 'categoryObj',
                strictPopulate: false
            }).populate({
                path: 'subCategoryObj',
                strictPopulate: false
            });
            if (!theProduct) {
                return response.status(400).json({
                    msg: "Product Update is Failed"
                })
            }
            return response.status(200).json({
                msg: "Product Update is Success",
                product: theProduct
            })
        }
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * get All Products
 * @param request
 * @param response
 */
export const getAllProducts = async (request: Request, response: Response) => {
    try {
        const products = await ProductCollection.find().populate({
            path: 'userObj',
            strictPopulate: false
        }).populate({
            path: 'categoryObj',
            strictPopulate: false
        }).populate({
            path: 'subCategoryObj',
            strictPopulate: false
        });
        return response.status(200).json(products);
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * get a Product
 * @param request
 * @param response
 */
export const getProduct = async (request: Request, response: Response) => {
    const {productId} = request.params;
    try {
        const mongoProductId = new mongoose.Types.ObjectId(productId);
        let product = await ProductCollection.findById(mongoProductId).populate({
            path: 'userObj',
            strictPopulate: false
        }).populate({
            path: 'categoryObj',
            strictPopulate: false
        }).populate({
            path: 'subCategoryObj',
            strictPopulate: false
        });
        if (!product) {
            return response.status(400).json({msg: 'Product is not found'});
        }
        return response.status(200).json(product);
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}


/**
 * delete a Product
 * @param request
 * @param response
 */
export const deleteProduct = async (request: Request, response: Response) => {
    try {
        const {productId} = request.params;
        const mongoProductId = new mongoose.Types.ObjectId(productId);
        let product = await ProductCollection.findById(mongoProductId).populate({
            path: 'userObj',
            strictPopulate: false
        }).populate({
            path: 'categoryObj',
            strictPopulate: false
        }).populate({
            path: 'subCategoryObj',
            strictPopulate: false
        });
        if (!product) {
            return response.status(400).json({msg: 'Product is not found'});
        }
        const theProduct = await ProductCollection.findByIdAndDelete(mongoProductId);
        return response.status(200).json({
            msg: 'Product Deletion is success'
        });
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}

/**
 * get All Products with Category id
 * @param request
 * @param response
 */
export const getAllProductsWithCategoryId = async (request: Request, response: Response) => {
    const {categoryId} = request.params;
    try {
        const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
        const products = await ProductCollection.find({categoryObj: mongoCategoryId}).populate({
            path: 'userObj',
            strictPopulate: false
        }).populate({
            path: 'categoryObj',
            strictPopulate: false
        }).populate({
            path: 'subCategoryObj',
            strictPopulate: false
        });
        return response.status(200).json(products);
    } catch (error) {
        return ErrorUtil.catchErrors(error, response);
    }
}