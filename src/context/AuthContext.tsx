import React, {createContext, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
    await AsyncStorage.removeItem('login:token')
  };

  const login = async (jwt) => {
    setAuthState({
      accessToken: jwt.accessToken || null,
      refreshToken: jwt.refreshToken || null,
      authenticated: jwt.authenticated,
    });
    await AsyncStorage.setItem('login:token', jwt.accessToken)
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        login,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};