import React, {useEffect, useState} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import * as cartReducer from "../../../redux/cart/cart.reducer";
import * as cartActions from "../../../redux/cart/cart.actions";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import NoProductFound from "../../ui/components/NoProductsFound";
import {CartProduct, CartRequestView} from "../models/CartRequestView";
import {useNavigate} from "react-router-dom";
import SpinnerUI from "../../ui/components/SpinnerUI";
import {ProductResponseView} from "../../products/models/ProductResponseView";
import {ProductsEntity} from "../models/CartResponseView";

const CartPage = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const PRODUCT_TAX: number = 5.0;

    const [products, setProducts] = useState<ProductResponseView[]>([]);

    // get cart count from redux
    const cartState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    })

    const {loading, products: productRedux, cart} = cartState;

    const clickDecrCount = (productId: string) => {
        dispatch({
            type: `${cartReducer.decrementCartProductCount}`,
            payload: {productId: productId}
        })
    };

    const clickIncrCount = (productId: string) => {
        dispatch({
            type: `${cartReducer.incrementCartProductCount}`,
            payload: {productId: productId}
        })
    };

    const clickDeleteProduct = (productId: string) => {
        dispatch({
            type: `${cartReducer.deleteProductFromCart}`,
            payload: {productId: productId}
        })
    };

    const calculateTotal = (): number => {
        let total: number = 0;
        for (let product of products) {
            total += (Number(product.price) * Number(product.count));
        }
        return total;
    };

    const calculateTax = (): number => {
        return calculateTotal() * PRODUCT_TAX / 100;
    };

    const calculateGrandTotal = (): number => {
        return calculateTotal() + calculateTax();
    };

    const clickCheckOut = () => {
        const cartProds: CartProduct[] = products.map(item => {
            return {
                product: item._id,
                count: item.count,
                price: item.count * Number(item.price)
            }
        })
        const cartProducts: CartRequestView = {
            products: cartProds,
            tax: calculateTax(),
            total: calculateTotal(),
            grandTotal: calculateGrandTotal()
        }
        dispatch(cartActions.createCartAction(cartProducts)).then((response: any) => {
            if (!response.error) {
                navigate("/cart/checkout");
            }
        });
    };

    useEffect(() => {
        dispatch(cartActions.getCartInfoAction());
    }, [dispatch])

    useEffect(() => {
        setProducts(productRedux);
    }, [productRedux])

    /*useEffect(() => {
        if (cart.products) {
            const productList: ProductsEntity[] = cart.products;
            const theProducts: ProductResponseView[] = productList.map((item) => {
                return {
                    _id: item.product._id,
                    title: item.product.title,
                    description: item.product.description,
                    imageUrl: item.product.imageUrl,
                    brand: item.product.brand,
                    sold: 0,
                    count: item.count,
                    price: item.product.price.toString(),
                    quantity: item.product.quantity.toString(),
                    userObj: cart.userObj
                }
            })
            setProducts(theProducts);
        }
    }, [cart]);*/

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Cart Page'} color={'text-success'}/>
            {
                products && products.length > 0 &&
                <Container className="mt-3">
                    <Row>
                        <Col xs={9}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success">
                                    <p className="h3 text-white">Cart Items</p>
                                </Card.Header>
                                <Card.Body className="bg-light-success">
                                    <Table striped hover className="text-center">
                                        <thead className="bg-warning">
                                        <tr>
                                            <th>SNO</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            products.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img src={product.imageUrl} alt="" width={50} height={50}/>
                                                        </td>
                                                        <td>{product.title}</td>
                                                        <td>{product.price}</td>
                                                        <td>
                                                            <i className="bi bi-dash-circle-fill text-success me-1"
                                                               onClick={() => clickDecrCount(product._id)}></i>
                                                            {product.count}
                                                            <i className="bi bi-plus-circle-fill text-success ms-1"
                                                               onClick={() => clickIncrCount(product._id)}></i>
                                                        </td>
                                                        <td>{Number(product.price) * (product.count ? product.count : 1)}</td>
                                                        <td>
                                                            <Button variant={'danger'}
                                                                    onClick={() => clickDeleteProduct(product._id)}>
                                                                <i className="bi bi-trash-fill"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success">
                                    <p className="h3 text-white">Your Total</p>
                                </Card.Header>
                                <Card.Body className="bg-light-success">
                                    <ListGroup>
                                        <ListGroupItem>Total : <span
                                            className="fw-bold">&#8377;{calculateTotal().toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Tax : <span
                                            className="fw-bold">&#8377; {calculateTax().toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Grand Total : <span
                                            className="fw-bold">&#8377; {calculateGrandTotal().toFixed(2)}</span></ListGroupItem>
                                    </ListGroup>
                                    <div className="d-grid mt-2">
                                        <Button variant="warning" size="sm" onClick={clickCheckOut}>
                                            CheckOut
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            }
            {
                products.length === 0 &&
                <NoProductFound/>
            }
        </>
    );
};
export default CartPage