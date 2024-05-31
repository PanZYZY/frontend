import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Button, FlatList, Alert } from 'react-native';
import api from '../utils/api';
import TaskItem from '../components/TaskItem';

const TasksScreen = ({ navigation, route }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    //sync when new task is added
    useEffect(() => {
        if (route.params?.newTask) {
            const newTask = route.params.newTask;
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }
    }, [route.params?.newTask]);

    //sync when task is updated
    useEffect(() => {
        if (route.params?.updatedTask) {
            const updatedTask = route.params.updatedTask;
            setTasks((prevTasks) => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        }
    }, [route.params?.updatedTask]);

    //sync when task is deleted
    useEffect(() => {
        if (route.params?.deletedTaskId) {
            const deletedTaskId = route.params.deletedTaskId;
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== deletedTaskId));
        }
    }, [route.params?.deletedTaskId]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Alert.alert('Error', 'Could not fetch tasks');
        }
    };

    //When press on a task, direct to detail page
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
            <Button
                title="Add Task"
                onPress={() => navigation.navigate('AddTask')}
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


