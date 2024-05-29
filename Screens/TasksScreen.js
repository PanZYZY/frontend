import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import api from '../utils/api';

const TasksScreen = ({ navigation }) => {
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

    const renderTask = ({ item }) => (
        <View style={styles.taskItem}>
            <Text>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id.toString()}
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
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default TasksScreen;

