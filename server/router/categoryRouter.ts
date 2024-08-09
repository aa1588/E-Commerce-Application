import {Router, Request, Response} from 'express';
import {body} from 'express-validator';
import * as categoryController from '../controller/categoryController';
import {validateForm} from "../middleware/validateForm";
import {tokenVerifier} from "../middleware/tokenVerifier";

const categoryRouter: Router = Router();

/**
 * @usage : Create a Category
 * @url : http://localhost:9000/api/categories/
 * @params : name, description
 * @method : POST
 * @access : PRIVATE
 */
categoryRouter.post('/', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
], validateForm, tokenVerifier, async (request: Request, response: Response) => {
    await categoryController.createCategory(request, response);
})

/**
 * @usage : Create a Sub Category
 * @url : http://localhost:9000/api/categories/:categoryId
 * @params : name, description
 * @method : POST
 * @access : PRIVATE
 */
categoryRouter.post('/:categoryId', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
], validateForm, tokenVerifier, async (request: Request, response: Response) => {
    await categoryController.createSubCategory(request, response);
})


/**
 * @usage : Get all categories
 * @url : http://localhost:9000/api/categories/
 * @params : no-params
 * @method : GET
 * @access : PUBLIC
 */
categoryRouter.get('/', async (request: Request, response: Response) => {
    await categoryController.getAllCategories(request, response);
})

export default categoryRouter;
