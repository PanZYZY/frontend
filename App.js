import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { FontSizeProvider } from './context/FontSizeContext';

const App = () => {
    return (
        <FontSizeProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </FontSizeProvider>
    );
};

export default App;


