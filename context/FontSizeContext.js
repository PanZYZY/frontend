import React, { createContext, useState, useContext } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);

    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 2);
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => {
    return useContext(FontSizeContext);
};