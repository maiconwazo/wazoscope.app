import {ToastAndroid, Platform, Alert} from 'react-native';

export const notifyMessage = (msg: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};
