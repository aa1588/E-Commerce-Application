import React from 'react';
import prodImg from '../../../assets/img/noimg.png';
import {Col, Container, Row} from "react-bootstrap";

const NoProductFound = () => {
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <img src={prodImg} alt="" className="m-auto text-center d-block"/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default NoProductFound;