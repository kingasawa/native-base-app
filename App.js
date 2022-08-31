import React from 'react';
import { NativeBaseProvider, } from "native-base";
import { BaseTheme } from './src/theme';
import config from './nativebase.config';
import { Root } from './src/components/RootComponent';
import { AuthProvider } from './src/context/AuthContext';
import { AxiosProvider } from './src/context/AxiosContext';

export default function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <NativeBaseProvider theme={BaseTheme} config={config}>
          <Root />
        </NativeBaseProvider>
      </AxiosProvider>
    </AuthProvider>
  );
}