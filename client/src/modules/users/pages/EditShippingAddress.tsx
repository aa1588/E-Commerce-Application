import React, {useEffect, useState} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {UserView} from "../models/UserView";
import * as userReducer from "../../../redux/users/user.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import {userFeatureKey, userLogOutAction} from "../../../redux/users/user.reducer";
import SpinnerUI from "../../ui/components/SpinnerUI";
import * as userActions from "../../../redux/users/user.actions";
import {ToastUtil} from "../../../util/ToastUtil";
import {AddressView} from "../models/AddressView";

const EditShippingAddress = () => {
    const {addressId} = useParams();

    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userFeatureKey]
    })

    let {loading, address: reduxAddress} = userState;

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    let [address, setAddress] = useState<AddressView>({
        mobile: "",
        flat: "",
        landmark: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        })
    };

    useEffect(() => {
        if (reduxAddress && Object.keys(reduxAddress).length > 0) {
            setAddress({
                mobile: reduxAddress.mobile ? reduxAddress.mobile : "",
                flat: reduxAddress.flat ? reduxAddress.flat : "",
                landmark: reduxAddress.landmark ? reduxAddress.landmark : "",
                street: reduxAddress.street ? reduxAddress.street : "",
                city: reduxAddress.city ? reduxAddress.city : "",
                state: reduxAddress.state ? reduxAddress.state : "",
                country: reduxAddress.country ? reduxAddress.country : "",
                pinCode: reduxAddress.pinCode ? reduxAddress.pinCode : "",
            })
        }
    }, [reduxAddress])

    useEffect(() => {
        if (addressId) {
            dispatch(userActions.getAddressAction());
        }
    }, [addressId])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            if (addressId && addressId.length > 0 && address && Object.keys(address).length > 0) {
                dispatch(userActions.updateAddressAction({
                    address: address,
                    addressId: addressId
                })).then((response: any) => {
                    if (!response.error) {
                        navigate("/users/profile");
                    }
                });
            }
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Edit Shipping Address'} color={'text-primary'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.mobile}
                                    onChange={updateInput}
                                    name={'mobile'}
                                    type={'text'} placeholder={'Mobile'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.flat}
                                    onChange={updateInput}
                                    name={'flat'}
                                    type={'text'} placeholder={'Flat'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.landmark}
                                    onChange={updateInput}
                                    name={'landmark'}
                                    type={'text'} placeholder={'Landmark'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.street}
                                    onChange={updateInput}
                                    name={'street'}
                                    type={'text'} placeholder={'Street'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.city}
                                    onChange={updateInput}
                                    name={'city'}
                                    type={'text'} placeholder={'City'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.state}
                                    onChange={updateInput}
                                    name={'state'}
                                    type={'text'} placeholder={'State'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.country}
                                    onChange={updateInput}
                                    name={'country'}
                                    type={'text'} placeholder={'Country'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.pinCode}
                                    onChange={updateInput}
                                    name={'pinCode'}
                                    type={'text'} placeholder={'PinCode'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                                <Link to={'/users/profile'} className="btn btn-dark ms-2">Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default EditShippingAddress;