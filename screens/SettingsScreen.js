import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFontSize } from '../context/FontSizeContext';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';

const SettingsScreen = ({ navigation }) => {
    const { fontSize, updateFontSize } = useFontSize();
    const { logout } = useAuth();
    const [isLargeFont, setIsLargeFont] = useState(fontSize > 16);
    const { toggleTheme, themeValues, theme } = useTheme();

    useEffect(() => {
        setIsLargeFont(fontSize > 16);
    }, [fontSize]);

    const handleLogout = async () => {
        await logout();
        navigation.navigate('Login'); // Navigate to login screen
    };

    const handleFontSizeToggle = (value) => {
        setIsLargeFont(value);
        const newFontSize = value ? 30 : 16;
        updateFontSize(newFontSize);
    };

    return (
        <View style={[styles.container, { backgroundColor: themeValues.background }]}>
            <View style={styles.settingRow}>
                <Text style={[styles.label, { fontSize, color: themeValues.text }]}>Enable Large Font</Text>
                <Switch
                    value={isLargeFont}
                    onValueChange={handleFontSizeToggle}
                />
            </View>
            <View style={styles.settingRow}>
                <Text style={[styles.label, { fontSize, color: themeValues.text }]}>Dark Mode</Text>
                <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
            <View style={styles.logoutButton}>
                <CustomButton title="Logout" onPress={handleLogout} color={themeValues.primary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    label: {
        marginVertical: 10,
    },
    LogoutButton: {
        marginTop: 20,
        alignSelf: 'center',
        width: '100%',
    },
});

export default SettingsScreen;








