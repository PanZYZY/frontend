import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import api from '../utils/api';
import TaskItem from '../components/TaskItem';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFontSize } from '../context/FontSizeContext';

const TasksScreen = ({ navigation, route }) => {
    const { fontSize } = useFontSize();
    const [tasks, setTasks] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, [user]);

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
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId: user.id },
            });
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
            />
            <CustomButton
                title="Add Task"
                onPress={() => navigation.navigate('AddTask', { userId: user.id })}
                icon={<Icon name="add" size={20} color="#fff" />}
                style={styles.addButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'left',
        alignItems: 'left',
        backgroundColor: '#f5f5f5',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: "orange",
        borderRadius: 50,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'right',
    },
});

export default TasksScreen;




