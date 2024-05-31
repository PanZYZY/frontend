import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const { fontSize, increaseFontSize } = useFontSize();
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize }}>This is the settings screen</Text>
            <Button title="Increase Font Size" onPress={increaseFontSize} />
            <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default SettingsScreen;
