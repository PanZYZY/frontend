import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useFontSize } from '../context/FontSizeContext';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';

const AddTaskScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const { user, token } = useAuth();
    const { themeValues } = useTheme();
    const { fontSize } = useFontSize();


    const formatDate = (date) => {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleAddTask = async () => {
        //Check if user is authenticated
        if (!user || !token) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }
        //Format the due date
        const formattedDueDate = formatDate(dueDate);

        try {
            const response = await api.post('/tasks',
                { title, description, dueDate: formattedDueDate, status, userId: user.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Task added successfully!');
            navigation.navigate('TasksHome', { newTask: response.data });
        } catch (error) {
            console.error('Error adding task:', error);
            Alert.alert('Error adding task', 'An error occurred');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: themeValues.background }]}>
            <TextInput
                style={[styles.input, { fontSize }]}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { fontSize }]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={[styles.input, { fontSize }]}
                placeholder="Due Date (YYYY-MM-DD)"
                value={dueDate}
                onChangeText={setDueDate}
            />
            <TextInput
                style={[styles.input, { fontSize }]}
                placeholder="Status"
                value={status}
                onChangeText={setStatus}
            />
            <CustomButton title="Add Task" onPress={handleAddTask} />
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

export default AddTaskScreen;


