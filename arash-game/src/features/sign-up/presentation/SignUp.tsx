import React, { FormEvent, useState } from "react";
import { useAuth } from "../../../core/authentication/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import RoutePath from "../../../core/router/Routes";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if(password !== confirmPassword) {
                alert("Different password! Please check your password.");
                return;
            }

            await signup(email, password);
            alert("SignUp in Successfully!");
            navigate(RoutePath.login);
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="grid place-items-center">     
                <div className="flex flex-row font-bold text-2xl m-3 text-blue-700">Let's Sign Up!!</div>
                <div className="bg-indigo-50 mr-5 ml-5 bg-opacity-40 rounded-lg p-3 inline-block">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 rounded" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 rounded" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border p-2 rounded" />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-5">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;