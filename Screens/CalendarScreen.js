import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../utils/api';

const CalendarScreen = ({ navigation, route }) => {
    const [markedDates, setMarkedDates] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    // Sync when a task is added/updated
    useEffect(() => {
        if (route.params?.newTask) {
            const newTask = route.params.newTask;
            updateMarkedDates(newTask.dueDate, true);
            fetchTasks();
        }
    }, [route.params?.newTask]);

    // Sync when a task is deleted
    useEffect(() => {
        if (route.params?.deletedTaskId) {
            fetchTasks();
        }
    }, [route.params?.deletedTaskId]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/api/tasks');
            const tasks = response.data;
            setTasks(tasks);

            const dates = {};
            tasks.forEach(task => {
                const date = task.dueDate;
                if (!dates[date]) {
                    dates[date] = { marked: true };
                }
            });
            const updatedMarkedDates = { ...markedDates };

            // Remove marks for dates that no longer have tasks
            Object.keys(updatedMarkedDates).forEach(date => {
                if (!dates[date]) {
                    delete updatedMarkedDates[date];
                }
            });

            // Add marks for new task dates
            Object.keys(dates).forEach(date => {
                if (!updatedMarkedDates[date]) {
                    updatedMarkedDates[date] = { marked: true };
                }
            });

            setMarkedDates(updatedMarkedDates);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const updateMarkedDates = (date, marked) => {
        setMarkedDates(prevDates => {
            const updatedDates = { ...prevDates };
            if (marked) {
                updatedDates[date] = { marked: true };
            } else {
                delete updatedDates[date];
            }
            return updatedDates;
        });
    };

    // Go to task list for the date pressed
    const handleDayPress = (day) => {
        navigation.navigate('TaskList', { selectedDate: day.dateString });
    };

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType={'simple'}
                onDayPress={handleDayPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default CalendarScreen;


