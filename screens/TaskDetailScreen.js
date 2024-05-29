import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api';

const TaskDetailScreen = ({ route, navigation }) => {
    const { taskId } = route.params;
    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        api.get(`/api/tasks/${taskId}`)
            .then(response => {
                const task = response.data;
                setTask(task);
                setTitle(task.title);
                setDescription(task.description);
                setDueDate(task.dueDate);
                setStatus(task.status);
            })
            .catch(error => {
                console.error('Error fetching task:', error);
                Alert.alert('Error', 'Could not fetch task details');
            });
    }, [taskId]);

    const handleUpdateTask = async () => {
        try {
            await api.put(`/api/tasks/${taskId}`, { title, description, dueDate, status });
            Alert.alert('Success', 'Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
            Alert.alert('Error', 'Could not update task');
        }
    };

    const handleDeleteTask = async () => {
        try {
            await api.delete(`/api/tasks/${taskId}`);
            Alert.alert('Success', 'Task deleted successfully');
            navigation.navigate('Tasks');
        } catch (error) {
            console.error('Error deleting task:', error);
            Alert.alert('Error', 'Could not delete task');
        }
    };

    if (!task) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={dueDate}
                onChangeText={setDueDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Status"
                value={status}
                onChangeText={setStatus}
            />
            <Button title="Update Task" onPress={handleUpdateTask} />
            <Button title="Delete Task" onPress={handleDeleteTask} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default TaskDetailScreen;
