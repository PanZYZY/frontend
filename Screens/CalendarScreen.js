import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../utils/api';

const CalendarScreen = ({ navigation, route }) => {
    const [markedDates, setMarkedDates] = useState({});

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (route.params?.newTask) {
            const newTask = route.params.newTask;
            updateMarkedDates(newTask.dueDate);
        }
    }, [route.params?.newTask]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/api/tasks');
            const tasks = response.data;
            const dates = {};
            tasks.forEach(task => {
                const date = task.dueDate;
                if (!dates[date]) {
                    dates[date] = { marked: true };
                }
            });
            setMarkedDates(dates);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const updateMarkedDates = (date) => {
        setMarkedDates(prevDates => ({
            ...prevDates,
            [date]: { marked: true },
        }));
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

