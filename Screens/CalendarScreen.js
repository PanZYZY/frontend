import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <CalendarList
            // Calendar configuration
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default CalendarScreen;
