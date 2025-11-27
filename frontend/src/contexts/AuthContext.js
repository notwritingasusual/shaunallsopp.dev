import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? 'admin' : null); // Simplified user state

    const login = async (username, password) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, {
            username,
            password,
        });
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser('admin'); // Simplified
            localStorage.setItem('authTokens', JSON.stringify(response.data));
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                if (authTokens) {
                    config.headers['Authorization'] = `Bearer ${authTokens.access}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, [authTokens]);

    const contextData = {
        user,
        authTokens,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
