import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const ProductsNavBar = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" variant={'light'}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to={'/'} className="nav-link">Fashion</Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Link to={'/'} className="nav-link">Electronics</Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Link to={'/'} className="nav-link">House Hold</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
export default ProductsNavBar;