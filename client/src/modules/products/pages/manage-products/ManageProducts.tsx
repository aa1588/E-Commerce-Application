import React, {useEffect} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as productActions from '../../../../redux/products/product.actions';
import * as productReducer from '../../../../redux/products/product.reducers';
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/SpinnerUI";
import {Link} from "react-router-dom";

const ManageProducts = () => {
    const dispatch: AppDispatch = useAppDispatch();

    // get all products data from redux
    const productState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    });

    const {loading, products} = productState;

    useEffect(() => {
        dispatch(productActions.getAllProductsAction());
    }, []);

    const clickDeleteProduct = (productId: string | undefined) => {
        if (productId) {
            dispatch(productActions.deleteProductAction({
                productId: productId
            })).then((response: any) => {
                if (!response.error) {
                    dispatch(productActions.getAllProductsAction());
                }
            });
        }
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Manage Products'} color={'text-success'}/>
            {
                products && products.length > 0 &&
                <Container>
                    <Row>
                        <Col>
                            <Table striped hover className="text-center shadow-lg">
                                <thead className="bg-success text-white">
                                <tr>
                                    <th>SNO</th>
                                    <th>Product Id</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    products.map((product, index) => {
                                        return (
                                            <tr key={product._id}>
                                                <td>{index + 1}</td>
                                                <td>{product._id.substring(product._id.length - 5)}</td>
                                                <td>
                                                    <img src={product.imageUrl} alt="" width={50} height={50}/>
                                                </td>
                                                <td>{product.title}</td>
                                                <td>{product.brand}</td>
                                                <td>&#8377;{product.price}</td>
                                                <td>{product.quantity}</td>
                                                <td>
                                                    <Link to={`/products/edit/${product._id}`}>
                                                        <Button variant={'primary'}>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Button>
                                                    </Link>
                                                    <Button onClick={() => clickDeleteProduct(product._id)}
                                                            variant={'danger'} className="ms-2">
                                                        <i className="bi bi-trash-fill"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );
};
export default ManageProducts