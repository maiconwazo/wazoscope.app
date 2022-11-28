import React, {ReactNode} from 'react';
import {AuthenticationProvider} from './authentication';
import {ChatListProvider} from './chat';
import {LoadingProvider} from './loading';
import {ProfileProvider} from './profiles';
import {WindowSizeProvider} from './windowSize';

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = (props: ContextProviderProps) => {
  return (
    <LoadingProvider>
      <AuthenticationProvider>
        <WindowSizeProvider>
          <ProfileProvider>
            <ChatListProvider>{props.children}</ChatListProvider>
          </ProfileProvider>
        </WindowSizeProvider>
      </AuthenticationProvider>
    </LoadingProvider>
  );
};

export default ContextProvider;
