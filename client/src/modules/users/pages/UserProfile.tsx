import React, {useEffect, useRef, useState} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import * as userReducer from "../../../redux/users/user.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import {Col, Container, Row, Card, Button, ListGroup, ListGroupItem} from "react-bootstrap";
import * as userActions from "../../../redux/users/user.actions";
import SpinnerUI from "../../ui/components/SpinnerUI";
import {Link} from "react-router-dom";

declare const window: Window &
    typeof globalThis & {
    cloudinary: {
        createUploadWidget: (p: {}, p1: (error: any, result: any) => void) => any
    }
}


const UserProfile = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();

    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    let {isAuthenticated, user, loading, address} = userState;

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        }, (error: any, result: { event: string; info: { secure_url: any; }; }) => {
            if (!error && result && result.event === "success") {
                dispatch(userActions.updateProfilePictureAction(result.info.secure_url));
            }
        });
    }, []);

    useEffect(() => {
        dispatch(userActions.getAddressAction());
    }, []);

    const clickDeleteAddress = (addressId: string | undefined) => {
        if (addressId) {
            dispatch(userActions.deleteAddressAction({
                addressId: addressId
            })).then((response: any) => {
                if (response.data) {
                    dispatch(userActions.getAddressAction());
                }
            });
        }
    };


    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            {
                user && Object.keys(user).length > 0 &&
                <>
                    <LayoutHeading heading={`${user.username}'s Profile`} color={'text-success'}/>
                    <Container>
                        <Row>
                            <Col xs={2}>
                                <Card>
                                    <Card.Header className="bg-warning">
                                        <p className="h4">Profile</p>
                                    </Card.Header>
                                    <Card.Body>
                                        <img src={user.imageUrl} alt="" className="img-fluid profile-img"/>
                                        <div className="d-grid gap-2 mt-3">
                                            <Button type="button" variant={'warning'}
                                                    onClick={() => widgetRef.current.open()}>
                                                <i className="bi bi-pencil-square"></i> Edit</Button>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col xs={5}>
                                <Card>
                                    <Card.Header className="bg-primary">
                                        <p className="h4 text-white">Your Information</p>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroupItem>Name : <span
                                                className="fw-bold">{user.username}</span></ListGroupItem>
                                            <ListGroupItem>Email : <span
                                                className="fw-bold">{user.email}</span></ListGroupItem>
                                            <ListGroupItem>Admin : <span
                                                className="fw-bold">{user.isAdmin ? "YES" : "NO"}</span></ListGroupItem>
                                            <ListGroupItem>Super Admin : <span
                                                className="fw-bold">{user.isSuperAdmin ? "YES" : "NO"}</span></ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col xs={5}>
                                <Card>
                                    <Card.Header className="bg-success">
                                        <div className="d-flex justify-content-between">
                                            <p className="h4 text-white">Shipping Address</p>
                                            <div>

                                                {
                                                    address && Object.keys(address).length > 0 ?
                                                        <>
                                                            <Link to={`/users/edit-shipping-address/${address._id}`}>
                                                                <Button variant={'primary'} className="me-2">
                                                                    <i className="bi bi-pencil-fill text-white"></i>
                                                                </Button>
                                                            </Link>
                                                            <Button variant={'danger'} className="me-2"
                                                                    onClick={() => clickDeleteAddress(address._id)}>
                                                                <i className="bi bi-trash-fill text-white"></i>
                                                            </Button>
                                                        </> :
                                                        <Link to={'/users/add-shipping-address'}>
                                                            <Button variant={'warning'} className="me-2">
                                                                <i className="bi bi-plus-circle-fill text-white"></i>
                                                            </Button>
                                                        </Link>
                                                }
                                            </div>
                                        </div>
                                    </Card.Header>
                                    {
                                        address && Object.keys(address).length > 0 &&
                                        <Card.Body>
                                            <ListGroup>
                                                <ListGroupItem>Mobile : <span
                                                    className="fw-bold">{address.mobile}</span></ListGroupItem>
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
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        </>
    );
};
export default UserProfile;