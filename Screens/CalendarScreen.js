import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CalendarScreen = ({ navigation, route }) => {
  const [markedDates, setMarkedDates] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [user]);

  useEffect(() => {
    if (route.params?.newTask) {
      const newTask = route.params.newTask;
      updateMarkedDates(newTask.dueDate);
    }
  }, [route.params?.newTask]);

  useEffect(() => {
    if (route.params?.updatedTask) {
      const updatedTask = route.params.updatedTask;
      updateMarkedDates(updatedTask.dueDate);
    }
  }, [route.params?.updatedTask]);

  useEffect(() => {
    if (route.params?.deletedTaskId) {
      removeMarkedDate(route.params.deletedTaskId);
    }
  }, [route.params?.deletedTaskId]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/api/tasks', { params: { userId: user.id } });
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

  const removeMarkedDate = async (taskId) => {
    try {
      const response = await api.get('/api/tasks', { params: { userId: user.id } });
      const tasks = response.data;
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const date = task.dueDate;
        const dates = { ...markedDates };
           const remainingTasks = tasks.filter(t => t.dueDate === date && t.id !== taskId);
           if (remainingTasks.length === 0){
        delete dates[date];
        }
        setMarkedDates(dates);
      }
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



