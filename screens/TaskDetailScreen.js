import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const TaskDetailScreen = ({ navigation, route }) => {
    const { taskId } = route.params;
    const { user, token } = useAuth();
    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    const fetchTask = async () => {
        try {
            const response = await api.get(`/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const task = response.data;
            setTask(task);
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate);
            setStatus(task.status);
        } catch (error) {
            console.error('Error fetching task:', error);
            Alert.alert('Error', 'Could not fetch task');
        }
    };

    const handleUpdateTask = async () => {
        try {
            const updatedTask = {
                ...task,
                title: title,
                description: description,
                dueDate: dueDate,
                status: status,
                userId: user.id
            };
            const response = await api.put(`/tasks/${taskId}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Debugging log
            //console.log('Updated Task Data:', response.data);
            Alert.alert('Task updated successfully!');
            navigation.navigate('TasksHome', { updatedTask: response.data });
        } catch (error) {
            console.error('Error updating task:', error);
            Alert.alert('Error', 'Could not update task');
        }
    };

    const handleDeleteTask = async () => {
        try {
            await api.delete(`/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Alert.alert('Task deleted successfully!');
            navigation.navigate('TasksHome', { deletedTaskId: taskId });
        } catch (error) {
            console.error('Error deleting task:', error);
            Alert.alert('Error', 'Could not delete task');
        }
    };

    if (!task) return null;

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
            <Button title="Delete Task" onPress={handleDeleteTask} />
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


