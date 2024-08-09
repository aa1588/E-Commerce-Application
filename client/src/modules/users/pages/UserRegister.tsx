import React, {useState} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {UserView} from "../models/UserView";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import * as userActions from '../../../redux/users/user.actions';
import * as userReducer from '../../../redux/users/user.reducer';
import {useSelector} from "react-redux";
import {userFeatureKey} from "../../../redux/users/user.reducer";
import SpinnerUI from "../../ui/components/SpinnerUI";

const UserRegister = () => {

    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userFeatureKey]
    })

    let {loading} = userState;

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    let [user, setUser] = useState<UserView>({
        username: "",
        email: "",
        password: ""
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
            dispatch(userActions.registerUserAction(user)).then((response: any) => {
                if (!response.error) {
                    navigate("/users/login");
                }
            });
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
            <LayoutHeading heading={'Register Here'} color={'text-success'} icon={'bi-person-add'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"[a-zA-Z0-9]{4,10}"}
                                    value={user.username}
                                    onChange={updateInput}
                                    name={'username'}
                                    type={'text'} placeholder={'Username'}></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid username.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={user.email}
                                    onChange={updateInput}
                                    name={'email'}
                                    type={'email'} placeholder={'Email'}></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"}
                                    value={user.password}
                                    onChange={updateInput}
                                    name={'password'}
                                    type={'password'} placeholder={'Password'}></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant="success" type="submit">
                                    Register
                                </Button>
                                <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                            </Form.Group>
                        </Form>
                        <small>Already have an account ?
                            <Link to={'/users/login'}
                                  className="text-decoration-none fw-bold text-success"> Login</Link>
                        </small>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default UserRegister;