import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import api from '../utils/api';

const TaskListScreen = ({ route }) => {
    const { selectedDate } = route.params;
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasksForDate(selectedDate);
    }, [selectedDate]);

    const fetchTasksForDate = async (date) => {
        try {
            const response = await api.get('/api/tasks');
            const allTasks = response.data;
            const filteredTasks = allTasks.filter(task => task.dueDate === date);
            setTasks(filteredTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Alert.alert('Error', 'Could not fetch tasks');
        }
    };

    const renderTask = ({ item }) => (
        <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Due Date: {item.dueDate}</Text>
            <Text>Status: {item.status}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tasks for {selectedDate}</Text>
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
        backgroundColor: 'white',
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    taskTitle: {
        fontWeight: 'bold',
    },
});

export default TaskListScreen;
