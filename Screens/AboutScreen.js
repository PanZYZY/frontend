import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';
import { useTheme } from '../context/ThemeContext';

const AboutScreen = () => {
    const { fontSize } = useFontSize();
    const { themeValues } = useTheme();

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeValues.background }]}>
            <Text style={[styles.heading, { fontSize: fontSize + 4 }]}>About This App</Text>
            <Text style={[styles.text, { fontSize }]}>
                This app helps you to manage your tasks and schedule efficiently.
                You can add, update, and delete tasks, as well as view them on a calendar.
            </Text>
            <Text style={[styles.heading, { fontSize: fontSize + 4 }]}>Open Source Licenses</Text>

            <Text style={[styles.subheading, { fontSize: fontSize + 2, color: themeValues.text }]}>Front End</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- React Native</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- Expo</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- Axios</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- React Navigation</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- AsyncStorage</Text>

            <Text style={[styles.subheading, { fontSize: fontSize + 2, color: themeValues.text }]}>Back End</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- Node.js</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- Express</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- Sequelize</Text>
            <Text style={[styles.license, { fontSize, color: themeValues.text }]}>- MySQL</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 25,
    },
    heading: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subheading: {
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#666',
    },
    text: {
        marginBottom: 15,
        color: '#666',
    },
    license: {
        marginBottom: 5,
        color: '#333',
    },
});

export default AboutScreen;


