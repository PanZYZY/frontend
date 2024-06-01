import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons';
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
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Tasks') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'About') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    elevation: 5,
                },
            })}
        >
            <Tab.Screen name="Tasks" component={TasksStack} />
            <Tab.Screen name="Calendar" component={CalendarStack} />
            <Tab.Screen name="About" component={AboutScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;




