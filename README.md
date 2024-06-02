# Task Manager Frontend

This is the frontend for the Task Manager application. It provides a user interface for managing tasks, including user authentication, task creation, viewing, updating, and deletion.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- User authentication (signup, login, logout)
- Task management (Create, Read, Update, Delete tasks)
- Calendar view with task due dates
- Dark mode and light mode
- Font size adjustment for accessibility

## Technologies Used

- React Native
- Expo
- Axios (for API requests)
- React Navigation (for navigation)
- React Native Vector Icons (for icons)
- React Native Date Picker (for date selection)
- AsyncStorage (for storing user data and preferences)

## Setup and Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/PanZYZY/frontend.git
    cd task_manager_frontend
    ```
2.  Install dependencies:

        npm install axios

    react-navigation
    react-navigation-stack
    react-native-calendars
    @react-native-async-storage/async-storage
    react-native-gesture-handler
    react-native-reanimated
    react-native-screens
    react-native-safe-area-context
    @react-navigation/native
    @react-navigation/stack
    @react-navigation/bottom-tabs
    react-native-vector-icons

3.  Set up the environment variables:
    null

4.  Run the server:
    npx expo start

## Project Structure

task-manager-frontend/
├── assets/ # Image and other asset files
├── components/ # Reusable UI components
│ ├── CustomButton.js
│ └── TaskItem.js
├── context/ # Context providers for global state
│ ├── AuthContext.js
│ ├── FontSizeContext.js
│ └── ThemeContext.js
├── navigation/ # Navigation configuration
│ ├── RootNavigator.js
│ └── BottomTabNavigator.js
├── screens/ # Screen components
│ ├── AboutScreen.js
│ ├── AddTaskScreen.js
│ ├── CalendarScreen.js
│ ├── LoginScreen.js
│ ├── SettingsScreen.js
│ ├── SignUpScreen.js
│ ├── TaskDetailScreen.js
│ └── TasksScreen.js
├── utils/ # Utility functions and API configurations
│ └── api.js
├── .env # Environment variables
├── App.js # Main application component
├── app.json # Expo configuration
├── package.json # NPM dependencies and scripts
└── README.md # Project documentation

License
This project is licensed under the APACHE License.
