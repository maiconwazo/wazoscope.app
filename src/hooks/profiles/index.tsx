import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {getCompleteProfile, getProfiles} from '~/services/profiles';
import Geolocation from 'react-native-geolocation-service';
import {checkOrRequestLocationPermission} from '~/services/permissions';
import {notifyMessage} from '~/services/notifications';

interface ProfilesType {
  loadedProfile: CompleteProfile | null;
  content: Profile[];
  loading: boolean;
  loadCompleteProfile(profileId: string): Promise<void>;
  loadFirstPage(): Promise<void>;
  loadNextPage(): Promise<void>;
}

const ProfilesContext = createContext({} as ProfilesType);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = (props: ProfileProviderProps) => {
  const [loadedProfile, setLoadedProfile] = useState<CompleteProfile | null>(
    null,
  );
  const [content, setContent] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [lastId, setLastId] = useState<string>('');
  const [lastLocation, setLastLocation] = useState<{
    lat: number;
    long: number;
  }>({lat: 0, long: 0});

  const loadCompleteProfile = useCallback(async (profileId: string) => {
    setLoading(true);

    try {
      let response = await getCompleteProfile(profileId);
      setLoadedProfile(response);
    } catch {
      setLoadedProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFirstPage = useCallback(async () => {
    setLoading(true);

    const hasPermission = await checkOrRequestLocationPermission();
    if (!hasPermission) {
      notifyMessage('Location permission not granted');
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        setLastLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });

        try {
          let response = await getProfiles(
            position.coords.latitude,
            position.coords.longitude,
            '',
          );

          setContent(response.items);
          setTotalCount(response.totalCount);

          if (response.items.length > 0) {
            setLastId(response.items[response.items.length - 1].id);
          }

          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          setContent([]);
          notifyMessage(error.message);
          setTotalCount(0);
          setLastId('');
        }
      },
      error => {
        notifyMessage(error.message);
        setContent([]);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  const loadNextPage = useCallback(async () => {
    if (loading) {
      return;
    }

    if (content.length >= totalCount) {
      return;
    }

    setLoading(true);
    try {
      let response = await getProfiles(
        lastLocation.lat,
        lastLocation.long,
        lastId,
      );

      setContent([...content, ...response.items]);
      setTotalCount(response.totalCount);

      if (response.items.length > 0) {
        setLastId(response.items[response.items.length - 1].id);
      }
    } finally {
      setLoading(false);
    }
  }, [lastLocation, loading, content, lastId, totalCount]);

  return (
    <ProfilesContext.Provider
      value={{
        content,
        loading,
        loadNextPage,
        loadFirstPage,
        loadCompleteProfile,
        loadedProfile,
      }}>
      {props.children}
    </ProfilesContext.Provider>
  );
};

const useProfiles = (): ProfilesType => {
  const context = useContext(ProfilesContext);

  if (!context) {
    throw new Error('useProfiles Provider must be configured.');
  }

  return context;
};

export default useProfiles;
