import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useFontSize } from '../context/FontSizeContext';
import { useTheme } from '../context/ThemeContext';

const CalendarScreen = ({ navigation }) => {
    const [markedDates, setMarkedDates] = useState({});
    const { user, token } = useAuth();
    const { fontSize } = useFontSize();
    const { theme } = useTheme();
    const screenWidth = Dimensions.get('window').width;
    const isFocused = useIsFocused();

    const fetchTasks = useCallback(async () => {
        if (!user) return; // Ensure user is not null

        try {
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId: user.id },
            });
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
    }, [user, token]);

    useEffect(() => {
        if (isFocused) {
            fetchTasks();
        }
    }, [isFocused, fetchTasks]);

    const handleDayPress = useCallback((day) => {
        navigation.navigate('TaskList', { selectedDate: day.dateString });
    }, [navigation]);

    if (!user) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Text style={[styles.text, { fontSize, color: theme.text }]}>Please log in to view your calendar.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { fontSize, color: theme.text }]}>Calendar</Text>
            <Calendar
                markedDates={markedDates}
                markingType={'multi-dot'}
                onDayPress={handleDayPress}
                style={[styles.calendar, { width: screenWidth - 20 }]}
                theme={{
                    calendarBackground: theme.background,
                    textSectionTitleColor: theme.text,
                    dayTextColor: theme.text,
                    todayTextColor: theme.primary,
                    selectedDayBackgroundColor: theme.primary,
                    monthTextColor: theme.text,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    header: {
        marginVertical: 10,
        fontWeight: 'bold',
    },
    text: {
        color: 'gray',
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
});

export default CalendarScreen;

