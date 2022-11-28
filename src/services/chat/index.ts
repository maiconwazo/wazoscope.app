import {chatApi, SignalRIstance, configure} from '~/components/api';

export const getMessages = async (
  otherUserId: string,
  pageNumber: number,
  pageSize: number,
): Promise<PaginatedResult<ChatMessage>> => {
  const response = await chatApi.get<PaginatedResult<ChatMessage>>(
    `/api/v1/messages/${otherUserId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      timeout: 6000,
      timeoutErrorMessage: 'Service unavailable',
    },
  );

  if (response.status === 200) {
    return response.data;
  }

  throw new Error('Error on get messages');
};

export const sendMessageSignalR = async (
  otherUserId: string,
  message: string,
): Promise<ChatMessage> => {
  var response = await SignalRIstance.invoke<ChatMessage>(
    'send',
    otherUserId,
    message,
  );

  return response;
};

export const configureSignalR = async (
  onReceiveChatMessage: (message: ChatMessage) => void,
) => {
  configure(onReceiveChatMessage);
};
