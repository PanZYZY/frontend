import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from '../screens/TasksScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TaskListScreen from '../screens/TaskListScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
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

function CalendarStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CalendarHome" component={CalendarScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TaskList" component={TaskListScreen} />
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Tasks" component={TasksStack} />
            <Tab.Screen name="Calendar" component={CalendarStack} />
            <Tab.Screen name="About" component={AboutScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;


