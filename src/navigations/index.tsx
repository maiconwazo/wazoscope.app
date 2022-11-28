import React, {ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import AppNavigation from './app';
import LoginNavigation from './login';
import {AppRouteList} from '~/types/routes';
import ChatScene from '~/scenes/chat';
import ProfileDetailScene from '~/scenes/profiles/detail';
import useAuthentication from '~/hooks/authentication';
import {AuthStatus} from '~/enum/authStatus';
import SignUpScene from '~/scenes/signup';
import {BackButton} from '~/components/ui/button';

const Stack = createStackNavigator<AppRouteList>();

const AuthNavigation = () => {
  const {authStatus, signOut} = useAuthentication();

  const ReturnRoutes: () => ReactNode = () => {
    switch (authStatus) {
      case AuthStatus.Logged:
        return (
          <>
            <Stack.Screen name="appNavigation" component={AppNavigation} />
            <Stack.Screen name="profileDetail" component={ProfileDetailScene} />
            <Stack.Screen
              name="chat"
              component={ChatScene}
              options={{headerShown: true}}
            />
          </>
        );
      case AuthStatus.NewUser:
        return (
          <Stack.Screen
            name="signUp"
            component={SignUpScene}
            options={{
              headerShown: true,
              title: 'Create a new profile',
              headerLeft: () => <BackButton onPress={signOut} />,
            }}
          />
        );
      case AuthStatus.NotLogged:
      default:
        return (
          <Stack.Screen name="loginNavigation" component={LoginNavigation} />
        );
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {ReturnRoutes()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
