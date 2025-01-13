import React from "react";
import { useAuth } from "../authentication/AuthContext";
import { Navigate, Route } from "react-router-dom";
import RoutePath from "./Routes";

interface IProtectedRoute {
    element: JSX.Element,
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to={RoutePath.login} />;
}

export default ProtectedRoute;