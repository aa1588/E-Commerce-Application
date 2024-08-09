import React, {useEffect, useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Link, useParams} from "react-router-dom";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as productActions from "../../../../redux/products/product.actions";
import * as productReducer from "../../../../redux/products/product.reducers";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/SpinnerUI";
import {Col, Container, ListGroup, ListGroupItem, Row, Card, Button} from "react-bootstrap";
import {ProductResponseView} from "../../models/ProductResponseView";
import * as cartReducer from "../../../../redux/cart/cart.reducer";

const ViewProduct = () => {
    const {categoryName, productId} = useParams();
    const dispatch: AppDispatch = useAppDispatch();

    //get product details from redux state
    const productState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    });

    const {loading, product} = productState;

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductAction({productId: productId}));
        }
    }, [productId]);

    const clickAddToCart = (product: ProductResponseView) => {
        dispatch({
            type: `${cartReducer.addToCart}`,
            payload: {product: {...product, count: 1}}
        })
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>

            {
                Object.keys(product).length > 0 &&
                <>
                    <LayoutHeading heading={product.title} color={'text-success'}/>
                    <Container>
                        <Row>
                            <Col xs={3} className="">
                                <Card>
                                    <Card.Header>
                                        <img src={product.imageUrl} alt=""
                                             className="text-center m-auto d-block img-fluid"/>
                                    </Card.Header>
                                </Card>
                            </Col>
                            <Col xs={8}>
                                <ListGroup>
                                    <ListGroupItem>Title : <span
                                        className="fw-bold">{product.title}</span></ListGroupItem>
                                    <ListGroupItem>Brand : <span
                                        className="fw-bold">{product.brand}</span></ListGroupItem>
                                    <ListGroupItem>Price : <span
                                        className="fw-bold">&#8377;{product.price}</span></ListGroupItem>
                                    <ListGroupItem>Quantity : <span
                                        className="fw-bold">{product.quantity}</span></ListGroupItem>
                                    <ListGroupItem>Category : <span
                                        className="fw-bold">{product.categoryObj?.name}</span></ListGroupItem>
                                    <ListGroupItem>Sub Category : <span
                                        className="fw-bold">{product.subCategoryObj?.name}</span></ListGroupItem>
                                    <ListGroupItem>Description : <span
                                        className="">{product.description}</span></ListGroupItem>
                                </ListGroup>
                                <Button className="mt-2" variant={'warning'} size={'sm'}
                                        onClick={() => clickAddToCart(product)}>Add to
                                    Cart</Button>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Link to={`/products/${categoryName?.toLowerCase()}`}>
                                <Button variant={'success'}>
                                    <i className="bi bi-arrow-left-circle-fill"></i> Back
                                </Button>
                            </Link>
                        </Row>
                    </Container>
                </>
            }
        </>
    );
};
export default ViewProduct