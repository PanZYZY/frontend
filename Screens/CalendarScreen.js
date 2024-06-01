import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useFontSize } from '../context/FontSizeContext';

const CalendarScreen = ({ navigation, route }) => {
    const [markedDates, setMarkedDates] = useState({});
    const { user } = useAuth();
    const { fontSize } = useFontSize();
    const screenWidth = Dimensions.get('window').width;
    const isFocused = useIsFocused();

    const fetchTasks = useCallback(async () => {
        try {
            const response = await api.get('/tasks', { params: { userId: user.id } });
            const tasks = response.data;
            console.log('Fetched tasks:', tasks);

            const newMarkedDates = {};
            tasks.forEach(task => {
                const date = task.dueDate;
                newMarkedDates[date] = {
                    marked: true,
                    dots: [{ key: task.id, color: 'blue' }],
                };
            });

            console.log('Updated marked dates:', newMarkedDates);
            setMarkedDates(newMarkedDates);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [user.id]);

    useEffect(() => {
        if (isFocused) {
            fetchTasks();
        }
    }, [isFocused, fetchTasks]);

    const handleDayPress = (day) => {
        navigation.navigate('TaskList', { selectedDate: day.dateString });
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.header, { fontSize }]}>Calendar</Text>
            <Calendar
                markedDates={markedDates}
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
        padding: 10,
    },
    header: {
        marginVertical: 10,
        fontWeight: 'bold',
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
});

export default CalendarScreen;



