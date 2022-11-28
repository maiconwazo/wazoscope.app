import {ThemeProvider} from 'styled-components';
import React from 'react';
import {StatusBar} from 'react-native';
import AuthNavigation from '~/navigations';
import defaultTheme from '~/themes/default';
import ContextProvider from '~/hooks/indext';

(console as any).reportErrorsAsExceptions = false;

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StatusBar barStyle={'dark-content'} />
      <ContextProvider>
        <AuthNavigation />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;
