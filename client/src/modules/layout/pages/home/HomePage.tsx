import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import * as userReducer from "../../../../redux/users/user.reducer";

const HomePage = () => {
    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    let {isAuthenticated} = userState;
    return (
        <>
            <div className="landing-page">
                <div className="landing-wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                        <p className="display-1 text-success">React E-Commerce</p>
                        <div>
                            {
                                isAuthenticated ?
                                    <Link to={'/products/fashion'} className="btn btn-success m-2">
                                        Start Shopping</Link> :
                                    <Link to={'/users/login'} className="btn btn-success m-2">
                                        <i className="bi bi-lock"></i> Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default HomePage;