import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CalendarScreen = ({ navigation, route }) => {
    const [markedDates, setMarkedDates] = useState({});
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    useEffect(() => {
        if (route.params?.newTask || route.params?.updatedTask || route.params?.deletedTaskId) {
            fetchTasks();
        }
    }, [route.params?.newTask, route.params?.updatedTask, route.params?.deletedTaskId]);


    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', { params: { userId: user.id } });
            const tasks = response.data;
            const dates = {};
            tasks.forEach(task => {
                const date = task.dueDate;
                if (!dates[date]) {
                    date[date] = date;
                    dates[date] = { marked: true };
                }
            });
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



