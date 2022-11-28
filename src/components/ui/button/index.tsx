import {BackIcon, CustomButton, CustomButtonText} from './style';
import React from 'react';

interface BackButtonProps {
  onPress: () => void;
}
export const BackButton = (props: BackButtonProps) => {
  const {onPress} = props;

  return <BackIcon name="chevron-back" size={24} onPress={onPress} />;
};

interface CustomButtonProps {
  label: string;
  onClick: () => void;
}
export const Button = (props: CustomButtonProps) => {
  const {label, onClick} = props;
  return (
    <CustomButton onPress={onClick}>
      <CustomButtonText>{label}</CustomButtonText>
    </CustomButton>
  );
};
