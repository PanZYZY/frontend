import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const TaskItem = ({ task, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(task.id)}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>description: {task.description}</Text>
            <Text style={styles.dueDate}>due date: {task.dueDate}</Text>
            <Text style={styles.status}>status: {task.status}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
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

