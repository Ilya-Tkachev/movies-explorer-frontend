import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { HOME } from '../../utils/Constants';

function ProtectedRoute({ component: Component, ...props }) {
    return (
        <Route>
            {() => props.isLoggedIn === true ? <Component {...props} /> : <Redirect to={HOME} />}
        </Route>
    );
}

export default ProtectedRoute;