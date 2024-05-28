import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Task Manager</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <SplashScreen />
        </NavigationContainer>
    );
}
