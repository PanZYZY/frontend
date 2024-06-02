import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { FontSizeProvider } from './context/FontSizeContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from './utils/themes';

const MainApp = () => {
    const { themeValues } = useTheme();

    const navTheme = {
        dark: themeValues.background === darkTheme.background,
        colors: {
            background: themeValues.background,
            card: themeValues.card,
            text: themeValues.text,
            border: themeValues.border,
            primary: themeValues.primary,
        },
    };

    return (
        <NavigationContainer theme={navTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <FontSizeProvider>
                    <MainApp />
                </FontSizeProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;


