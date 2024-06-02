import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { FontSizeProvider } from './context/FontSizeContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from './utils/themes';

const MainApp = () => {
    const { theme } = useTheme();

    const navTheme = {
        dark: theme === 'dark',
        colors: {
            background: theme === 'dark' ? darkTheme.background : lightTheme.background,
            card: theme === 'dark' ? darkTheme.card : lightTheme.card,
            text: theme === 'dark' ? darkTheme.text : lightTheme.text,
            border: theme === 'dark' ? darkTheme.border : lightTheme.border,
            primary: theme === 'dark' ? darkTheme.primary : lightTheme.primary,
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

