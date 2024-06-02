import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, Text } from 'react-native';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import TaskItem from '../components/TaskItem';

const TaskListScreen = ({ route, navigation }) => {
    const { selectedDate } = route.params;
    const [tasks, setTasks] = useState([]);
    const { user, token } = useAuth();


    useEffect(() => {
        if (user && token) {
            fetchTasksForDate();
        }
    }, [selectedDate, user, token]);

    const fetchTasksForDate = async () => {
        try {
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId: user.id }
            });
            const tasksForDate = response.data.filter(task => task.dueDate === selectedDate);
            setTasks(tasksForDate);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Alert.alert('Error', 'Could not fetch tasks');
        }
    };

    const handlePressTask = (taskId) => {
        navigation.navigate('TaskDetail', { taskId });
    };

    const renderTask = ({ item }) => (
        <TaskItem task={item} onPress={handlePressTask} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.dateHeader}>{selectedDate}</Text>
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    dateHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default TaskListScreen;


