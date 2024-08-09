import React, {useEffect} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import * as cartReducer from "../../../redux/cart/cart.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import NoProductFound from "../../ui/components/NoProductsFound";
import * as userActions from "../../../redux/users/user.actions";
import * as userReducer from "../../../redux/users/user.reducer";
import SpinnerUI from "../../ui/components/SpinnerUI";
import {CartProduct, CartRequestView} from "../models/CartRequestView";
import * as cartActions from "../../../redux/cart/cart.actions";
import * as orderActions from "../../../redux/order/order.actions";
import {OrderRequestView} from "../../orders/models/OrderRequestView";

const CheckOutPage = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const PRODUCT_TAX: number = 5.0;

    // get cart count from redux
    const cartState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    })

    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    let {loading, address} = userState;

    const {products} = cartState;

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

    useEffect(() => {
        dispatch(userActions.getAddressAction());
    }, []);

    const clickPlaceOrder = () => {
        const cartProds: CartProduct[] = products.map(item => {
            return {
                product: item._id,
                count: item.count,
                price: item.count * Number(item.price)
            }
        })
        const cartProducts: OrderRequestView = {
            products: cartProds,
            tax: calculateTax(),
            total: calculateTotal(),
            grandTotal: calculateGrandTotal(),
            paymentType: "COD"
        }
        dispatch(orderActions.placeOrderAction(cartProducts)).then((response: any) => {
            if (!response.error) {
                navigate("/orders/details");
                dispatch({
                    type: `${cartReducer.clearCart}`
                })
            }
        });
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'CheckOut Your Products'} color={'text-success'}/>
            {
                products && products.length > 0 &&
                <Container className="mt-3">
                    <Row>
                        <Col xs={8}>
                            {
                                address && Object.keys(address).length > 0 ?

                                    <Card className="shadow-lg">
                                        <Card.Header className="bg-success">
                                            <div className="d-flex justify-content-between">
                                                <p className="h3 text-white">Shipping Address</p>
                                                <Link to={`/users/edit-shipping-address/${address._id}`}>
                                                    <Button variant={'primary'} className="me-2">
                                                        <i className="bi bi-pencil-fill text-white"></i>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Card.Header>

                                        <Card.Body className="bg-light-success">
                                            <ListGroup>
                                                <ListGroupItem>Name : <span
                                                    className="fw-bold">{address.name}</span></ListGroupItem>
                                                <ListGroupItem>Email : <span
                                                    className="fw-bold">{address.email}</span></ListGroupItem>
                                                <ListGroupItem>Flat : <span
                                                    className="fw-bold">{address.flat}</span></ListGroupItem>
                                                <ListGroupItem>Street : <span
                                                    className="fw-bold">{address.street}</span></ListGroupItem>
                                                <ListGroupItem>Landmark : <span
                                                    className="fw-bold">{address.landmark}</span></ListGroupItem>
                                                <ListGroupItem>City : <span
                                                    className="fw-bold">{address.city}</span></ListGroupItem>
                                                <ListGroupItem>State : <span
                                                    className="fw-bold">{address.state}</span></ListGroupItem>
                                                <ListGroupItem>Country : <span
                                                    className="fw-bold">{address.country}</span></ListGroupItem>
                                                <ListGroupItem>PinCode : <span
                                                    className="fw-bold">{address.pinCode}</span></ListGroupItem>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card> :
                                    <Card>
                                        <Card.Body>
                                            <Link to={'/users/add-shipping-address'}
                                                  className="text-decoration-none text-success">
                                                <i className="bi bi-plus-circle-fill"></i> Add Shipping
                                                Address</Link>
                                        </Card.Body>
                                    </Card>
                            }
                        </Col>
                        <Col xs={4}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success">
                                    <p className="h3 text-white">Your Cart</p>
                                </Card.Header>
                                <Card.Body className="bg-light-success">
                                    {/*
                                    }*/}
                                    <ListGroup>

                                        {
                                            products.map((item, index) => {
                                                return (
                                                    <ListGroupItem key={index}>
                                                        <Row>
                                                            <Col xs={3}>
                                                                <img src={item.imageUrl} alt="" width={100}
                                                                     height={100} className="img-fluid"/>
                                                            </Col>
                                                            <Col xs={9}>
                                                                <small>{item.title}</small><br/>
                                                                <small>count : {item.count}</small><br/>
                                                                <small>price
                                                                    : &#8377; {Number(item.price).toFixed(2)}</small>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })
                                        }

                                    </ListGroup>

                                    <ListGroup className="mt-3">
                                        <ListGroupItem>Total : <span
                                            className="fw-bold">&#8377;{calculateTotal().toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Tax : <span
                                            className="fw-bold">&#8377; {calculateTax().toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Grand Total : <span
                                            className="fw-bold">&#8377; {calculateGrandTotal().toFixed(2)}</span></ListGroupItem>
                                    </ListGroup>
                                    <div className="d-grid mt-2">
                                        <Button variant="warning" size="sm" onClick={clickPlaceOrder}>
                                            Place Order
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
export default CheckOutPage