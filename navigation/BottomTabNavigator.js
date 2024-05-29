import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from '../screens/TasksScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TasksStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TasksHome" component={TasksScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Tasks" component={TasksStack} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

