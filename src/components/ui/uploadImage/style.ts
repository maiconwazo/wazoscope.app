import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Entypo';
import {CustomText} from '../text/style';

export const Container = styled(View)`
  align-self: center;
  margin-bottom: 20px;
  position: relative;
`;

export const ImageContainer = styled(View)`
  overflow: hidden;
  border: white 10px;
  border-radius: 200px;
  width: 220px;
  height: 220px;
`;

export const CustomImage = styled(FastImage)`
  height: 100%;
`;

export const UploadButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  background-color: white;
  padding: 10px;
  border-radius: 100px;
`;

export const UploadIcon = styled(Icon)``;

export const UploadModal = styled(View)`
  align-self: center;
  background-color: white;
  border-radius: 10px;
  border: white 2px;
  overflow: hidden;
`;

export const UploadOption = styled(TouchableOpacity)`
  padding: 20px 50px;
  background-color: lightblue;
  border: 2px white;
  border-radius: 10px;
`;

export const UploadOptionText = styled(CustomText)`
  font-size: 16px;
  align-self: center;
`;
