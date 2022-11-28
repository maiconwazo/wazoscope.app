import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScene from '../../scenes/login';

const Stack = createStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="loginScene" component={LoginScene} />
    </Stack.Navigator>
  );
};

export default LoginNavigation;
