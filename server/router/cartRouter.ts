import {Router, Request, Response} from 'express';
import {body} from 'express-validator';
import {tokenVerifier} from "../middleware/tokenVerifier";
import {validateForm} from "../middleware/validateForm";
import * as cartController from "../controller/cartController";

const cartRouter: Router = Router();

/**
 * @usage : create a Cart
 * @url : http://localhost:9000/api/carts/
 * @params :products[{product, count,price}],total,tax,grandTotal
 * @method : POST
 * @access : PRIVATE
 */
cartRouter.post('/', [
    body('products').not().isEmpty().withMessage('products is required'),
    body('total').not().isEmpty().withMessage('total is required'),
    body('tax').not().isEmpty().withMessage('tax is required'),
    body('grandTotal').not().isEmpty().withMessage('grandTotal is required'),
], tokenVerifier, validateForm, async (request: Request, response: Response) => {
    await cartController.createCart(request, response);
})

/**
 * @usage : get Cart Info
 * @url : http://localhost:9000/api/carts/me
 * @params : no-params
 * @method : GET
 * @access : PRIVATE
 */
cartRouter.get('/me', tokenVerifier, async (request: Request, response: Response) => {
    await cartController.getCartInfo(request, response);
})
export default cartRouter;
