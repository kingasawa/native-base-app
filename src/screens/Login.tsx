import {
  Box, Icon, Text, Heading, VStack, FormControl, Input, Link, Button, HStack,
  Center, NativeBaseProvider, CheckIcon, WarningTwoIcon, CloseIcon, Image
} from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
// @ts-ignore
import BackgroundImage from '../../assets/img/bg.jpg';
// @ts-ignore
import LogoImage from '../../assets/img/logo.jpg';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [status, setStatus] = useState('signSuccess');
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = async (username, password) => {
    try {
      setStatus('signing')
      const response = await publicAxios.post('/auth/login', {
        username,
        password,
      });
      setStatus('signSuccess')
      const { accessToken, refreshToken, login } = response.data.token;
      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: login,
      });

      await AsyncStorage.setItem(
        'login:token', accessToken
      );

    } catch (error) {
      setStatus('signFail')
      console.log('error', error.response.data.message);
      setErrorMessage(error.response.data.message)
      // Alert.alert('Login Failed', error.response.data.message);
    }
  };

  const AlertBox = () => {
    return <Box backgroundColor="danger.300" p="3" py="3" borderRadius={3}>
    <HStack space={2}>
      <Icon as={<MaterialIcons name="error" />} size={4} mt={1} color="danger.600" />
      <Text color="danger.600" fontSize="md">
        { errorMessage }
      </Text>
    </HStack></Box>;
  }

  const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <View style={styles.container}>
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
        <Center w="100%" flex={1} px="2">
          <Image size="xl" source={LogoImage} borderRadius={100} shadow={10} />
          <Heading size="lg" fontWeight="600" color="white" my={5} shadow={3}>
            LOGIN FORM
          </Heading>
          <Box safeArea p="3" py="5" w="90%" maxW="380" bgColor="black" borderRadius={5} shadow={5} opacity={80}>
            <VStack space={3}>
              { errorMessage !== '' && <AlertBox/> }
              <FormControl>
                <Input
                  type="email"
                  InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} mx="2" color="muted.400" />}
                  size="lg"
                  variant="underlined"
                  value={username}
                  color="white"
                  onChangeText={text => setUsername(text)}
                  placeholder="Email"
                />
              </FormControl>
              <FormControl>
                <Input
                  InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} mx="2" color="muted.400" />}
                  size="lg"
                  variant="underlined"
                  value={password}
                  color="white"
                  type="password"
                  onChangeText={text => setPassword(text)}
                  placeholder="Password" />
                <Link _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500"
                }} alignSelf="flex-end" mt="2">
                  Forget Password?
                </Link>
              </FormControl>
              <Button
                isLoading={status === 'signing' }
                size="lg"
                mt="2"
                shadow={2}
                colorScheme="indigo"
                onPress={() => onLogin(username, password)}
              >
                LOGIN
              </Button>
            </VStack>
          </Box>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="src/screens/Login#">
              Sign Up
            </Link>
          </HStack>
        </Center>
      </ImageBackground>
    </View>
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });

  return (
    <NativeBaseProvider>
        <LoginForm />
    </NativeBaseProvider>
  );
};


export default Login;
