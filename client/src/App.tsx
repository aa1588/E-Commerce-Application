import React, {useEffect} from 'react';
import './App.css';
import ToastConfiguration from "./modules/ui/components/ToastConfiguration";
import HomePage from "./modules/layout/pages/home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLogin from "./modules/users/pages/UserLogin";
import UserRegister from "./modules/users/pages/UserRegister";
import UserProfile from "./modules/users/pages/UserProfile";
import {AppDispatch, useAppDispatch} from "./redux/store";
import * as userActions from "./redux/users/user.actions";
import ChangePassword from "./modules/users/pages/ChangePassword";
import AddCategory from "./modules/categories/pages/add-category/AddCategory";
import {AuthUtil} from "./util/AuthUtil";
import UploadProduct from "./modules/products/pages/upload-product/UploadProduct";
import ManageProducts from "./modules/products/pages/manage-products/ManageProducts";
import EditProduct from "./modules/products/pages/edit-product/EditProduct";
import FashionCatalogue from "./modules/products/pages/catalogues/fashion-catalogue/FashionCatalogue";
import ElectronicsCatalogue from "./modules/products/pages/catalogues/electronics-catalogue/ElectronicsCatalogue";
import HouseholdCatalogue from "./modules/products/pages/catalogues/household-catalogue/HouseholdCatalogue";
import ViewProduct from "./modules/products/pages/view-product/ViewProduct";
import CartPage from "./modules/cart/pages/CartPage";
import CheckOutPage from "./modules/cart/pages/CheckOutPage";
import AddShippingAddress from "./modules/users/pages/AddShippingAddress";
import EditShippingAddress from "./modules/users/pages/EditShippingAddress";
import OrderDetails from "./modules/orders/pages/OrderDetils";
import YourOrders from "./modules/orders/pages/YourOrders";
import ManageOrders from "./modules/orders/pages/ManageOrders";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import SuperAdminRoute from "./router/SuperAdminRoute";

const App: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        if (AuthUtil.setTokenToRequestHeader()) {
            dispatch(userActions.getUserInformationAction());
        }
    }, [])

    return (
        <>
            <ToastConfiguration/>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/products/fashion'} element={
                        <PrivateRoute>
                            <FashionCatalogue/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/electronics'} element={
                        <PrivateRoute>
                            <ElectronicsCatalogue/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/household'} element={
                        <PrivateRoute>
                            <HouseholdCatalogue/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/upload'} element={
                        <AdminRoute>
                            <UploadProduct/>
                        </AdminRoute>
                    }/>
                    <Route path={'/products/edit/:productId'} element={
                        <AdminRoute>
                            <EditProduct/>
                        </AdminRoute>
                    }/>
                    <Route path={'/products/view/:categoryName/:productId'} element={
                        <PrivateRoute>
                            <ViewProduct/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/manage'} element={
                        <SuperAdminRoute>
                            <ManageProducts/>
                        </SuperAdminRoute>
                    }/>
                    <Route path={'/users/login'} element={<UserLogin/>}/>
                    <Route path={'/users/register'} element={<UserRegister/>}/>
                    <Route path={'/users/profile'} element={
                        <PrivateRoute>
                            <UserProfile/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/users/change-password'} element={
                        <PrivateRoute>
                            <ChangePassword/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/users/add-shipping-address'} element={
                        <PrivateRoute>
                            <AddShippingAddress/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/users/edit-shipping-address/:addressId'} element={
                        <PrivateRoute>
                            <EditShippingAddress/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/categories/add'} element={
                        <SuperAdminRoute>
                            <AddCategory/>
                        </SuperAdminRoute>
                    }/>
                    <Route path={'/cart/list'} element={
                        <PrivateRoute>
                            <CartPage/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/cart/checkout'} element={
                        <PrivateRoute>
                            <CheckOutPage/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/orders/details'} element={
                        <PrivateRoute>
                            <OrderDetails/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/orders/me'} element={
                        <PrivateRoute>
                            <YourOrders/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/orders/manage'} element={
                        <SuperAdminRoute>
                            <ManageOrders/>
                        </SuperAdminRoute>
                    }/>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
