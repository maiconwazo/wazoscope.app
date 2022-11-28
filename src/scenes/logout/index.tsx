import React, {useEffect} from 'react';
import {View} from 'react-native';
import useAuthentication from '~/hooks/authentication';

const LogoutScene = () => {
  const {signOut} = useAuthentication();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <View />;
};

export default LogoutScene;
