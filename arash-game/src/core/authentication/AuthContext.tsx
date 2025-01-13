import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";


interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    signup: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = (email: string, password: string): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);
    const signup = (email: string, password: string): Promise<UserCredential> => createUserWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}