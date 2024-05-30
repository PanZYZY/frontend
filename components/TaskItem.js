import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onPress }) => (
    <TouchableOpacity onPress={() => onPress(task.id)}>
        <View style={styles.taskItem}>
            <Text>Title: {task.title}</Text>
            <Text>Description: {task.description}</Text>
            <Text>Due Date: {task.dueDate}</Text>
            <Text>Status: {task.status}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default React.memo(TaskItem);
