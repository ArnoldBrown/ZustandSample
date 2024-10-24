import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './src/screen/Login';
import useAuthStore from './src/store/store';

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isAuthenticated === undefined) {
    // Show a loading spinner while checking auth status
    return (
      <SafeAreaView style={styles.container}>
      {isAuthenticated ? (
        <Text style={styles.welcomeMessage}>Welcome, {user.username}!</Text>
      ) : (
        <Login />
      )}
    </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;