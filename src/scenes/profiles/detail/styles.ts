import {ImageBackground, Text, View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';

export const BOTTOM_BAR_HEIGTH = 60;
export const COVER_IMAGE_HEIGHT = 250;
export const PROFILE_IMAGE_SIZE = 200;
export const PROFILE_IMAGE_TOP = COVER_IMAGE_HEIGHT - 100;
export const PROFILE_IMAGE_LEFT = (Dimensions.get('window').width - 200) / 2;
export const BOTTOM_BUTTON_WIDTH = (Dimensions.get('window').width - 80) / 2;

export const ProfileDetailContainer = styled(View)`
  height: 100%;
`;

export const CoverContainer = styled(Animated.View)`
  height: ${COVER_IMAGE_HEIGHT}px;
  overflow: hidden;
  z-index: 20;
  elevation: 5;
  background-color: white;
`;

export const CoverImage = styled(ImageBackground)`
  height: 100%;
  width: 100%;
`;

export const ProfileImage = styled(Animated.Image).attrs(() => ({
  imageStyle: {
    resizeMode: 'cover',
    height: 200,
  },
}))`
  height: ${PROFILE_IMAGE_SIZE}px;
  width: ${PROFILE_IMAGE_SIZE}px;
  top: ${COVER_IMAGE_HEIGHT - 100}px;
  left: ${PROFILE_IMAGE_LEFT}px;
  position: absolute;
  border-radius: 100px;
  overflow: hidden;
  border: 3px white;
  z-index: 20;
  elevation: 5;
`;

export const ProfileInfo = styled(Animated.ScrollView).attrs(() => ({
  bounce: false,
  alwaysBounceVertical: false,
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  height: 100%;
  padding: 00px 20px;
`;

export const HeaderGap = styled(View)`
  height: 120px;
`;

export const Card = styled(View)`
  background-color: white;
  border-radius: 8px;
  elevation: 2;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  align-items: center;
`;

export const Statistics = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const StatisticsSection = styled(View)`
  width: 120px;
  position: relative;
  height: 45px;
`;

export const Key = styled(Text)`
  position: absolute;
  font-size: 12px;
  text-align: center;
  width: 100%;
  font-family: Jost-Regular;
`;

export const Value = styled(Text)`
  position: absolute;
  font-size: 30px;
  text-align: center;
  width: 100%;
  font-family: Jost-Regular;
  top: 9px;
`;

export const Divider = styled(View)`
  height: 80%;
  width: 1px;
  background-color: gray;
  opacity: 0.2;
`;

export const ProfileTitle = styled(Text)`
  font-size: 30px;
  font-family: Jost-Regular;
`;

export const ProfileDescription = styled(Text)`
  font-size: 14px;
  font-family: Jost-Regular;
  width: 80%;
  text-align: center;
  margin: 10px;
`;

export const ProfileLocation = styled(Text)`
  font-size: 10px;
  font-family: Jost-Regular;
`;

export const CenterContainer = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const BottomBar = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  elevation: 5;
  height: ${BOTTOM_BAR_HEIGTH}px;
  background-color: white;
  z-index: 30;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const BottomBarButton = styled(TouchableOpacity)`
  width: ${BOTTOM_BUTTON_WIDTH}px;
  height: ${BOTTOM_BAR_HEIGTH - 25}px;
  background-color: lightblue;
  margin: 12.5px 0px;
  border-radius: 8px;
  elevation: 2;
  justify-content: center;
  align-items: center;
`;

export const BottomButtonText = styled(Text)`
  font-family: Jost-Regular;
  font-size: 18px;
`;
