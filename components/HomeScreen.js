import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Linking } from 'react-native';
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
					<View>
						<Text style={HomeStyle.CompareText}>CA to US</Text>
						<View>
							<WebData value='B_Time_CA_US'></WebData>
							<WebData value='COMP_CAR_CA_US'></WebData>
						</View>
						<Text style={HomeStyle.CompareText}>US to CA</Text>
						<View>
							<WebData value='B_Time_US_CA'></WebData>
							<WebData value='COMP_CAR_US_CA'></WebData>
						</View>
					</View>
				</View>
				<View style={HomeStyle.BridgeContainer}>
					<ImageBackground source={require('../images/bridge.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(45, 166, 158, 0.7)', height: '100%', width: '100%'}}>

							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
									<Text style={HomeStyle.TextHead}>Ambassador Bridge</Text>
								</View>
								<View style={{}}>
									<TouchableOpacity onPress={() => Linking.openURL('https://www.ezbordercrossing.com/list-of-border-crossings/michigan/ambassador-bridge/current-traffic/')}><Text style={HomeStyle.TextHeadLink}>website</Text></TouchableOpacity>
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
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
									<Text style={HomeStyle.TextHead}>DW Tunnel</Text>
								</View>
								<View style={{}}>
									<TouchableOpacity onPress={() => Linking.openURL('https://dwtunnel.com')}><Text style={HomeStyle.TextHeadLink}>website</Text></TouchableOpacity>
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
				{/* <View style={HomeStyle.AdSupportContainer}>
					<Text style={{color: 'white', textAlign: 'center'}}>Support this App - watch this ad</Text>
				</View> */}
			</View>
		);
	}
}
export default HomeScreen;
