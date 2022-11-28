import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';

const BACKGROUND_COLOR = 'rgb(240, 240, 240)';

export const BottomToolBar = styled(View)`
  background-color: white;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
`;

export const CustomTextInput = styled(TextInput)`
  border-radius: 20px;
  margin: 10px;
  padding: 0px 15px;
  min-height: 30px;
  background-color: ${BACKGROUND_COLOR};
  transition: 1s transform ease-in-out;
  width: 100%;
`;

export const SendMessageAnimatedView = styled(Animated.View)`
  margin: 7.5px 10px 7.5px auto;
`;

export const SendMessageButton = styled(TouchableOpacity)`
  background-color: ${BACKGROUND_COLOR};
  height: 35px;
  width: 35px;
  border-radius: 17px;
  align-items: center;
  justify-content: center;
`;

export const SendImage = styled(Image)`
  width: 18px;
  height: 16px;
  margin-left: 4px;
`;
