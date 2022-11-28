import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';
import {ChatMessageType} from '~/enum/chatMessageType';

interface ContainerProps {
  type: ChatMessageType;
}

export const Container = styled(View)<ContainerProps>`
  align-self: ${props =>
    props.type === ChatMessageType.sent ? 'flex-end' : 'flex-start'};
  flex-direction: ${props =>
    props.type === ChatMessageType.sent ? 'row-reverse' : 'row'};
  margin: 0 15px 15px 15px;
`;

export const ThumbanailContainer = styled(View)`
  width: 40px;
  height: 40px;
  background-color: white;
  align-self: flex-end;
  border-radius: 20px;
  overflow: hidden;
`;

interface ArrowProps {
  type: ChatMessageType;
}

export const Arrow = styled(View)<ArrowProps>`
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-left-width: 10px;
  border-right-width: 10px;
  border-bottom-width: 10px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${props =>
    props.type === ChatMessageType.sent ? 'white' : 'lightblue'};
  position: absolute;
  ${props =>
    props.type === ChatMessageType.sent ? 'right: -10px;' : ' left: -10px;'}
  bottom: 0;
`;

interface MessageTextProps {
  type: ChatMessageType;
}

export const MessageText = styled(View)<MessageTextProps>`
  background-color: ${props =>
    props.type === ChatMessageType.sent ? 'white' : 'lightblue'};
  padding: 10px;
  align-self: flex-end;
  max-width: 60%;
  border-radius: 8px;
  position: relative;
  margin: 0 10px 0 10px;
`;

export const Thumbanail = styled(FastImage)`
  width: 50px;
  height: 50px;
`;

export const CustomText = styled(Text)`
  font-family: Jost-Regular;
  color: black;
`;

export const DateText = styled(Text)`
  font-family: Jost-Regular;
  font-size: 11px;
  align-self: flex-end;
  margin-bottom: 11px;
`;

interface ChatMessageStatusIconProps {
  size: number;
  marginBottom: number;
}
export const ChatMessageStatusIcon = styled(Image)<ChatMessageStatusIconProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  align-self: flex-end;
  margin-bottom: ${props => props.marginBottom}px;
  margin-right: 5px;
`;
