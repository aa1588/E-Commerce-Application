import React, {useState} from 'react';
import {Button, Form, ListGroup, Offcanvas} from "react-bootstrap";
import {SubCategoryView} from "../../categories/models/CategoryView";

interface IProps {
    subCategories: SubCategoryView[];
    filteredTheProducts: (subsList: SubCategoryView[]) => void;
    setSubCategories: React.Dispatch<React.SetStateAction<SubCategoryView[]>>
}

const ProductSideBar: React.FC<IProps> = ({subCategories, filteredTheProducts, setSubCategories}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const clickApply = () => {
        setShow(false);
        filteredTheProducts(subCategories);
    };

    const updateChecks = (event: any, id: string | undefined) => {
        if (id) {
            setSubCategories(subCategories.map(item => {
                if (item._id === id) {
                    return {
                        ...item,
                        isChecked: event.target.checked
                    }
                }
                return item;
            }))
        }
    };

    return (
        <>

            <Button variant="success" onClick={handleShow} className="m-2 filter-button">
                <i className="bi bi-sliders"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={'start'} style={{width: "300px"}}>
                <Offcanvas.Header closeButton className="bg-success text-white">
                    <Offcanvas.Title>Search Filters here</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bg-light-success text-white">
                    {
                        subCategories && Array.isArray(subCategories) && subCategories.length > 0 &&
                        <ListGroup>
                            {
                                subCategories && subCategories.map((subCategory) => {
                                    return (
                                        <ListGroup.Item key={subCategory._id}>
                                            <Form.Check
                                                checked={subCategory.isChecked}
                                                onChange={e => updateChecks(e, subCategory._id)}
                                                type={'checkbox'}
                                                label={subCategory.name}></Form.Check>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                    }
                    <Button variant={'success'} className={'m-2'} onClick={clickApply}>Apply</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
export default ProductSideBar;