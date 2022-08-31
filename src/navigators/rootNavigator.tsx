import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Profile } from '../screens';
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Profile" component={Profile} />
		</Stack.Navigator>
	);
}

export function RootStack() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
