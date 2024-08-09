import React, {useEffect, useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as categoryActions from "../../../../redux/categories/category.actions";
import * as categoryReducer from "../../../../redux/categories/category.reducer";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/SpinnerUI";
import {CategoryView, SubCategoryView} from "../../models/CategoryView";

const AddCategory = () => {

    // get categories data from redux
    const categoryState: categoryReducer.InitialState = useSelector((state: RootState) => {
        return state[categoryReducer.categoryFeatureKey];
    });

    let {loading, categories} = categoryState;

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const [subCategories, setSubCategories] = useState<SubCategoryView[]>([] as SubCategoryView[]);
    const [categoryId, setCategoryId] = useState<string>("");
    const [subCategory, setSubCategory] = useState<SubCategoryView>({
        name: "",
        description: ""
    });

    useEffect(() => {
        dispatch(categoryActions.getAllCategoriesAction());
    }, [])

    const selectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(event.target.value);
        if (categories.length > 0) {
            let category: CategoryView | undefined = categories.find(category => category._id?.toString() === event.target.value);
            if (category) {
                setSubCategories(category.subCategories);
            } else {
                setSubCategories([] as SubCategoryView[])
            }
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(categoryActions.createSubCategoryAction({
                sub: subCategory,
                categoryId: categoryId
            })).then((response: any) => {
                if (!response.error) {
                    dispatch(categoryActions.getAllCategoriesAction());
                    setCategoryId("")
                    setSubCategory({
                        name: "",
                        description: ""
                    })
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
            <LayoutHeading heading={'Add Sub Category'} color={'text-success'} icon={'bi-diagram-2'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                {
                                    categories && categories.length > 0 &&
                                    <Form.Select required onChange={e => selectCategory(e)}>
                                        <option value="">Select a Category</option>
                                        {
                                            categories.map(category => {
                                                return (
                                                    <option key={category._id}
                                                            value={category._id}>{category.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                }
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={'name'}
                                    value={subCategory.name}
                                    onChange={e => setSubCategory({...subCategory, name: e.target.value})}
                                    type={'text'} placeholder={'Sub Category'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    name={'description'}
                                    value={subCategory.description}
                                    onChange={e => setSubCategory({...subCategory, description: e.target.value})}
                                    placeholder={'Description'} as="textarea" rows={3} required/>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant="success" type="submit">Create
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <p className="fw-bold">Available Sub Categories</p>
                        <ListGroup>
                            {
                                subCategories && subCategories.map(sub => {
                                    return (
                                        <ListGroupItem key={sub._id}>{sub.name}</ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default AddCategory;