import React, { FormEvent, useState } from "react";
import { useAuth } from "../../../core/authentication/AuthContext";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("Sign in Successfully!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Log In
            </button>
        </form>
    );
}

export default SignIn;