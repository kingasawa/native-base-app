import React, { useState } from 'react';
import { Box, Progress, VStack, Center, NativeBaseProvider, Image } from "native-base";
// import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Example = () => {
  return <Center w="100%">
    <Box w="90%" maxW="400">
      <VStack space="md">
        <VStack mx="4" space="md">
          <Progress colorScheme="primary" value={35} />
        </VStack>
      </VStack>
    </Box>
  </Center>;
};

function ImageLogo() {
  return <Center>
    {/*<Image mb={100} size={150} alt="fallback text" borderRadius={100} source={{*/}
    {/*  uri: "https://-page-icon.png"*/}
    {/*}} fallbackSource={{*/}
    {/*  uri: "https://www.w3schools.com/css/img_lights.jpg"*/}
    {/*}} />*/}
  </Center>;
}

const Spinner = () => (
  <NativeBaseProvider>
    <Center flex={1} px="3">
      <ImageLogo />
      <Example />
    </Center>
  </NativeBaseProvider>
);

export default Spinner;