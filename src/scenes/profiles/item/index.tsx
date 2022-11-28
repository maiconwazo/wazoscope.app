import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components';
import {Status} from '~/enum/status';
import {AppStackNavigationProp} from '~/types/routes';
import {getStatusColor} from '~/utils/functions';
import FastImage from 'react-native-fast-image';

const MARGIN = 1;
const ITEM_WIDTH = Dimensions.get('window').width / 3 - MARGIN * 2;

const ProfileContainer = styled(TouchableOpacity)`
  height: ${ITEM_WIDTH}px;
  width: ${ITEM_WIDTH}px;
  overflow: hidden;
  margin: ${MARGIN}px;
  background-color: gray;
  position: relative;
`;

const InfoContainer = styled(View)`
  bottom: 0px;
  position: absolute;
  flex-direction: row;
  align-items: center;
`;

const ProfileTitle = styled(Text)`
  font-size: 11px;
  color: white;
  font-weight: bold;
  text-shadow: black 0 0 8px;
  width: 100%;
  margin: 3px;
`;

const StatusIcon = styled(View)<{status: Status}>`
  background-color: ${props => getStatusColor(props.status)};
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-left: 5px;
`;

const CustomFastImage = styled(FastImage)`
  height: ${ITEM_WIDTH}px;
  width: ${ITEM_WIDTH}px;
`;

interface ItemProps {
  profile: Profile;
}

const Item = memo((props: ItemProps) => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const {profile} = props;

  const onPressItem = () => {
    navigation.navigate('profileDetail', {otherUserId: profile.id});
  };

  return (
    <ProfileContainer onPress={onPressItem}>
      <CustomFastImage
        source={{
          uri: props.profile.profileImageUrl,
        }}
        resizeMode="cover"
      />
      <InfoContainer>
        <StatusIcon status={props.profile.status} />
        <ProfileTitle>{props.profile.displayName}</ProfileTitle>
      </InfoContainer>
    </ProfileContainer>
  );
});

export default Item;
