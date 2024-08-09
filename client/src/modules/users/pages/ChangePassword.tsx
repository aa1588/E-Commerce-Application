import React, {useState} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {UserView} from "../models/UserView";
import * as userReducer from "../../../redux/users/user.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import {userFeatureKey, userLogOutAction} from "../../../redux/users/user.reducer";
import SpinnerUI from "../../ui/components/SpinnerUI";
import * as userActions from "../../../redux/users/user.actions";
import {ToastUtil} from "../../../util/ToastUtil";

interface Password {
    password: string;
    confirmPassword: string;
}

const ChangePassword = () => {

    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userFeatureKey]
    })

    let {loading} = userState;

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    let [user, setUser] = useState<Password>({
        password: "",
        confirmPassword: ""
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            if (user.password.trim() === user.confirmPassword.trim()) {
                dispatch(userActions.changePasswordAction(user.password)).then((response: any) => {
                    if (!response.error) {
                        navigate("/");
                        dispatch(userLogOutAction()); // auto-logOff once the password is changed
                    }
                });
            } else {
                ToastUtil.displayErrorToast("Both the passwords are not matched");
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
            <LayoutHeading heading={'Change Password'} color={'text-success'} icon={'bi-eye-slash-fill'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"}
                                    value={user.password}
                                    onChange={updateInput}
                                    name={'password'}
                                    type={'password'} placeholder={'New Password'}></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"}
                                    value={user.confirmPassword}
                                    onChange={updateInput}
                                    name={'confirmPassword'}
                                    type={'password'} placeholder={'Confirm Password'}></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant="success" type="submit">
                                    Update
                                </Button>
                                <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default ChangePassword;