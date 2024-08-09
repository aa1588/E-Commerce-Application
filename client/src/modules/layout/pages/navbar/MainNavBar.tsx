import React from 'react';
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import * as userReducer from "../../../../redux/users/user.reducer";
import * as cartReducer from "../../../../redux/cart/cart.reducer";
import {userLogOutAction} from "../../../../redux/users/user.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

const MainNavBar = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    // get cart count from redux
    const cartState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    })

    const {products} = cartState;

    let {isAuthenticated, user} = userState;

    const clickLogOut = () => {
        navigate("/");
        dispatch(userLogOutAction());
    };

    const navigateTo = (path: string) => {
        navigate(path);
    };

    return (
        <>
            <Navbar bg="success" expand="lg" variant={'dark'}>
                <Container>
                    <Navbar.Brand>
                        <Link to={'/'} className="text-white text-decoration-none">React E-Commerce</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            isAuthenticated &&
                            <>
                                <Nav className="">
                                    <Link to={'/products/fashion'} className="nav-link">Fashion</Link>
                                </Nav>
                                <Nav className="">
                                    <Link to={'/products/electronics'} className="nav-link">Electronics</Link>
                                </Nav>
                                <Nav className="">
                                    <Link to={'/products/household'} className="nav-link">Household</Link>
                                </Nav>
                                {
                                    user && user.isAdmin &&
                                    <Nav>
                                        <NavDropdown title={"Admin"} id="basic-nav-dropdown"
                                                     className="text-white">
                                            {
                                                user && user.isSuperAdmin &&
                                                <NavDropdown.Item
                                                    onClick={() => navigateTo("/categories/add")}>Add
                                                    Categories</NavDropdown.Item>
                                            }
                                            {
                                                user && user.isAdmin &&
                                                <NavDropdown.Item
                                                    onClick={() => navigateTo("/products/upload")}>Upload
                                                    Products</NavDropdown.Item>
                                            }
                                            {
                                                user && user.isAdmin && user.isSuperAdmin &&
                                                <>
                                                    <NavDropdown.Divider/>
                                                    <NavDropdown.Item
                                                        onClick={() => navigateTo("/products/manage")}>Manage
                                                        Products</NavDropdown.Item>
                                                    <NavDropdown.Item
                                                        onClick={() => navigateTo("/orders/manage")}>Manage
                                                        Orders</NavDropdown.Item>
                                                </>
                                            }
                                        </NavDropdown>
                                    </Nav>
                                }
                            </>
                        }


                        {
                            isAuthenticated ?
                                <>
                                    <div className="d-flex ms-auto">
                                        <Nav className="">
                                            <Link to={'/cart/list'} className="nav-link">
                                                <div className="cart-wrapper">
                                                    <i className="bi bi-cart-fill"></i>
                                                    <span className="cart-count">{products && products.length}</span>
                                                </div>
                                            </Link>
                                        </Nav>
                                        <Nav>
                                            <img src={user.imageUrl} width={25} height={25}
                                                 className="rounded-circle shadow-lg mt-2" alt=""/>
                                            <NavDropdown title={user.username} id="basic-nav-dropdown"
                                                         className="text-white">
                                                <NavDropdown.Item
                                                    onClick={() => navigateTo("/users/profile")}>Profile</NavDropdown.Item>
                                                <NavDropdown.Item
                                                    onClick={() => navigateTo("/users/change-password")}>Change
                                                    Password</NavDropdown.Item>
                                                <NavDropdown.Item
                                                    onClick={() => navigateTo("/orders/me")}>My
                                                    Orders</NavDropdown.Item>
                                                <NavDropdown.Divider/>
                                                <NavDropdown.Item onClick={clickLogOut}>
                                                    <i className="bi bi-power"></i> LogOut
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </div>
                                </> :
                                <Nav className="d-flex ms-auto">
                                    <Link to={'/users/login'} className="nav-link">Login</Link>
                                </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
export default MainNavBar;