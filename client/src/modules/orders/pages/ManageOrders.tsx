import React, {useEffect, useState} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import * as orderReducer from "../../../redux/order/order.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import SpinnerUI from "../../ui/components/SpinnerUI";
import * as orderActions from "../../../redux/order/order.actions";
import NoProductFound from "../../ui/components/NoProductsFound";
import {OrderUtil} from "../../../util/OrderUtil";


const ManageOrders = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const [newStatus, setNewStatus] = useState<{ orderId: string, orderStatus: string }>({
        orderId: "",
        orderStatus: ""
    });

    // get order details from redux
    const orderState: orderReducer.InitialState = useSelector((state: RootState) => {
        return state[orderReducer.orderFeatureKey];
    });

    const {loading, orders} = orderState;

    const updateInput = (event: React.ChangeEvent<any>, orderId: string) => {
        if (orderId) {
            setNewStatus({
                orderId: orderId,
                orderStatus: event.target.value
            });
        }
    };

    useEffect(() => {
        dispatch(orderActions.getAllOrdersAction());
    }, [])

    const clickUpdateStatus = (orderId: string | undefined) => {
        if (orderId) {
            if (newStatus.orderId === orderId) {
                const newOrderStatus = {
                    orderId: orderId,
                    orderStatus: newStatus.orderStatus
                };
                dispatch(orderActions.updateOrderStatusAction(newOrderStatus)).then((response: any) => {
                    if (!response.error) {
                        dispatch(orderActions.getAllOrdersAction());
                    }
                });
            }
        }
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Manage Orders'} color={'text-success'}/>
            {
                orders && orders.length > 0 ? <>
                    <Container>
                        <Row>
                            <Col>
                                <Table striped hover className="text-center shadow-lg">
                                    <thead className="bg-success text-white">
                                    <tr>
                                        <th>Order Number</th>
                                        <th>Order Placed On</th>
                                        <th>Order By</th>
                                        <th>Total Amount</th>
                                        <th>Payment Type</th>
                                        <th>Order Status</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orders.map(order => {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                                    <td>{order.orderBy?.username}</td>
                                                    <td>&#8377; {Number(order.grandTotal).toFixed(2)}</td>
                                                    <td>{order.paymentType}</td>
                                                    <td className="fw-bold">{order.orderStatus}</td>
                                                    <td>
                                                        <Form.Select onChange={e => updateInput(e, order._id)}>
                                                            {
                                                                OrderUtil.getOrderStatuses().map((item, index) => {
                                                                    return (
                                                                        <option value={item}>{item}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </td>
                                                    <td>
                                                        <Button variant={'warning'}
                                                                onClick={() => clickUpdateStatus(order._id)}>Update</Button>
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
                </> : <>
                    <NoProductFound/>
                </>
            }
        </>
    );
};
export default ManageOrders;