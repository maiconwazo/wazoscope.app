import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Keyboard} from 'react-native';

interface WindowSizeType {
  keyboardHeight: number;
}

const WindowSizeContext = createContext({} as WindowSizeType);

interface WindowSizeProviderProps {
  children: ReactNode;
}

export const WindowSizeProvider = (props: WindowSizeProviderProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = (e: any) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <WindowSizeContext.Provider
      value={{
        keyboardHeight,
      }}>
      {props.children}
    </WindowSizeContext.Provider>
  );
};

const useWindowSize = (): WindowSizeType => {
  const context = useContext(WindowSizeContext);

  if (!context) {
    throw new Error('useWindowSize Provider must be configured.');
  }

  return context;
};

export default useWindowSize;
