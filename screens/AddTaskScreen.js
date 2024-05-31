import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../utils/api';

const AddTaskScreen = ({ navigation }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [status, setStatus] = useState('');

	const formatDate = (date) => {
		const d = new Date(date);
		const month = ('0' + (d.getMonth() + 1)).slice(-2);
		const day = ('0' + d.getDate()).slice(-2);
		const year = d.getFullYear();
		return `${year}-${month}-${day}`;
	};

	const handleAddTask = async () => {
		try {
			const formattedDueDate = formatDate(dueDate);
			const response = await api.post('/api/tasks', { title, description, dueDate: formattedDueDate, status });
			Alert.alert('Task added successfully!');
			navigation.navigate('TasksHome', { newTask: response.data });
		} catch (error) {
			console.error('Error adding task:', error);
			Alert.alert('Error adding task', 'An error occurred');
		}
	};

	const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || dueDate;
		setShowDatePicker(Platform.OS === 'ios');
		setDueDate(currentDate);
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
				value={formatDate(dueDate)}
				onFocus={() => setShowDatePicker(true)}
				showSoftInputOnFocus={false}
			/>
			{showDatePicker && (
				<DateTimePicker
					value={dueDate}
					mode="date"
					display="default"
					onChange={handleDateChange}
				/>
			)}
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

