import axios from 'axios';
import {
  CHAT_API_URL,
  PEOPLE_API_URL,
  PROFILES_API_URL,
  USERS_API_URL,
} from '@env';
import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';

export const chatApi = axios.create({
  baseURL: CHAT_API_URL,
});

export const profilesApi = axios.create({
  baseURL: PROFILES_API_URL,
});

export const usersApi = axios.create({
  baseURL: USERS_API_URL,
});

export const peopleApi = axios.create({
  baseURL: PEOPLE_API_URL,
});

export const SignalRIstance = new HubConnectionBuilder()
  .configureLogging(LogLevel.None)
  .withUrl(CHAT_API_URL + '/chat')
  .build();

export const configure = async (
  onReceiveChatMessage?: (message: ChatMessage) => void,
) => {
  if (SignalRIstance.state === HubConnectionState.Disconnected) {
    try {
      if (onReceiveChatMessage) {
        SignalRIstance.on('newChatMessage', onReceiveChatMessage);
      }

      await SignalRIstance.start();
    } catch {}
  }
};
