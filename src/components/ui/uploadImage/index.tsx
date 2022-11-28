import React, {useState} from 'react';
import {
  Container,
  CustomImage,
  ImageContainer,
  UploadButton,
  UploadIcon,
  UploadModal,
  UploadOption,
  UploadOptionText,
} from './style';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {getFileNameFromPath} from '~/utils/functions';

interface UploadImageProps {
  imageUrl?: string;
  onSetImage: (imageInfo: Image) => void;
}

const UploadImage = (props: UploadImageProps) => {
  const {imageUrl, onSetImage} = props;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const loadFromGallery = async () => {
    try {
      var response = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.5,
        mediaType: 'photo',
        forceJpg: true,
      });

      var filename = getFileNameFromPath(response.path);

      onSetImage({
        uri: response.path,
        filename,
        type: response.mime,
      });
    } catch (e) {
      // console.log(e);
    } finally {
      closeModal();
    }
  };

  return (
    <Container>
      <ImageContainer>
        <CustomImage source={{uri: imageUrl}} resizeMode="contain" />
      </ImageContainer>
      <UploadButton onPress={openModal}>
        <UploadIcon name="camera" size={32} />
      </UploadButton>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}>
        <UploadModal>
          <UploadOption onPress={loadFromGallery}>
            <UploadOptionText>Choose from gallery</UploadOptionText>
          </UploadOption>
          <UploadOption>
            <UploadOptionText>Open camera</UploadOptionText>
          </UploadOption>
        </UploadModal>
      </Modal>
    </Container>
  );
};

export default UploadImage;
