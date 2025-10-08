import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { AppUserResponse } from "../types/response/AppUserResponse";
import { findMe } from "../api/AppUserAPI";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    login: (tok: string) => void;
    logout: () => void;
    appUser: AppUserResponse | null;
    getMe: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("jwt")
    );
    const [appUser, setAppUser] = useState<AppUserResponse | null>(null);
    const navigate = useNavigate();


    const getMe = async () => {
        const response = await findMe();
        setAppUser(response)
    }


    const logoutTimer = useRef<number | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                logout();
                return;
            }

            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));

                // If token already expired, log out immediately
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                    return;
                }

                // Fetch user info
                await getMe();

                const remainingTime = decoded.exp * 1000 - Date.now();

                // Clear any existing timer
                if (logoutTimer.current) {
                    clearTimeout(logoutTimer.current);
                }

                // Set a new timer
                logoutTimer.current = window.setTimeout(() => {
                    logout();
                    alert("Your session has expired. Please log in again.");
                    logoutTimer.current = null;
                }, remainingTime);

            } catch (e) {
                console.error("Invalid token", e);
                logout();
            }
        };

        checkAuth();

        return () => {
            if (logoutTimer.current) {
                clearTimeout(logoutTimer.current);
                logoutTimer.current = null;
            }
        };
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
    }

    const logout = () => {
        setToken(null);
        setAppUser(null);
        sessionStorage.removeItem("jwt");
        navigate('/')
    };

    return (
        <>
            <AuthContext.Provider value={{ token, login, logout, appUser, getMe }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}