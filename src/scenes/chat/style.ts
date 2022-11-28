import {Dimensions, FlatList, View} from 'react-native';
import styled from 'styled-components';

const BACKGROUND_COLOR = 'rgb(240, 240, 240)';

interface ContainerProps {
  keyboardHeight: number;
  headerHeight: number;
}

export const Container = styled(View)<ContainerProps>`
  height: ${props =>
    Dimensions.get('window').height -
    props.keyboardHeight -
    props.headerHeight}px;
`;

export const MessagesContainer = styled(FlatList<ChatMessage>)`
  background-color: ${BACKGROUND_COLOR};
  width: 100%;
`;
