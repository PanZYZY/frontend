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
        const updatedTaskData = {
            title,
            description,
            dueDate,
            status,
            userId: user.id
    };
        try {
            const response = await api.put(`/tasks/${taskId}`, updatedTaskData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Updated Task Data:', updatedTaskData); // Debugging log
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
                params: { userId: user.id } 
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
                value={task.title}
                onChangeText={(text) => setTask({ ...task, title: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={task.description}
                onChangeText={(text) => setTask({ ...task, description: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={task.dueDate}
                onChangeText={(text) => setTask({ ...task, dueDate: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Status"
                value={task.status}
                onChangeText={(text) => setTask({ ...task, status: text })}
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


