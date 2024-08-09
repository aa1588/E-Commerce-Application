import {Request, Response, Router} from 'express';
import * as addressController from "../controller/addressController";
import {body} from "express-validator";
import {validateForm} from "../middleware/validateForm";
import {tokenVerifier} from "../middleware/tokenVerifier";

const addressRouter: Router = Router();

/**
 * @usage : Create New Address
 * @url : http://localhost:9000/api/addresses/new
 * @params : name, email, mobile,address,landmark,street,city,state,country,pinCode
 * @method : POST
 * @access : PRIVATE
 */
addressRouter.post('/new', [
    body('mobile').not().isEmpty().withMessage('mobile is required'),
    body('flat').not().isEmpty().withMessage('flat is required'),
    body('landmark').not().isEmpty().withMessage('landmark is required'),
    body('street').not().isEmpty().withMessage('street is required'),
    body('city').not().isEmpty().withMessage('city is required'),
    body('state').not().isEmpty().withMessage('state is required'),
    body('country').not().isEmpty().withMessage('country is required'),
    body('pinCode').not().isEmpty().withMessage('pinCode is required'),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await addressController.createNewAddress(request, response);
})

/**
 * @usage : Update Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @params : name, email, mobile,address,landmark,street,city,state,country,pinCode
 * @method : PUT
 * @access : PRIVATE
 */
addressRouter.put('/:addressId', [
    body('mobile').not().isEmpty().withMessage('mobile is required'),
    body('flat').not().isEmpty().withMessage('flat is required'),
    body('landmark').not().isEmpty().withMessage('landmark is required'),
    body('street').not().isEmpty().withMessage('street is required'),
    body('city').not().isEmpty().withMessage('city is required'),
    body('state').not().isEmpty().withMessage('state is required'),
    body('country').not().isEmpty().withMessage('country is required'),
    body('pinCode').not().isEmpty().withMessage('pinCode is required'),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await addressController.updateAddress(request, response);
})


/**
 * @usage : Get Address
 * @url : http://localhost:9000/api/addresses/me
 * @params : no-params
 * @method : GET
 * @access : PRIVATE
 */
addressRouter.get('/me', tokenVerifier, async (request: Request, response: Response) => {
    await addressController.getAddress(request, response);
})


/**
 * @usage : Delete Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @params : no-params
 * @method : DELETE
 * @access : PRIVATE
 */
addressRouter.delete('/:addressId', tokenVerifier, async (request: Request, response: Response) => {
    await addressController.deleteAddress(request, response);
})
export default addressRouter;
