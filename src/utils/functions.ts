import {Platform} from 'react-native';
import {Status} from '~/enum/status';

export const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.online:
      return 'green';
    case Status.away:
      return 'red';
    case Status.offline:
    default:
      return 'gray';
  }
};

export const convertBigNumbers = (n: number) => {
  let result = n;

  let divider = 1;
  let unit = '';
  let decimalPlaces = 0;
  if (n >= 1000000000) {
    divider = 1000000000;
    unit = 'B';
    decimalPlaces = 0;
    if (n % divider >= 10000000) {
      decimalPlaces = 2;
    }
  } else if (n >= 1000000) {
    divider = 1000000;
    unit = 'M';
    decimalPlaces = 0;
    if (n % divider >= 10000) {
      decimalPlaces = 2;
    }
  } else if (n >= 10000) {
    divider = 1000;
    unit = 'm';
    decimalPlaces = 0;
    if (n % divider >= 100) {
      decimalPlaces = 1;
    }
  }

  return (result / divider).toFixed(decimalPlaces) + unit;
};

export const createFormData = (image: Image, body: any = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: image.filename,
    type: image.type,
    uri:
      Platform.OS === 'ios'
        ? image?.uri?.replace('file://', '') ?? ''
        : image?.uri ?? '',
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const getFileNameFromPath = (fullPath: string) => {
  return fullPath.replace(/^.*[\\/]/, '');
};

export const getFileExtensionFromPath = (fullPath: string) => {
  return fullPath.split('.').pop();
};
