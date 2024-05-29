import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import api from '../utils/api';

const CalendarScreen = () => {
    const [markedDates, setMarkedDates] = useState({});

    useEffect(() => {
        api.get('/api/tasks')
            .then(response => {
                const tasks = response.data;
                const dates = {};
                tasks.forEach(task => {
                    dates[task.dueDate] = { marked: true };
                });
                setMarkedDates(dates);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType={'simple'}
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
});

export default CalendarScreen;
