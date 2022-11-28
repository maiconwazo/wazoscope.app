import React, {createContext, ReactNode, useContext, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

interface LoadingType {
  showLoading(): void;
  hideLoading(): void;
}

const LoadingContext = createContext({} as LoadingType);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = (props: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
      }}>
      <Spinner visible={loading} />
      {props.children}
    </LoadingContext.Provider>
  );
};

const useLoading = (): LoadingType => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading Provider must be configured.');
  }

  return context;
};

export default useLoading;
