import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Task Manager</Text>
            <Text>This app helps you manage your tasks and schedule.</Text>
            <Text>Open Source Licenses:</Text>
            <Text>- React Native</Text>
            <Text>- Expo</Text>
            {/* List other licenses */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
});

export default AboutScreen;
