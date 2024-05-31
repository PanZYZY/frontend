import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FontSizeContext = createContext();
const defaultFontSize = 16;  // Define default font size here

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(defaultFontSize);

    useEffect(() => {
        const loadFontSize = async () => {
            try {
                const savedFontSize = await AsyncStorage.getItem('fontSize');
                if (savedFontSize !== null) {
                    setFontSize(parseInt(savedFontSize, 10));
                }
            } catch (error) {
                console.error('Failed to load font size:', error);
            }
        };

        loadFontSize();
    }, []);

    useEffect(() => {
        const saveFontSize = async () => {
            try {
                await AsyncStorage.setItem('fontSize', fontSize.toString());
            } catch (error) {
                console.error('Failed to save font size:', error);
            }
        };

        saveFontSize();
    }, [fontSize]);

    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 2);
    };

    const resetFontSize = () => {
        setFontSize(defaultFontSize);
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, resetFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => {
    return useContext(FontSizeContext);
};
