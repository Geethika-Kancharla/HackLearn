import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const firebase = useFirebase();
    const user = firebase.user;
    const role = firebase.role;

    if (!user) {
        // If user is not logged in, redirect to login
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(role)) {
        // If user does not have the required role, redirect to login
        return <Navigate to="/" />;
    }

    // If user is logged in and has the required role, render the children components
    return children;
};

export default ProtectedRoute;