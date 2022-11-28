import {peopleApi} from '~/components/api';

export const getPeople = async (userId: string, accessToken: string) => {
  const response = await peopleApi.get<UserPeopleApi>(
    `/v1/people/${userId}?personFields=birthdays,genders&access_token=${accessToken}`,
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
