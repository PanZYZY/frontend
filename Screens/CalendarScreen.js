import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CalendarScreen = ({ navigation, route }) => {
    const [markedDates, setMarkedDates] = useState({});
    const { user } = useAuth();
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        fetchTasks();
    }, [user]);

    useEffect(() => {
        if (route.params?.newTask) {
            fetchTasks(); // Refresh tasks when a new task is added
        }
    }, [route.params?.newTask]);

    useEffect(() => {
        if (route.params?.updatedTask) {
            console.log('Updated task detected:', route.params.updatedTask); // Debugging log
            fetchTasks(); // Refresh tasks when a task is updated
        }
    }, [route.params?.updatedTask]);

    useEffect(() => {
        if (route.params?.deletedTaskId) {
            fetchTasks(); // Refresh tasks when a task is deleted
        }
    }, [route.params?.deletedTaskId]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', { params: { userId: user.id } });
            const tasks = response.data;

            // Log tasks to debug
            console.log('Fetched tasks:', tasks);

            // Clear old marked dates
            const dates = {};
            Object.keys(markedDates).forEach(date => {
                dates[date] = { marked: false };
            });

            // Mark new due dates
            tasks.forEach(task => {
                const date = task.dueDate;
                dates[date] = { marked: true };
            });

            // Log dates to debug
            console.log('Updated dates:', dates);

            setMarkedDates(dates);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDayPress = (day) => {
        navigation.navigate('TaskList', { selectedDate: day.dateString });
    };

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType={'simple'}
                onDayPress={handleDayPress}
                style={[styles.calendar, { width: screenWidth - 20 }]}
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


