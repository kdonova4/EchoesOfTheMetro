import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AppUserResponse } from "../types/response/AppUserResponse";
import { findMe } from "../api/AppUserAPI";

interface AuthContextType {
    token: string | null;
    login: (tok: string) => void;
    logout: () => void;
    appUser: AppUserResponse | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null> (
        sessionStorage.getItem("jwt")
    );
    const [appUser, setAppUser] = useState<AppUserResponse | null>(null);


    const getMe = async () => {
        const response = await findMe();
        setAppUser(response)
    }

    useEffect(() => {
        let timeoutId: number | undefined;

        const checkAuth = async () => {
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));

                    // If token already expired, log out immediately
                    if (decodedToken.exp * 1000 < Date.now()) {
                        logout();
                        return;
                    }

                    // Fetch user info
                    await getMe();

                    // Calculate remaining time until token expiration
                    const remainingTime = decodedToken.exp * 1000 - Date.now();

                    // Set a timeout to auto-logout when the token expires
                    timeoutId = window.setTimeout(() => {
                        logout();
                        alert("Your session has expired. Please log in again.");
                    }, remainingTime);

                    sessionStorage.setItem("jwt", token);
                } catch (e) {
                    console.error("Invalid Token", e);
                    logout();
                }
            } else {
                setAppUser(null);
                sessionStorage.removeItem("jwt");
            }
        };

        checkAuth();

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
    }

    const logout = () => {
        setToken(null);
        setAppUser(null);
        sessionStorage.removeItem("jwt");
    };

    return(
        <>
            <AuthContext.Provider value={{ token, login, logout, appUser }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}