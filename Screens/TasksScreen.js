import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../utils/api';

const TasksScreen = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            {tasks.map(task => (
                <Text key={task.id}>{task.title}</Text>
            ))}
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
