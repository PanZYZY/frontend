import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from '../screens/TasksScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddTaskScreen from '../screens/AddTaskScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TasksStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={TasksScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Main" component={TasksStack} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
