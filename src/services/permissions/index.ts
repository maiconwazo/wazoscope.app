import {PermissionsAndroid} from 'react-native';

export const checkOrRequestLocationPermission = async () => {
  const check = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (check) {
    return true;
  }

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
