import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Switch } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFontSize } from '../context/FontSizeContext'; // If you have a FontSizeContext

const SettingsScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const { fontSize, updateFontSize } = useFontSize();
  const [isLargeFont, setIsLargeFont] = useState(fontSize === 20);

  useEffect(() => {
    setIsLargeFont(fontSize === 20);
  }, [fontSize]);

  const handleFontSizeChange = () => {
    const newFontSize = isLargeFont ? 16 : 20;
    updateFontSize(newFontSize);
    setIsLargeFont(!isLargeFont);
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontSize }]}>Font Size</Text>
      <Switch
        value={isLargeFont}
        onValueChange={handleFontSizeChange}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default SettingsScreen;
