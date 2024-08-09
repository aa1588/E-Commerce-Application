import React from 'react';
import {Navigate} from 'react-router-dom';
import {TokenUtil} from "../util/TokenUtil";

function PrivateRoute({children}: any) {
    const auth = TokenUtil.isLoggedIn();
    return auth ? children : <>
        <Navigate to="/users/login"/>
    </>;
}

export default PrivateRoute;