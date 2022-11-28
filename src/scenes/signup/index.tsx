import React, {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import {Button} from '~/components/ui/button';
import DatePicker from '~/components/ui/datePicker';
import Group from '~/components/ui/group';
import RadioButtonGroup from '~/components/ui/radioButtonGroup';
import {CustomTextInput, CustomTextInputRef} from '~/components/ui/textInput';
import UploadImage from '~/components/ui/uploadImage';
import useAuthentication from '~/hooks/authentication';
import {SignUpContainer} from './style';

const SignUpScene = () => {
  const {fireBaseUser, googleUser, peopleApiUser, createAccount, signOut} =
    useAuthentication();

  const familyNameRef = useRef<CustomTextInputRef>(null);
  const birthDateRef = useRef<CustomTextInputRef>(null);
  const [profileImage, setProfileImage] = useState<Image>();
  const [givenName, setGivenName] = useState(() => {
    if (googleUser?.user?.givenName) {
      return googleUser.user.givenName;
    }

    return fireBaseUser?.displayName?.split(' ')[0] ?? '';
  });

  const [familyName, setFamilyName] = useState(() => {
    if (googleUser?.user?.familyName) {
      return googleUser.user.familyName;
    }

    const names = fireBaseUser?.displayName?.split(' ');
    return names?.slice().join(' ') ?? '';
  });

  const [birthdate, setBirthdate] = useState<Date>(() => {
    let validDate = peopleApiUser?.birthdays?.find(
      x => x.date.day && x.date.month && x.date.year,
    );

    if (validDate?.date) {
      return new Date(
        Date.UTC(
          validDate.date.year,
          validDate.date.month - 1,
          validDate.date.day,
        ),
      );
    }

    return new Date();
  });

  const [gender, setGender] = useState<string>(() => {
    if (peopleApiUser?.genders) {
      return (
        peopleApiUser?.genders.find(g => g.metadata.primary) ??
        peopleApiUser?.genders[0]
      ).value;
    }

    return '';
  });

  const convertGender: (genderStr: string) => number = (genderStr: string) => {
    switch (genderStr) {
      case 'male':
        return 1;
      case 'female':
        return 2;
      case 'unspecified':
        return 3;
      default:
        return 1;
    }
  };

  const createAccountClick = async () => {
    await createAccount(
      {
        id: fireBaseUser?.uid ?? '',
        birthdate,
        email: googleUser?.user.email ?? fireBaseUser?.email ?? '',
        familyName,
        gender: convertGender(gender),
        givenName,
        profileImageUrl: !profileImage
          ? googleUser?.user?.photo ?? undefined
          : undefined,
      },
      profileImage,
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        signOut();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [signOut]);

  return (
    <SignUpContainer>
      <UploadImage
        imageUrl={
          profileImage ? profileImage.uri : googleUser?.user.photo ?? undefined
        }
        onSetImage={setProfileImage}
      />
      <Group title="Personal information">
        <CustomTextInput
          label="First name"
          value={givenName}
          onChange={setGivenName}
          onSubmit={() => {
            familyNameRef?.current?.select();
          }}
          percentageWidth={100}
        />
        <CustomTextInput
          ref={familyNameRef}
          label="Family name"
          value={familyName}
          onChange={setFamilyName}
          onSubmit={() => {
            birthDateRef?.current?.select();
          }}
          percentageWidth={100}
        />
        <DatePicker
          ref={birthDateRef}
          date={birthdate}
          onDateChange={setBirthdate}
          label="Birth date"
        />
        <RadioButtonGroup
          label="Gender"
          options={[
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'},
            {value: 'unspecified', label: 'Other'},
          ]}
          value={gender}
          onValueChange={setGender}
        />
        <Button label="Create account" onClick={createAccountClick} />
      </Group>
    </SignUpContainer>
  );
};

export default SignUpScene;
