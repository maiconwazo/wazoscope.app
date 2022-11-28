import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components';

export const MenuIcon = styled(Icon)`
  margin-left: 10px;
`;

export const DrawerHeader = styled(View)`
  margin: 0px;
  height: 150px;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  background-color: lightblue;
  padding: 0 0 0 20px;
`;

export const CustomDrawerContentScrollView = styled(
  DrawerContentScrollView,
).attrs(() => ({
  contentContainerStyle: {
    paddingTop: 0,
  },
}))``;

export const ProfileImage = styled(FastImage)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

export const ProfileName = styled(Text)`
  font-family: Jost-Regular;
`;

export const ProfileEmail = styled(Text)`
  font-family: Jost-Regular;
  font-size: 11px;
`;
