import React, {memo} from 'react';
import {ChatMessageType} from '~/enum/chatMessageType';
import useProfiles from '~/hooks/profiles';
import {
  ThumbanailContainer,
  MessageText,
  Arrow,
  Container,
  Thumbanail,
  CustomText,
  DateText,
  ChatMessageStatusIcon,
} from './style';
import format from 'date-fns/format';
import sentIcon from 'assets/icons/sent.png';
import readIcon from 'assets/icons/read.png';
import deliveredIcon from 'assets/icons/delivered.png';
import {ChatMessageStatus} from '~/enum/chatMessageStatus';
import {parseISO} from 'date-fns/esm';
import useAuthentication from '~/hooks/authentication';

interface ItemProps {
  message: ChatMessage;
}

const ChatItem = memo((props: ItemProps) => {
  const {loadedProfile} = useProfiles();
  const {user} = useAuthentication();

  const {message} = props;
  let dateString = parseISO(message.createdOn);
  let messageType = message.type as ChatMessageType;
  let profileImageUrl =
    messageType === ChatMessageType.sent
      ? user?.profileImageUrl
      : loadedProfile?.profileImageUrl;

  let getIcon = () => {
    message.status;
    switch (message.status) {
      case ChatMessageStatus.sent:
        return (
          <ChatMessageStatusIcon
            source={sentIcon}
            size={10}
            marginBottom={13}
          />
        );
      case ChatMessageStatus.deliveried:
        return (
          <ChatMessageStatusIcon
            source={deliveredIcon}
            size={13}
            marginBottom={12}
          />
        );
      case ChatMessageStatus.read:
        return (
          <ChatMessageStatusIcon
            source={readIcon}
            size={12}
            marginBottom={13}
          />
        );
    }
  };

  return (
    <Container type={messageType}>
      <ThumbanailContainer>
        <Thumbanail source={{uri: profileImageUrl}} />
      </ThumbanailContainer>
      <MessageText type={messageType}>
        <Arrow type={messageType} />
        <CustomText>{message.message}</CustomText>
      </MessageText>
      <DateText>{dateString ? format(dateString, 'HH:mm') : 'null'}</DateText>
      {message.type === ChatMessageType.sent && getIcon()}
    </Container>
  );
});

export default ChatItem;
