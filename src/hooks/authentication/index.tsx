import {FIREBASE_AUTH_CLIENT_ID} from '@env';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Google, {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {AuthStatus} from '~/enum/authStatus';
import {createUser, getUser} from '~/services/authentication';
import {notifyMessage} from '~/services/notifications';
import {getPeople} from '~/services/peopleApi';
import {uploadImage} from '~/services/storage';
import useLoading from '../loading';

interface AuthenticationType {
  peopleApiUser: UserPeopleApi | null;
  authStatus: AuthStatus;
  user: User | null;
  fireBaseUser: FirebaseAuthTypes.User | null;
  googleUser: Google.User | null;
  reloadUser: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  createAccount: (user: User, profileImage?: Image) => Promise<void>;
}

const AuthenticationContext = createContext({} as AuthenticationType);

interface AuthenticationProviderProps {
  children: ReactNode;
}

export const AuthenticationProvider = (props: AuthenticationProviderProps) => {
  const {showLoading, hideLoading} = useLoading();
  const [authStatus, setAuthStatus] = useState<AuthStatus>(
    AuthStatus.NotLogged,
  );
  const [fireBaseUser, setFireBaseUser] =
    useState<FirebaseAuthTypes.User | null>(null);
  const [googleUser, setGoogleUser] = useState<Google.User | null>(null);
  const [peopleApiUser, setPeopleApiUser] = useState<UserPeopleApi | null>(
    null,
  );
  const [user, setUser] = useState<User | null>(null);

  const createAccount = async (newUser: User, profileImage?: Image) => {
    try {
      showLoading();
      if (profileImage) {
        newUser.profileImageUrl = await uploadImage(
          newUser.id,
          profileImage,
          true,
        );
      }

      await createUser(newUser);
      await validateUserFromServer(newUser.id);

      setAuthStatus(AuthStatus.NotLogged);
    } catch (e: any) {
      notifyMessage(e.message);
    } finally {
      hideLoading();
    }
  };

  const reloadUser = async () => {
    try {
      await fireBaseUser?.reload();
    } catch (e) {
      await signOut();
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signOut();

      showLoading();
      await GoogleSignin.hasPlayServices();
      const reponseGoogle = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(
        reponseGoogle.idToken,
      );

      await auth().signInWithCredential(googleCredentials);
      setGoogleUser(reponseGoogle);
    } catch (e: any) {
      hideLoading();
    }
  };

  const signOutWithSocial = useCallback(async () => {
    await signOutWithGoogle();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await signOutWithSocial();
      await auth().signOut();
    } catch (e: any) {
      // notifyMessage(e.message);
    }
  }, [signOutWithSocial]);

  const signOutWithGoogle = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (e: any) {
      notifyMessage(e.message);
    }
  };

  const getGoogleInformation = useCallback(async () => {
    const googleCurrentUser = await GoogleSignin.getCurrentUser();
    setGoogleUser(googleCurrentUser);

    if (googleCurrentUser) {
      const {accessToken} = await GoogleSignin.getTokens();

      const peopleReponse = await getPeople(
        googleCurrentUser.user.id,
        accessToken,
      );

      setPeopleApiUser(peopleReponse);
    }
  }, []);

  const onAuthStateChanged = useCallback(
    async (newUser: FirebaseAuthTypes.User | null) => {
      if (!newUser) {
        setUser(null);
      }

      if (newUser?.uid !== fireBaseUser?.uid) {
        setFireBaseUser(newUser);

        if (newUser) {
          try {
            showLoading();

            await getGoogleInformation();
            await validateUserFromServer(newUser.uid);
          } catch (e: any) {
            notifyMessage(e.message);
          } finally {
            hideLoading();
          }
        }
      }
    },
    [fireBaseUser, getGoogleInformation, showLoading, hideLoading],
  );

  const validateUserFromServer = async (uid: string) => {
    try {
      const response = await getUser(uid);
      setUser(response);

      if (!response) {
        setAuthStatus(AuthStatus.NewUser);
      }
    } catch (e: any) {
      setUser(null);
      notifyMessage(e.message);
    }
  };

  useEffect(() => {
    if (authStatus !== AuthStatus.NewUser) {
      setAuthStatus(user ? AuthStatus.Logged : AuthStatus.NotLogged);
    }
  }, [user, authStatus]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/user.gender.read',
        'https://www.googleapis.com/auth/user.birthday.read',
      ],
      webClientId: FIREBASE_AUTH_CLIENT_ID,
      // hostedDomain: '', // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });

    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return unsubscribe;
  }, [onAuthStateChanged]);

  return (
    <AuthenticationContext.Provider
      value={{
        peopleApiUser,
        googleUser,
        fireBaseUser,
        authStatus,
        user,
        reloadUser,
        signInWithGoogle,
        signOut,
        createAccount,
      }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

const useAuthentication = (): AuthenticationType => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('useAuthentication Provider must be configured.');
  }

  return context;
};

export default useAuthentication;
