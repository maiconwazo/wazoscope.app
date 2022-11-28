import {profilesApi} from '~/components/api';

export const getCompleteProfile = async (
  profileId: string,
): Promise<CompleteProfile | null> => {
  const response = await profilesApi.get<CompleteProfile>(
    `/api/v1/profiles/${profileId}`,
    {
      timeout: 6000,
      timeoutErrorMessage: 'Service unavailable',
    },
  );

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export const getProfiles = async (
  latitude: number,
  longitude: number,
  lastId: string,
): Promise<PaginatedResult<Profile>> => {
  const response = await profilesApi.get<PaginatedResult<Profile>>(
    `/api/v1/profiles?latitude=${latitude}&longitude=${longitude}&lastId=${lastId}`,
    {
      timeout: 6000,
      timeoutErrorMessage: 'Service unavailable',
    },
  );

  if (response.status === 200) {
    return response.data;
  }

  throw new Error('Error on get profiles');
};
