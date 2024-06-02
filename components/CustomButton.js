import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';

const CustomButton = ({ title, onPress, style, icon }) => {
    const { fontSize } = useFontSize();

    // use of customized button to change the style of default button
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {icon}
            <Text style={[styles.buttonText, { fontSize }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        padding: 5,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 5,
    },
});

export default CustomButton;
