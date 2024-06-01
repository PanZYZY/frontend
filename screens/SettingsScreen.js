import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';
import { useAuth } from '../context/AuthContext';

const SettingsScreen = ({ navigation }) => {
    const { fontSize, updateFontSize } = useFontSize();
    const { logout } = useAuth();
    const [isLargeFont, setIsLargeFont] = useState(fontSize > 16);

    useEffect(() => {
        setIsLargeFont(fontSize > 16);
    }, [fontSize]);

    const handleFontSizeToggle = (value) => {
        setIsLargeFont(value);
        const newFontSize = value ? 30 : 16;
        updateFontSize(newFontSize);
    };

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={[styles.label, { fontSize }]}>Enable Large Font</Text>
                <Switch
                    value={isLargeFont}
                    onValueChange={handleFontSizeToggle}
                />
            </View>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'Top',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
});

export default SettingsScreen;








