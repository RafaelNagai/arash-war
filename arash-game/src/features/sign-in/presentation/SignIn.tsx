import React, { FormEvent, useState } from "react";
import { useAuth } from "../../../core/authentication/AuthContext";
import RoutePath from "../../../core/router/Routes";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate(RoutePath.home);
        } catch (error: any) {
            alert(error.message);
        }
    };

    return <>
        <div className="flex h-screen justify-center items-center">
            <div className="grid place-items-center">
                <img src="arash-game-logo.png" className="h-64 mb-10" />        
                <div className="flex flex-row font-bold text-2xl m-3">SIGN IN</div>
                <div className="bg-indigo-50 mr-5 ml-5 bg-opacity-40 rounded-lg p-3 inline-block">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 p-4">
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
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Log In
                        </button>
                    </form>
                </div>
                <div className="p-3">
                    <p>if not, <a href={RoutePath.register} className="text-red-700 font-bold">register here</a></p>
                </div>
            </div>
        </div>
    </>;
}

export default SignIn;