import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {CustomText} from '../text/style';

export const BackIcon = styled(Icon)`
  margin-left: 10px;
`;

export const CustomButton = styled(TouchableOpacity)`
  width: 100%;
  background-color: lightblue;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
  elevation: 4;
  margin-top: 10px;
`;

export const CustomButtonText = styled(CustomText)`
  font-size: 16px;
  color: gray;
`;
