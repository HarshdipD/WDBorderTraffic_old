import React , {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import * as Font from 'expo-font';
import * as HomeStyle from './styles/HomeStyle.js';
import { Divider } from 'react-native-elements';
import WebData from './components/WebData.js';
import HomeScreen from './components/HomeScreen.js';
import CommercialVehicleScreen from './components/CommercialVehicleScreen.js';
import NexusScreen from './components/NexusScreen.js';
import AboutScreen from './components/AboutScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class App extends React.Component {
	componentDidMount() {
		Font.loadAsync({
			'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		});
	}
	render() {
		return <AppContainer />;
	}
}


// Stack navigator 
// we can have different format of navigator bottom , top , stack or none button in return to //render those page
const AppNavigator = createStackNavigator({
	Home: {
		screen: createMaterialTopTabNavigator({
			PersonalVehicle: {
				screen: HomeScreen,
				navigationOptions: ({ navigation }) => ({
					title: 'Personal',
					tabBarIcon: ({ tintColor }) => (
						<Icon
							name="car"
							size={17}
							color={tintColor} />
					),
				}),
			},
			CommercialVehicle: {
				screen: CommercialVehicleScreen,
				navigationOptions: ({ navigation }) => ({
					title: 'Commercial',
					tabBarIcon: ({ tintColor }) => (
						<Icon
							name="truck"
							size={17}
							color={tintColor} />
					),
				}),
			},
			Nexus: {
				screen: NexusScreen,
				navigationOptions: ({ navigation }) => ({
					title: 'NEXUS',
					tabBarIcon: ({ tintColor }) => (
						<Icon
							name="barcode"
							size={17}
							color={tintColor} />
					),
				}),
			},
		},
		{
			tabBarOptions: {
				activeTintColor: '#fff',
				inactiveTintColor: '#e6e6e6',
				style: {
					backgroundColor: '#13b0b9',
				},
				indicatorStyle: {
					backgroundColor: '#fff',
				},
				showIcon: true,
			},
		}
		),
		navigationOptions: ({ navigation }) => ({
			headerTitle: 'Home',
			headerStyle: {
				backgroundColor: '#12A3AA',
			},
			headerTitleStyle: {
				color: '#fff',
			},
			headerRight: <TouchableOpacity onPress={() => navigation.navigate('About')}>
			<Text style={{color: 'white', paddingRight: 20}}>About</Text>
			</TouchableOpacity>
		}),
	},
	About: {
		screen: AboutScreen,
		navigationOptions: ({ navigation }) => ({
			headerTitle: 'About',
		})
	},
	Data: {
		screen: WebData,
		navigationOptions: ({ navigation }) => ({
			headerTitle: 'Test',
		})
	},
});

const AppContainer = createAppContainer(AppNavigator);

