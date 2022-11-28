import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilesScene from '~/scenes/profiles';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  CustomDrawerContentScrollView,
  DrawerHeader,
  MenuIcon,
  ProfileEmail,
  ProfileImage,
  ProfileName,
} from './style';
import useAuthentication from '~/hooks/authentication';
import LogoutScene from '~/scenes/logout';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="profilesScene"
        component={ProfilesScene}
        options={{
          title: 'Proximidades',
          headerLeft: () => (
            <MenuIcon
              name={'menu'}
              size={24}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {user} = useAuthentication();

  return (
    <CustomDrawerContentScrollView {...props}>
      <DrawerHeader>
        <ProfileImage
          source={{uri: user?.profileImageUrl ?? undefined}}
          resizeMode="contain"
        />
        <ProfileName>{`${user?.givenName} ${user?.familyName}`}</ProfileName>
        <ProfileEmail>{user?.email}</ProfileEmail>
      </DrawerHeader>
      <DrawerItemList {...props} />
    </CustomDrawerContentScrollView>
  );
};

const AppNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={DrawerContent}>
      <Drawer.Screen
        name="bottomNavigation"
        component={BottomNavigation}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="logOut"
        component={LogoutScene}
        options={{title: 'Sign out'}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
