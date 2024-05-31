import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AddTaskScreen = ({ navigation, route }) => {
	const { userId } = route.params;
	const { user } = useAuth();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [status, setStatus] = useState('');

	const formatDate = (date) => {
		const d = new Date(date);
		const month = ('0' + (d.getMonth() + 1)).slice(-2);
		const day = ('0' + d.getDate()).slice(-2);
		const year = d.getFullYear();
		return `${year}-${month}-${day}`;
	};

	const handleAddTask = async () => {
		if (!user || !user.id) {
			Alert.alert('Error', 'User not authenticated');
			return;
			}

		const formattedDueDate = formatDate(dueDate);
		try {
			const response = await api.post('/api/tasks', { title, description, dueDate: formattedDueDate, status, userId: user.id });
			Alert.alert('Task added successfully!');
			navigation.navigate('TasksHome', { newTask: response.data });
		} catch (error) {
			console.error('Error adding task:', error);
			Alert.alert('Error adding task', 'An error occurred');
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Title"
				value={title}
				onChangeText={setTitle}
			/>
			<TextInput
				style={styles.input}
				placeholder="Description"
				value={description}
				onChangeText={setDescription}
			/>
			<TextInput
				style={styles.input}
				placeholder="Due Date (YYYY-MM-DD)"
				value={dueDate}
				onChangeText={setDueDate}
			/>
			<TextInput
				style={styles.input}
				placeholder="Status"
				value={status}
				onChangeText={setStatus}
			/>
			<Button title="Add Task" onPress={handleAddTask} />
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


