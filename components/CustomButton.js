import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';

const CustomButton = ({ title, onPress, color }) => {
    const { fontSize } = useFontSize();

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color || '#007BFF' }]}>
            <Text style={[styles.buttonText, { fontSize }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
    },
});

export default CustomButton;
