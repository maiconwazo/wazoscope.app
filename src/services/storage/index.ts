import storage from '@react-native-firebase/storage';
import {format} from 'date-fns';
import {getFileExtensionFromPath} from '~/utils/functions';

export const uploadImage: (
  userId: string,
  image: Image,
  isMain: boolean,
) => Promise<string> = async (
  userId: string,
  image: Image,
  isMain: boolean,
) => {
  const ext = getFileExtensionFromPath(image.filename);

  const reference = storage().ref(
    `${userId}/${
      isMain ? 'default' : format(Date.now(), 'yyyyMMdd-HH:mm:ss')
    }.${ext ?? 'jpg'}`,
  );

  return new Promise<string>((resolve, reject) => {
    reference.putFile(image.uri).then(
      async response => {
        const url = await storage()
          .ref(response.metadata.fullPath)
          .getDownloadURL();

        resolve(url);
      },
      error => {
        reject(error.message);
      },
    );
  });
};
