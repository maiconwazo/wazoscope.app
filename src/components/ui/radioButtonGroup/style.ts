import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import styled from 'styled-components';
import {CustomText} from '../text/style';

export const Container = styled(View)`
  margin: 10px 0 10px 10px;
  flex: 1;
`;

export const OptionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const OptionContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const OptionLabel = styled(CustomText)`
  font-size: 11px;
  color: gray;
`;

export const CustomRadioButton = styled(RadioButton)``;
