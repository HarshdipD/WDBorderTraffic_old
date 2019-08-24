import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Font from 'expo-font';
import * as HomeStyle from '../styles/HomeStyle.js';
import { Divider } from 'react-native-elements';
import WebData from './WebData';
import Icon from 'react-native-vector-icons/FontAwesome5';




class HomeScreen extends React.Component {
	render() {
		return (
			<View style={HomeStyle.container}>
				<View style={HomeStyle.CompareContainer}>
				<Text>Estimated Time At</Text><WebData value='B_time' ></WebData>
				<Text>CA to US</Text>
					<WebData value='CarCAUS'></WebData>
					<Text>US to CA</Text>
					<WebData value='CarUSCA'></WebData>
				</View>
				<View style={HomeStyle.BridgeContainer}>
					<ImageBackground source={require('../images/bridge.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(45, 166, 158, 0.7)', height: '100%', width: '100%'}}>

							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1, alignSelf: 'stretch'}}>
									<View>
									<Text style={HomeStyle.TextHead}>Ambassador Bridge</Text>
									</View>
								</View>
								<View style={{flex: 1, alignSelf: 'stretch'}}>
									<View>
									<TouchableOpacity><Text style={HomeStyle.TextHeadLink}>website</Text></TouchableOpacity>
									</View>
								</View>
							</View>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image>
										<Text>{' '}</Text>
										<Icon name='arrow-right' color='grey' />
										<Text>{' '}</Text>
										<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									{/* <Text>Entering Canada</Text> */}
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<WebData value='B_CAR_US_CA'></WebData>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image>
										<Text>{' '}</Text>
										<Icon name='arrow-right' color='grey' />
										<Text>{' '}</Text>
										<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<WebData value='B_CAR_CA_US'></WebData>
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
										<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image>
										<Text>{' '}</Text>
										<Icon name='arrow-right' color='grey' />
										<Text>{' '}</Text>
										<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<WebData value='T_CAR_US_CA'></WebData>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('../images/canada.png')} style={{width: 20, height: 20}}></Image>
										<Text>{' '}</Text>
										<Icon name='arrow-right' color='grey' />
										<Text>{' '}</Text>
										<Image source={require('../images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
									<WebData value='T_CAR_CA_US'></WebData>
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
export default HomeScreen;