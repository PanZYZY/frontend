import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Button, FlatList, Alert } from 'react-native';
import api from '../utils/api';
import TaskItem from '../components/TaskItem';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../context/CustomButton';

const TasksScreen = ({ navigation, route }) => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (route.params?.newTask) {
            const newTask = route.params.newTask;
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }
    }, [route.params?.newTask]);

    useEffect(() => {
        if (route.params?.updatedTask) {
            const updatedTask = route.params.updatedTask;
            setTasks((prevTasks) => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        }
    }, [route.params?.updatedTask]);

    useEffect(() => {
        if (route.params?.deletedTaskId) {
            const deletedTaskId = route.params.deletedTaskId;
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== deletedTaskId));
        }
    }, [route.params?.deletedTaskId]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/api/tasks', { params: { userId: user.id } });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Alert.alert('Error', 'Could not fetch tasks');
        }
    };

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



