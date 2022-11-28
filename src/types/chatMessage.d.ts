interface ChatMessage {
  id: string;
  type: number;
  createdOn: string;
  message: string;
  userId: string;
  otherUserId: string;
  status: number;
  tempId: string;
}
