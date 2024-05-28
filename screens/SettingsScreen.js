import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
    const [fontSize, setFontSize] = useState('medium');

    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('settings', JSON.stringify({ fontSize }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button title="Increase Font Size" onPress={() => setFontSize('large')} />
            <Button title="Save Settings" onPress={saveSettings} />
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

export default SettingsScreen;
