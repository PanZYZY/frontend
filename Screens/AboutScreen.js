import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';

const AboutScreen = () => {
    const { fontSize } = useFontSize();
    return (
        <View style={styles.container}>
            <Text style={{ fontSize }}>About Task Manager</Text>
            <Text style={{ fontSize }}>This app helps you manage your tasks and schedule.</Text>
            <Text style={{ fontSize }}>Open Source Licenses:</Text>
            <Text style={{ fontSize }}>- React Native</Text>
            <Text style={{ fontSize }}>- Expo</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default AboutScreen;
