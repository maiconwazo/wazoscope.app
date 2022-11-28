import {StackNavigationProp} from '@react-navigation/stack';

export type AppStackNavigationProp = StackNavigationProp<AppRouteList>;

export type AppRouteList = {
  appNavigation: undefined;
  loginNavigation: undefined;
  signUp: undefined;
  profileDetail: {otherUserId: string};
  chat: {otherUserId: string};
};
