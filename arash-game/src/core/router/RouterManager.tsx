import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../features/dashboard/presentation/Dashboard";
import SignIn from "../../features/sign-in/presentation/SignIn";
import SignUp from "../../features/sign-up/presentation/SignUp";
import RoutePath from "./Routes";
import ProtectedRoute from "./ProtectedRoute";

const RouterManager: React.FC = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path={RoutePath.home} element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path={RoutePath.login} element={<SignIn/>} />
                <Route path={RoutePath.register} element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
    </>
}

export default RouterManager;