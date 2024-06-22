import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils";

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/auth/check`, { withCredentials: true });
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                console.error('Error checking authentication', error);
                setIsAuthenticated(false);
            } 
        };

        checkAuth();
    }, []);


    // Optional: Log authentication status
    useEffect(() => {
        if (isAuthenticated !== null) {
            if (isAuthenticated) {
                console.log("User is authenticated");
            } else {
                console.log("User is not authenticated");
            }
        }
    }, [isAuthenticated]);

    // Render based on authentication status
    if (isAuthenticated === null) {
        // Loading state, you can optionally render a loading indicator
        return <div>Loading...</div>;
    } else if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    } else {
        // Render protected content if authenticated
        return <Outlet />;
    }
};

export default ProtectedRoutes;
