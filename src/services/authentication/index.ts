import {usersApi} from '~/components/api';

export const getUser: (uid: string) => Promise<User | null> = async (
  uid: string,
) => {
  try {
    const response = await usersApi.get<User>(`/api/v1/users/${uid}`, {
      timeout: 6000,
      timeoutErrorMessage: 'Service unavailable',
    });

    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (e: any) {
    if (e.response?.status === 404) {
      return null;
    } else {
      throw e;
    }
  }
};

export const createUser: (user: User) => Promise<void> = async (user: User) => {
  await usersApi.post('/api/v1/users/createUser', user, {
    timeout: 6000,
    timeoutErrorMessage: 'Service unavailable',
  });
};
