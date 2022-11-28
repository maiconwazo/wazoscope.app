import React from 'react';
import {View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import useAuthentication from '~/hooks/authentication';

const LoginScene = () => {
  const {signInWithGoogle} = useAuthentication();

  return (
    <View>
      <GoogleSigninButton
        onPress={signInWithGoogle}
        size={GoogleSigninButton.Size.Icon}
      />
    </View>
  );
};

export default LoginScene;
