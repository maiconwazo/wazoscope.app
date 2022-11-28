import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import useProfiles from '~/hooks/profiles';
import {AppRouteList, AppStackNavigationProp} from '~/types/routes';
import {convertBigNumbers} from '~/utils/functions';
import {
  BottomBar,
  BottomBarButton,
  BottomButtonText,
  Card,
  CenterContainer,
  CoverContainer,
  CoverImage,
  COVER_IMAGE_HEIGHT,
  Divider,
  HeaderGap,
  Key,
  ProfileDescription,
  ProfileDetailContainer,
  ProfileImage,
  ProfileInfo,
  ProfileLocation,
  ProfileTitle,
  PROFILE_IMAGE_LEFT,
  PROFILE_IMAGE_SIZE,
  PROFILE_IMAGE_TOP,
  Statistics,
  StatisticsSection,
  Value,
} from './styles';

export interface ProfileDetailProps {
  profileId: string;
}

type ProfileDetailRouteType = RouteProp<AppRouteList, 'profileDetail'>;

const ProfileDetailScene = () => {
  const {loadedProfile, loading, loadCompleteProfile} = useProfiles();
  const scrollY = useSharedValue(0);
  const navigation = useNavigation<AppStackNavigationProp>();
  const route = useRoute<ProfileDetailRouteType>();

  const {
    params: {otherUserId},
  } = route;

  useEffect(() => {
    loadCompleteProfile(otherUserId);
  }, [otherUserId, loadCompleteProfile]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event: any) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const coverAnimation = useAnimatedStyle(() => {
    const heigth = interpolate(
      scrollY.value,
      [0, 250],
      [COVER_IMAGE_HEIGHT, COVER_IMAGE_HEIGHT / 2],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      height: heigth,
    };
  });

  const profileImageAnimation = useAnimatedStyle(() => {
    const size = interpolate(
      scrollY.value,
      [0, 250],
      [PROFILE_IMAGE_SIZE, PROFILE_IMAGE_SIZE / 2],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    const top = interpolate(
      scrollY.value,
      [0, 250],
      [PROFILE_IMAGE_TOP, PROFILE_IMAGE_TOP / 2],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    const left = interpolate(
      scrollY.value,
      [0, 250],
      [PROFILE_IMAGE_LEFT, 10],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      width: size,
      height: size,
      top,
      left,
    };
  });

  return (
    <View>
      {loading ? (
        <CenterContainer>
          <ActivityIndicator />
        </CenterContainer>
      ) : loadedProfile ? (
        <ProfileDetailContainer>
          <CoverContainer style={coverAnimation}>
            <CoverImage
              source={{uri: loadedProfile.coverImageUrl}}
              resizeMode="cover"
            />
          </CoverContainer>
          <ProfileImage
            source={{
              uri: loadedProfile.profileImageUrl,
            }}
            style={profileImageAnimation}
          />
          <ProfileInfo onScroll={scrollHandler}>
            <HeaderGap />
            <Card>
              <ProfileTitle>{loadedProfile.displayName}</ProfileTitle>
              <ProfileLocation>
                {`📌 ${loadedProfile.address.location} - ${loadedProfile.address.country}`}
              </ProfileLocation>
              <ProfileDescription>
                {loadedProfile.description}
              </ProfileDescription>
              <Statistics>
                <StatisticsSection>
                  <Key>Seguindo</Key>
                  <Value>{convertBigNumbers(loadedProfile.following)}</Value>
                </StatisticsSection>
                <Divider />
                <StatisticsSection>
                  <Key>Seguidores</Key>
                  <Value>{convertBigNumbers(loadedProfile.followers)}</Value>
                </StatisticsSection>
              </Statistics>
            </Card>
          </ProfileInfo>
          <BottomBar>
            <BottomBarButton>
              <BottomButtonText>Follow</BottomButtonText>
            </BottomBarButton>
            <BottomBarButton
              onPress={() => navigation.push('chat', {otherUserId})}>
              <BottomButtonText>Chat</BottomButtonText>
            </BottomBarButton>
          </BottomBar>
        </ProfileDetailContainer>
      ) : (
        <CenterContainer>
          <Text>Perfil não encontrado</Text>
        </CenterContainer>
      )}
    </View>
  );
};

export default ProfileDetailScene;
