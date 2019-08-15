import React ,{Component}from 'react';
import {FlatList, Button, StyleSheet, Text, View, Linking, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator, createAppContainer, withOrientation ,createBottomTabNavigator,createMaterialTopTabNavigator ,TabBarBottom } from "react-navigation";
import { ThemeProvider, Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

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

class WebData extends Component{
  constructor(props){
    super(props);
      this.state={
        
        data: []
      
    }
  }
  fetchData = async()=>
  { try{
    
    const res = await fetch('http://192.168.1.2:3003/user');
    const users = await res.json();
    this.setState({data: users});
    console.log(this.state.data);
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
        <Text style={{fontFamily: 'open-sans'}}>Welcome the information</Text>
        <FlatList
        data={this.state.data}
        keyExtractor={(item,index)=> index.toString()}
        renderItem={({item})=>
        <View>
          <Text>{'\n\n'+item.lane}</Text>
        <Text>{ item.details.Status}</Text>
        <Text>{ item.details.time}</Text>
        <Text>{ item.details.delay}</Text>
        <Text>{ item.enterCanada}</Text>
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

              <View style={{ flex: 1, flexDirection: 'column', padding: 20, alignContent: 'center', alignItems: 'center'}}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignContent: 'center', alignItems: 'center' }}><Text>USA to Canada</Text></View>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignContent: 'center', alignItems: 'center'  }}><Text>Canada to USA</Text></View>
                  </View>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignContent: 'center', alignItems: 'center'  }}><Text>No Delay</Text></View>
                    <View style={{ flex: 1, alignSelf: 'stretch', alignContent: 'center', alignItems: 'center'  }}><Text>20 min</Text></View>
                  </View>
              </View>
                
            </View>
          </ImageBackground>
        </View>
        <View style={HomeStyle.TunnelContainer}>
          <ImageBackground source={require('./images/tunnel.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={{backgroundColor: 'rgba(143, 143, 143, 0.5)', height: '100%', width: '100%'}}>
              <Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>
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
            <View style={{backgroundColor: 'rgba(45, 166, 158, 0.5)', height: '100%', width: '100%'}}>
              <Text style={HomeStyle.TextHead}>Bridge Wait Times</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={HomeStyle.TunnelContainer}>
          <ImageBackground source={require('./images/tunnel.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={{backgroundColor: 'rgba(143, 143, 143, 0.5)', height: '100%', width: '100%'}}>
              <Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>
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
            <View style={{backgroundColor: 'rgba(45, 166, 158, 0.5)', height: '100%', width: '100%'}}>
              <Text style={HomeStyle.TextHead}>Bridge Wait Times</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={HomeStyle.TunnelContainer}>
          <ImageBackground source={require('./images/tunnel.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={{backgroundColor: 'rgba(143, 143, 143, 0.5)', height: '100%', width: '100%'}}>
              <Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>
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
      header: null,
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
    //fontFamily: 'Roboto',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
});

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  CompareContainer: {
    flex: 2,
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  BridgeContainer: {
    flex: 3,
    backgroundColor: '#3094a1',
  },
  TunnelContainer: {
    flex: 3,
    backgroundColor: '#545454',
  },
  AdSupportContainer: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    },
  TextHead: {
    color: 'white',
    paddingLeft: 10,
    paddingTop: 15,
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
  },
  CompareText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
