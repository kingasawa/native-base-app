import React, {useCallback, useContext, useEffect, useState} from 'react';
import Login from '../screens/Login';
import {AuthContext} from '../context/AuthContext';
import Spinner from './Spinner';
import AppBar from './AppBar';
import SideMenu from './SideMenu';

import { ImageBackground, Button, Text, View, StyleSheet, Image, Pressable } from 'react-native';
// @ts-ignore
import BackgroundImage from '../../assets/img/bg.jpg';

import { Box, Link } from 'native-base';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Root = () => {
	const authContext = useContext(AuthContext);
	const [status, setStatus] = useState('loading');

	const loadJWT = useCallback(async () => {
		try {
			const token = await AsyncStorage.getItem('login:token')
			const jwtToken: any = {
				accessToken: token,
				refreshToken: token,
				authenticated: !!token,
			};
			authContext.setAuthState(jwtToken);
			setStatus('success');
		} catch (error) {
			setStatus('error');
			console.log(`Keychain Error: ${error.message}`);
			const stateNull: any = {
				accessToken: null,
				refreshToken: null,
				authenticated: false,
			}
			authContext.setAuthState(stateNull);
		}
	}, []);

	useEffect(() => {
		setTimeout(() => { loadJWT().then(); }, 200);
	}, [loadJWT]);

	if (status === 'loading') {
		return <Spinner />;
	}

	const styles = StyleSheet.create({
		container: {
			backgroundColor: '#0891b2',
			paddingVertical: 16,
			paddingHorizontal: 12,
			borderRadius: 5,
			alignSelf: 'center',
			width: 375,
			maxWidth: '100%',
			marginBottom: 10
		},
		timings: {
			color: '#fff',
		},
		metaContainer: {
			justifyContent: 'space-between'
		},
		topContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		avatar: {
			height: 100,
			width: 100,
			borderRadius: 100
		},
		description: {
			color: 'white',
			marginTop: 5,
			fontSize: 20
		},
		button: {
			backgroundColor: '#22d3ee',
			alignSelf: 'flex-start',
			paddingHorizontal: 12,
			paddingVertical: 4,
			borderRadius: 2
		},
		buttonText: {
			fontWeight: 'bold',
			color: 'white',
			textTransform: 'uppercase',
			fontSize: 14
		},
		image: {
			flex: 1,
			justifyContent: "center"
		},
	});

	console.log('authContext?.authState?.authenticated', authContext?.authState?.authenticated);
	if (authContext?.authState?.authenticated === false) {
		return <Login />;
	} else {
		return (
			<ImageBackground source={ BackgroundImage } resizeMode="cover" style={styles.image}>
			{/*<SideMenu />*/}
			<Box py={2} flex={1}>
				<View style={styles.container}>
					<View style={styles.topContainer}>
						<View style={styles.metaContainer}>
							<View>
								<Text style={styles.timings}>Today @ 9PM</Text>
								<Text style={styles.description}>Let's talk about avatar!</Text>
							</View>
							<Pressable style={styles.button}>
								<Text style={styles.buttonText}>Remind me</Text>
							</Pressable>
						</View>
						<Image
							style={styles.avatar}
							source={{
							uri: 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg'
						}}
						/>
					</View>
				</View>
				<View>
					<Button title="Logout" onPress={() => authContext.logout()} />
				</View>
			</Box>
			</ImageBackground>
			);
	}
};