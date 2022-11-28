import React, {useEffect, useState} from 'react';
import send from 'assets/icons/send-message.png';
import useChat from '~/hooks/chat';
import {
  BottomToolBar,
  CustomTextInput,
  SendImage,
  SendMessageAnimatedView,
  SendMessageButton,
} from './style';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  interpolate,
  withDelay,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

interface ChatBottomBarProps {
  otherUserId: string;
}

const WINDOW_WIDTH = Dimensions.get('window').width;

const ChatBottomBar = (props: ChatBottomBarProps) => {
  const {otherUserId} = props;
  const {sendMessage} = useChat();
  const [editingMessage, setEditingMessage] = useState<string>('');
  const writing = useSharedValue(false);
  const animatedVar = useDerivedValue(() => {
    return writing.value ? withTiming(1) : withDelay(100, withTiming(0));
  }, [writing]);

  const animatedVar1 = useDerivedValue(() => {
    return writing.value
      ? withDelay(100, withTiming(1))
      : withTiming(0, {duration: 500});
  }, [writing]);

  const textInputStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        animatedVar.value,
        [0, 1],
        [WINDOW_WIDTH - 20, WINDOW_WIDTH - 65],
      ),
    };
  }, [animatedVar]);

  const sendButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedVar1.value, [0, 1], [0, 1]),
    };
  }, [animatedVar1]);

  useEffect(() => {
    writing.value = !!editingMessage.trim();
  }, [writing, editingMessage]);

  const onSubmit = () => {
    if (editingMessage.trim()) {
      sendMessage(otherUserId, editingMessage.trim());
      setEditingMessage('');
    }
  };

  return (
    <BottomToolBar>
      <Animated.View style={textInputStyle}>
        <CustomTextInput
          returnKeyType="send"
          multiline={true}
          autoCapitalize="sentences"
          autoCorrect={true}
          keyboardType="default"
          onChangeText={value => setEditingMessage(value)}
          value={editingMessage}
        />
      </Animated.View>
      <SendMessageAnimatedView style={sendButtonStyle}>
        <SendMessageButton onPress={onSubmit}>
          <SendImage source={send} resizeMode={'stretch'} />
        </SendMessageButton>
      </SendMessageAnimatedView>
    </BottomToolBar>
  );
};

export default ChatBottomBar;
