import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import ChatItem from './item';
import {Container, MessagesContainer} from './style';
import useChat from '~/hooks/chat';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppRouteList} from '~/types/routes';
import ChatBottomBar from './bottomBar';
import useWindowSize from '~/hooks/windowSize';
import {useHeaderHeight} from '@react-navigation/elements';

type ChatRouteType = RouteProp<AppRouteList, 'chat'>;

const ChatScene = () => {
  const route = useRoute<ChatRouteType>();
  const {otherUserId} = route.params;
  const {messages, setChaRef} = useChat();
  const headerHeight = useHeaderHeight();
  const {keyboardHeight} = useWindowSize();
  const chatRef = useRef<FlatList>(null);

  useEffect(() => {
    setChaRef(chatRef);
  }, [setChaRef]);

  const renderItem = useCallback(({item}: ListRenderItemInfo<ChatMessage>) => {
    return <ChatItem message={item} />;
  }, []);

  return (
    <Container keyboardHeight={keyboardHeight} headerHeight={headerHeight}>
      <MessagesContainer
        inverted
        ref={chatRef}
        data={messages.filter(m => m.otherUserId === otherUserId)?.reverse()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <ChatBottomBar otherUserId={otherUserId} />
    </Container>
  );
};

export default ChatScene;
