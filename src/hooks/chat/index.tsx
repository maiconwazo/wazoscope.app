import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {FlatList} from 'react-native';
import {configureSignalR, sendMessageSignalR} from '~/services/chat';
import uuid from 'react-native-uuid';
import {ChatMessageStatus} from '~/enum/chatMessageStatus';
import {ChatMessageType} from '~/enum/chatMessageType';
import {formatISO} from 'date-fns';
import useAuthentication from '../authentication';

interface ChatListType {
  messages: ChatMessage[];
  setChaRef(ref: RefObject<FlatList>): void;
  sendMessage(otherUserId: string, message: string): Promise<void>;
}

const ChatListContext = createContext({} as ChatListType);

interface ChatListProviderProps {
  children: ReactNode;
}

export const ChatListProvider = (props: ChatListProviderProps) => {
  const [newSentMessage, setNewSentMessage] = useState<ChatMessage>();
  const [newReceivedMessage, setNewReceivedMessage] = useState<ChatMessage>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatComponent, setChatComponent] = useState<RefObject<FlatList>>();
  const {user} = useAuthentication();

  const addMessage = useCallback(
    (message: ChatMessage) => {
      setMessages(prevState => [...prevState, message]);
      chatComponent?.current?.scrollToOffset({animated: true, offset: 0});
    },
    [chatComponent, setMessages],
  );

  const updateMessage = useCallback(
    (messageId: string, message: ChatMessage) => {
      setMessages(prevState =>
        prevState.map(m => (m.id === messageId ? message : m)),
      );
    },
    [setMessages],
  );

  const sendMessage = useCallback(
    async (otherUserId: string, message: string) => {
      if (!user) {
        return;
      }

      var tempId = uuid.v4() as string;
      addMessage({
        id: tempId,
        tempId,
        message,
        userId: user.id,
        otherUserId,
        createdOn: formatISO(new Date()),
        status: ChatMessageStatus.sent,
        type: ChatMessageType.sent,
      });

      const response = await sendMessageSignalR(otherUserId, message);
      response.tempId = tempId;

      setNewSentMessage(response);
    },
    [user, addMessage, setNewSentMessage],
  );

  let setChaRef = (ref: RefObject<FlatList>) => {
    setChatComponent(ref);
  };

  let onReceiveMessage = useCallback(
    (message: ChatMessage) => {
      setNewReceivedMessage(message);
    },
    [setNewReceivedMessage],
  );

  useEffect(() => {
    if (newSentMessage) {
      updateMessage(newSentMessage.tempId, newSentMessage);
      setNewSentMessage(undefined);
    }
  }, [updateMessage, newSentMessage]);

  useEffect(() => {
    if (newReceivedMessage) {
      addMessage(newReceivedMessage);
      setNewReceivedMessage(undefined);
    }
  }, [addMessage, newReceivedMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      configureSignalR(onReceiveMessage);
    }, 100);
    return () => clearInterval(interval);
  }, [onReceiveMessage]);

  return (
    <ChatListContext.Provider
      value={{
        messages,
        setChaRef,
        sendMessage,
      }}>
      {props.children}
    </ChatListContext.Provider>
  );
};

const useChat = (): ChatListType => {
  const context = useContext(ChatListContext);

  if (!context) {
    throw new Error('useChat Provider must be configured.');
  }

  return context;
};

export default useChat;
