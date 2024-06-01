import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const FontSizeContext = createContext();

// Provider component
export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        const loadFontSize = async () => {
            try {
                const savedFontSize = await AsyncStorage.getItem('fontSize');
                if (savedFontSize !== null) {
                    setFontSize(parseInt(savedFontSize, 10));
                }
            } catch (error) {
                console.error('Error loading font size:', error);
            }
        };
        loadFontSize();
    }, []);

    const updateFontSize = async (newFontSize) => {
        setFontSize(newFontSize);
        try {
            await AsyncStorage.setItem('fontSize', newFontSize.toString());
        } catch (error) {
            console.error('Error saving font size:', error);
        }
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, updateFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

// Custom hook to use the FontSizeContext
export const useFontSize = () => {
    return useContext(FontSizeContext);
};

