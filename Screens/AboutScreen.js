import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';

const AboutScreen = () => {
    const { fontSize } = useFontSize();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.heading, { fontSize: fontSize + 4 }]}>About This App</Text>
            <Text style={[styles.text, { fontSize }]}>
                This app helps you to manage your tasks and schedule efficiently.
                You can add, update, and delete tasks. With the calendar view, you can check your busy days at a glance.
            </Text>
            <Text style={[styles.heading, { fontSize: fontSize + 4 }]}>Open Source Licenses</Text>
            <Text style={[styles.text, { fontSize }]}>This app uses the following open source libraries:</Text>
            <Text style={[styles.text, { fontSize }]}>Front end: </Text>
            <Text style={[styles.license, { fontSize }]}>- React Native</Text>
            <Text style={[styles.license, { fontSize }]}>- Expo</Text>
            <Text style={[styles.license, { fontSize }]}>- React Navigation</Text>
            <Text style={[styles.text, { fontSize }]}>Back end:</Text>
            <Text style={[styles.license, { fontSize }]}>- express</Text>
            <Text style={[styles.license, { fontSize }]}>- mySQL</Text>
            <Text style={[styles.license, { fontSize }]}>- Axios</Text>
            <Text style={[styles.license, { fontSize }]}>- Cors</Text>
            <Text style={[styles.license, { fontSize }]}>- bcrypt</Text>
            <Text style={[styles.license, { fontSize }]}>- Sequelize</Text>
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
    text: {
        marginTop: 10,
        marginBottom: 5,
        color: '#666',
    },
    license: {
        marginBottom: 5,
        color: '#333',
    },
});

export default AboutScreen;

