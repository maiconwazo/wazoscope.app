import {TextInput, View} from 'react-native';
import styled from 'styled-components';
import {CustomText} from '../text/style';

interface ContainerProps {
  percentageWidth?: number;
}

export const Container = styled(View)<ContainerProps>`
  margin: 10px 0px;
  ${props => (props.percentageWidth ? `width: ${props.percentageWidth}%;` : '')}
`;

interface LabelProps {
  focused?: boolean;
}

export const Label = styled(CustomText)<LabelProps>`
  font-size: 12px;
  color: ${props => (props.focused ? 'blue' : 'gray')};
`;

export const ReadonlyInput = styled(CustomText)`
  border-radius: 10px;
  border: gray;
  padding: 9px 10px;
  font-size: 16px;
  align-self: flex-start;
`;

interface InputProps {
  focused: boolean;
  percentageWidth?: number;
}

export const Input = styled(TextInput)<InputProps>`
  font-family: Jost-Regular;
  border: ${props => (props.focused ? 'blue' : 'gray')};
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 10px;
  color: gray;
  width: 100%;
`;
