import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api';

const AddTaskScreen = ({ navigation }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [status, setStatus] = useState('');

	const handleAddTask = async () => {
		try {
			const response = await api.post('/api/tasks', { title, description, dueDate, status });
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
