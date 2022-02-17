import React from 'react';
import {Route, Navigate, useLocation} from 'react-router-dom';

import {useAuthContext} from './AuthContext'

// Must be logged in to visit any page wrapped by this component;
export const RequireAuth = ({children}) => {
    const {loggedIn} = useAuthContext();
    const location = useLocation();

    if (!loggedIn) {
        return <Navigate to={"/login"} state={{from: location}} />
    }

    return children;
}