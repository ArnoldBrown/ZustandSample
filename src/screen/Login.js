import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import useAuthStore from '../store/store';
import ItemList from './ItemList';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogin = () => {
    setUsername('');
    setPassword('');
    login(username, password);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View style={{ justifyContent: 'space-around', flexDirection: 'rows' }}>
          <Button title="Logout" onPress={handleLogout} />
          <ItemList />
        </View>
      ) : (
        <>
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
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
  },
  logoutMessage: {
    fontSize: 18,
    color: 'red',
  },
});

export default Login;