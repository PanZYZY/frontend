import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSignUp = async () => {
        try {
            const response = await api.post('/auth/signup', { username, password });
            const { token, user } = response.data;
            //store token
            await AsyncStorage.setItem('token', token);
            //update context with user data
            login(user);
            Alert.alert('Sign up successful!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error signing up:', error);
            Alert.alert('Sign up failed', 'An error occurred');
        }
    };

 return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default SignUpScreen;
