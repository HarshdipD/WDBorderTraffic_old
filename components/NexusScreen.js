import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import * as Font from 'expo-font';
import * as HomeStyle from '../styles/HomeStyle.js';
import { Divider } from 'react-native-elements';
import WebData from './WebData';



class NexusScreen extends React.Component {
	static navigationOptions =({navigation})=>({
		headerTitle: 'About',
		headerRight: <TouchableOpacity onPress={() => navigation.navigate('Data')}>
			<Text style={{color: 'white', paddingRight: 20}}>Data</Text>
			</TouchableOpacity>
	});
	render() {
		return(
<View style={HomeStyle.container}>
				<View style={HomeStyle.CompareContainer}>
				<Text>CA to US</Text>
					<WebData value='NexusCAUS'></WebData>
			
				</View>
				<View style={HomeStyle.BridgeContainer}>
					<ImageBackground source={require('../images/bridge.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(45, 166, 158, 0.6)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Bridge Wait Times</Text>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('../images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<WebData value='B_NEXUS_US_CA'></WebData>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('../images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
									<WebData value='B_NEXUS_CA_US'></WebData>
									</View>
								</View>
							</View>
								
						</View>
					</ImageBackground>
				</View>
				<View style={HomeStyle.TunnelContainer}>
					<ImageBackground source={require('../images/tunnel.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(143, 143, 143, 0.5)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('../images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
									<WebData value='T_NEXUS_US_CA'></WebData>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
									<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
									<Image source={require('../images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
									<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
									<WebData value='T_NEXUS_CA_US'></WebData>
									</View>
								</View>
							</View>
								
						</View>
					</ImageBackground>
				</View>
				<View style={HomeStyle.AdSupportContainer}>
					<Text style={{color: 'white', textAlign: 'center'}}>Support this App - watch this ad</Text>
				</View>
			</View>
		);
	}
}

export default NexusScreen;