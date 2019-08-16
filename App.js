import React , {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import * as Font from 'expo-font';
import * as HomeStyle from './styles/HomeStyle.js';
import { Divider } from 'react-native-elements';

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

var key=[];
class WebData extends Component{
  constructor(props){
    super(props);
      this.state={
        
		data: [],
		key: this.props.value,
		time: '',
      
    }
  }
  fetchData = async()=>
  { try{
    
    const res = await fetch('http://10.242.2.249:3003/bridge');
    const users = await res.json();
	this.setState({data: users});

	var a = this.state.key;
	var result = users[0].a;
	console.log(users);
	console.log(a);

	
  }
  catch(error){
    console.error(error);
  }
  }
  componentDidMount(){
    this.fetchData();
  }

	render(){
		return(
			<View style={styles.AboutContainer}>
				<FlatList
				data={this.state.data}
				value={this.state.data}
				keyExtractor={(item,index)=> index.toString()}
				renderItem={({item})=>
				<View>
					<Text style={{fontFamily: 'open-sans'}}>{item.value}
					</Text>
					</View>
				}>

			</FlatList>
			</View>
		)
	}
}

class AboutScreen extends React.Component {
  static navigationOptions =({navigation})=>({
    headerTitle: 'About',
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Data')}>
      <Text style={{color: 'white', paddingRight: 20}}>Data</Text>
      </TouchableOpacity>
  });
  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.AboutContainer}>
          <Text style={styles.head}>Windsor-Detroit Border Traffic
            <Text style={{fontWeight: 'normal', fontSize: 15, fontFamily: 'open-sans'}}>
              {"\n"}
              {"\n"}
              The Windsor-Detroit Border Traffic app is developed and maintained by two students at University of Windsor.
              {"\n"}
              {"\n"}
              We have faced many times when we do not check the DW Tunnel or Ambassador Bridge website about traffic conditions and had to wait a long time.
              Checking these traffic conditions on two different websites is frustating and time consuming. This app tries to reduce this issue, with all the information in the same screen!
              {"\n"}
              {"\n"}
              This app is made using React Native, and uses web-scraping to get the traffic conditions data from the mentioned websites.
              {"\n"}
              Contact developers:
              {"\n"}
            </Text>
          </Text>
          <View style={styles.DeveloperInfo}>
            <View style={{width: 150, height: 50, alignItems: 'center'}}>
              <Text>Harshdip S. Deogan</Text>
              <TouchableOpacity onPress={() => Linking.openURL('http://hsdeogan.com')}><Text style={{color: 'blue'}}>Hsdeogan.com</Text></TouchableOpacity>
            </View>
            <View style={{width: 150, height: 50, alignItems: 'center'}}>
              <Text>Prakort Lean</Text>
              <TouchableOpacity onPress={() => Linking.openURL('http://Prakort.com')}><Text style={{color: 'blue'}}>Prakort.com</Text></TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 50, alignSelf: 'center'}}>
              <Text>Rate us on Google Play!</Text>
          </View>   
        </View>
      </View>
      
    );
  }
}


{/*
	Personal Vehicle data
*/}
class HomeScreen extends React.Component {
	render() {
		return (
			<View style={HomeStyle.container}>
				<View style={HomeStyle.CompareContainer}>
					<Text style={HomeStyle.CompareText}>Tunnel seems faster than bridge {'\n'} by 10 minutes</Text>
				</View>
				<View style={HomeStyle.BridgeContainer}>
					<ImageBackground source={require('./images/bridge.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(45, 166, 158, 0.6)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Bridge Wait Times</Text>
						
							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<WebData value='B_CAR_CA_US'></WebData>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>
							</View>
						</View>
					</ImageBackground>
				</View>
				<View style={HomeStyle.TunnelContainer}>
					<ImageBackground source={require('./images/tunnel.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(143, 143, 143, 0.5)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
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
{/*
	Commercial Vehicle data
*/}
class CommercialVehicleScreen extends React.Component {
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
					<Text style={HomeStyle.CompareText}>Tunnel seems faster than bridge {'\n'} by 10 minutes</Text>
				</View>
				<View style={HomeStyle.BridgeContainer}>
					<ImageBackground source={require('./images/bridge.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(45, 166, 158, 0.6)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Bridge Wait Times</Text>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>
							</View>
								
						</View>
					</ImageBackground>
				</View>
				<View style={HomeStyle.TunnelContainer}>
					<ImageBackground source={require('./images/tunnel.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(143, 143, 143, 0.5)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
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

{/*
	NEXUS data
*/}
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
					<Text style={HomeStyle.CompareText}>Tunnel seems faster than bridge {'\n'} by 10 minutes</Text>
				</View>
				<View style={HomeStyle.BridgeContainer}>
					<ImageBackground source={require('./images/bridge.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(45, 166, 158, 0.6)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Bridge Wait Times</Text>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>
							</View>
								
						</View>
					</ImageBackground>
				</View>
				<View style={HomeStyle.TunnelContainer}>
					<ImageBackground source={require('./images/tunnel.jpg')} style={{width: '100%', height: '100%'}}>
						<View style={{backgroundColor: 'rgba(143, 143, 143, 0.5)', height: '100%', width: '100%'}}>
							<Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>

							<View style={ HomeStyle.tableLay }>
								<View style={ HomeStyle.tableCol }>							
									<View style={ HomeStyle.tableRow }>
										<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
										<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
									</View>
								</View>

								<View style={HomeStyle.tableCol}>
									<View style={ HomeStyle.tableRow }>
									<Image source={require('./images/canada.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
									<Image source={require('./images/arrow.png')} style={{width: 20, height: 20}}></Image><Text>{' '}</Text>
									<Image source={require('./images/usa.png')} style={{width: 20, height: 20}}></Image>
									</View>
									<Divider style={{ backgroundColor: 'grey', height: 1 }} />
									<View style={ HomeStyle.tableRow }>
										<Text>live data</Text>
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


// Stack navigator 
// we can have different format of navigator bottom , top , stack or none button in return to //render those page
const AppNavigator = createStackNavigator({
	Home: {
		screen: createMaterialTopTabNavigator({
			PersonalVehicle: {
				screen: HomeScreen,
				navigationOptions: ({ navigation }) => ({
					title: 'Personal',
				}),
			},
			CommercialVehicle: {
				screen: CommercialVehicleScreen,
				navigationOptions: ({ navigation }) => ({
					title: 'Commercial',
				}),
			},
			Nexus: {
				screen: NexusScreen,
				navigationOptions: ({ navigation }) => ({
					title: 'NEXUS',
				}),
			},
		},
		{
			tabBarOptions: {
				activeTintColor: '#fff',
				inactiveTintColor: '#fff',
				style: {
					backgroundColor: '#85D4DD',
				},
				indicatorStyle: {
					backgroundColor: '#fff',
				}
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


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#C5F0A4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	AboutContainer: {
		paddingTop: 30,
		flex: 4,
		backgroundColor: '#fff',
	},
	TextAlignCenter: {
		textAlign: "center",
	},
	TextPadding: {
		paddingLeft: 30,
		paddingRight: 30,
	},
	DeveloperInfo: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingRight: 60,
		paddingLeft: 60,
	},
	head: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: 'center',
		paddingLeft: 30,
		paddingRight: 30,
	},
});

