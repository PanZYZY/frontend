import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api'; // Ensure this is imported correctly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storeToken = async () => {
            if (token) {
                await AsyncStorage.setItem('token', token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                await AsyncStorage.removeItem('token');
                delete api.defaults.headers.common['Authorization'];
            }
        };
        storeToken();
    }, [token]);

    const login = async (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
    };

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                const storedToken = await AsyncStorage.getItem('token');
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadAuthData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};




