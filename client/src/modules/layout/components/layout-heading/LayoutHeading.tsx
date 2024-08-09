import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

interface IProps {
    heading: string;
    color: string;
    icon?: string;
}

const LayoutHeading: React.FC<IProps> = ({heading, color, icon}) => {
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <p className={`h3 ${color}`}>
                            <i className={`bi ${icon}`}></i> {heading}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
                            consequuntur culpa cum cumque eum id impedit laborum quos totam, unde. Blanditiis ducimus ea
                            excepturi iusto, officia quam rerum tenetur vitae. Alias atque blanditiis dolorum laboriosam
                            optio sequi totam voluptatem voluptates?</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default LayoutHeading;