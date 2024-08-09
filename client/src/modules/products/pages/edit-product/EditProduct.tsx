import React, {useEffect, useRef, useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as categoryReducer from "../../../../redux/categories/category.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {CategoryView, SubCategoryView} from "../../../categories/models/CategoryView";
import * as categoryActions from "../../../../redux/categories/category.actions";
import {ProductRequestView} from "../../models/ProductRequestView";
import {UploadImageWidget} from "../../../../util/UploadImageWidget";
import * as productActions from "../../../../redux/products/product.actions";
import * as productReducer from "../../../../redux/products/product.reducers";
import SpinnerUI from "../../../ui/components/SpinnerUI";

const EditProduct = () => {
    const {productId} = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();
    const [validated, setValidated] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<SubCategoryView[]>([] as SubCategoryView[]);
    const [categoryId, setCategoryId] = useState<string>("");
    const [subCategoryId, setSubCategoryId] = useState<string>("");
    const [product, setProduct] = useState<ProductRequestView>({
        title: "",
        description: "",
        imageUrl: "",
        brand: "",
        price: "",
        quantity: "",
        categoryId: "",
        subCategoryId: ""
    } as ProductRequestView);

    // get categories data from redux
    const categoryState: categoryReducer.InitialState = useSelector((state: RootState) => {
        return state[categoryReducer.categoryFeatureKey];
    });

    // get the product information from redux
    const productState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    })

    const {loading, product: reduxProduct} = productState;

    let {categories} = categoryState;

    const selectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct({...product, categoryId: event.target.value})
        if (categories.length > 0) {
            let category: CategoryView | undefined = categories.find(category => category._id?.toString() === event.target.value);
            if (category) {
                setSubCategories(category.subCategories);
            } else {
                setSubCategories([] as SubCategoryView[])
            }
        }
    };

    const selectSubCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct({...product, subCategoryId: event.target.value})
    };

    const updateProductInput = (event: React.ChangeEvent<HTMLInputElement | any>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    };

    useEffect(() => {
        dispatch(categoryActions.getAllCategoriesAction());
        // upload Image
        UploadImageWidget.upload(cloudinaryRef, widgetRef).then((imageUrl) => {
            if (imageUrl) {
                setProduct({...product, imageUrl: imageUrl.toString()})
            }
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });
    }, [])

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductAction({productId: productId}));
        }
    }, [productId]);

    useEffect(() => {
        if (reduxProduct) {
            setProduct({
                ...product,
                title: reduxProduct.title ? reduxProduct.title : "",
                description: reduxProduct.description ? reduxProduct.description : "",
                imageUrl: reduxProduct.imageUrl ? reduxProduct.imageUrl : "",
                brand: reduxProduct.brand ? reduxProduct.brand : "",
                price: reduxProduct.price ? reduxProduct.price : "",
                quantity: reduxProduct.quantity ? reduxProduct.quantity : "",
                categoryId: reduxProduct.categoryObj?._id ? reduxProduct.categoryObj?._id : "",
                subCategoryId: reduxProduct.subCategoryObj?._id ? reduxProduct.subCategoryObj?._id : "",
            })
        }
    }, [reduxProduct])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true && productId !== "") {
            dispatch(productActions.updateProductAction({
                product: product,
                productId: productId
            })).then((response: any) => {
                if (!response.error) {
                    navigate('/products/manage');
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
            <LayoutHeading heading={'Edit Products'} color={'text-primary'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Button type="button" variant={'warning'}
                                        onClick={() => widgetRef.current.open()}>
                                    <i className="bi bi-pencil-square"></i> Select Image</Button>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                {
                                    categories && categories.length > 0 &&
                                    <Form.Select disabled required onChange={e => selectCategory(e)}>
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
                            {
                                subCategories && subCategories.length > 0 &&
                                <Form.Group className="mb-2">
                                    <Form.Select disabled required onChange={e => selectSubCategory(e)}>
                                        <option value="">Select a SubCategory</option>
                                        {
                                            subCategories.map(subCategory => {
                                                return (
                                                    <option key={subCategory._id}
                                                            value={subCategory._id}>{subCategory.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            }
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={'title'}
                                    value={product.title}
                                    onChange={e => updateProductInput(e)}
                                    type={'text'} placeholder={'Title'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={'brand'}
                                    value={product.brand}
                                    onChange={e => updateProductInput(e)}
                                    type={'text'} placeholder={'Brand'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={'price'}
                                    value={product.price}
                                    onChange={e => updateProductInput(e)}
                                    type={'number'} placeholder={'Price'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={'quantity'}
                                    value={product.quantity}
                                    onChange={e => updateProductInput(e)}
                                    type={'number'} placeholder={'Quantity'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={'description'}
                                    value={product.description}
                                    onChange={e => updateProductInput(e)}
                                    as="textarea" rows={3} placeholder={'Description'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant="success" type="submit">
                                    Update Product
                                </Button>
                                <Link to={'/products/manage'} className="btn btn-dark ms-2">Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={3}>
                        {
                            product && product.imageUrl.length > 0 &&
                            <img src={product.imageUrl} alt="" className="img-fluid shadow-lg rounded-3"/>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default EditProduct