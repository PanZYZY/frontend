import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';
import { useTheme } from '../context/ThemeContext';

const TaskItem = ({ task, onPress }) => {
    const { fontSize } = useFontSize();
    const { themeValues } = useTheme();

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: themeValues.background }]} onPress={() => onPress(task.id)}>
            <Text style={[styles.title, { fontSize }]}>{task.title}</Text>
            <Text style={[styles.description, { fontSize }]}>description: {task.description}</Text>
            <Text style={[styles.dueDate, { fontSize }]}>due date: {task.dueDate}</Text>
            <Text style={[styles.status, { fontSize }]}>status: {task.status}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },
    dueDate: {
        fontSize: 14,
        color: 'gray',
    },
    status: {
        fontSize: 14,
        color: 'gray',
    },
});

export default TaskItem;

