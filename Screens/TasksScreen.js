import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Button, FlatList, Alert } from 'react-native';
import api from '../utils/api';
import TaskItem from '../components/TaskItem';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const TasksScreen = ({ navigation, route }) => {
    const [tasks, setTasks] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
        if (user && token) {
        fetchTasks();
        }
    }, [user, token]);

    // Hook for adding new task
    useEffect(() => {
        if (route.params?.newTask) {
            console.log('New Task added:', route.params.newTask);
            const newTask = route.params.newTask;
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }
    }, [route.params?.newTask]);

    // Hook when updating task
    useEffect(() => {
        if (route.params?.updatedTask) {
            console.log('Updated Task:', route.params.updatedTask);
            const updatedTask = route.params.updatedTask;
            setTasks((prevTasks) => 
                prevTasks.map(task => 
                        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                )
            );
        }
    }, [route.params?.updatedTask]);

    // Hook for deleting task
    useEffect(() => {
        if (route.params?.deletedTaskId) {
            console.log('Deleted Task ID:', route.params.deletedTaskId);
            const deletedTaskId = route.params.deletedTaskId;
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== deletedTaskId));
        }
    }, [route.params?.deletedTaskId]);

    // Fetch task function
    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: {userId: user.id }
                });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Alert.alert('Error', 'Could not fetch tasks');
        }
    };

    // Go to detail when pressed on task
    const handlePressTask = useCallback((taskId) => {
        navigation.navigate('TaskDetail', { taskId });
    }, [navigation]);

    const renderTask = useCallback(({ item }) => (
        <TaskItem task={item} onPress={handlePressTask} />
    ), [handlePressTask]);

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id.toString()}
                removeClippedSubviews={true} // This will help improve performance
                initialNumToRender={10} // Reduce initial render amount
                maxToRenderPerBatch={10} // Increase the amount of render per batch
                windowSize={21} // Increase the window size
            />
            <CustomButton
                title="Add Task"
                onPress={() => navigation.navigate('AddTask', { userId: user.id })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TasksScreen;



