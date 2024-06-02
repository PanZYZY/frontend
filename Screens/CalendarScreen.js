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
    const { themeValues } = useTheme();
    const screenWidth = Dimensions.get('window').width;
    const isFocused = useIsFocused();

    // Core funtion, getting task due date to use on calendar
    const fetchTasks = useCallback(async () => {
        if (!user) return; // Ensure user is not null

        try {
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId: user.id },
            });
            const tasks = response.data;
            console.log('Fetched tasks:', tasks);

            // Method for changing marked dates
            const newMarkedDates = {};
            tasks.forEach(task => {
                const date = task.dueDate;
                newMarkedDates[date] = {
                    marked: true,
                    dots: [{ key: task.id, color: 'blue' }],
                };
            });
            //Debug log
            //console.log('Updated marked dates:', newMarkedDates);
            // After date list changes, set marks
            setMarkedDates(newMarkedDates);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [user, token]);

    //Update the marking list whenever this screen is checked on
    useEffect(() => {
        if (isFocused) {
            fetchTasks();
        }
    }, [isFocused, fetchTasks]);

    // Navigate to taskList screen when pressing on a date
    const handleDayPress = useCallback((day) => {
        navigation.navigate('TaskList', { selectedDate: day.dateString });
    }, [navigation]);

    // Help resolve when user logs out.
    if (!user) {
        return (
            <View style={[styles.container, { backgroundColor: themeValues.background }]}>
                <Text style={[styles.text, { fontSize, color: themeValues.text }]}>Please log in to view your calendar.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: themeValues.background }]}>
            <Text style={[styles.header, { fontSize, color: themeValues.text }]}>Calendar</Text>
            <Calendar
                markedDates={markedDates}
                markingType={'multi-dot'}
                onDayPress={handleDayPress}
                style={[styles.calendar, { width: screenWidth - 20 }]}
                theme={{
                    calendarBackground: themeValues.background,
                    textSectionTitleColor: themeValues.text,
                    dayTextColor: themeValues.text,
                    todayTextColor: themeValues.primary,
                    selectedDayBackgroundColor: themeValues.primary,
                    monthTextColor: themeValues.text,
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


