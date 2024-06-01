import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { FontSizeProvider } from './context/FontSizeContext';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <FontSizeProvider>
                    <RootNavigator />
                </FontSizeProvider>
            </AuthProvider>
        </NavigationContainer>
    );
};

export default App;


