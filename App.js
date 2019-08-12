import React ,{Component}from 'react';
import {FlatList, Button, StyleSheet, Text, View, Linking, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator, createAppContainer, withOrientation ,createBottomTabNavigator,createMaterialTopTabNavigator ,TabBarBottom } from "react-navigation";
import { ThemeProvider, Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 

export default class WebData extends Component{
  constructor(props){
    super(props);
      this.state={
        
        data: []
      
    }
  }
  fetchData = async()=>
  { try{
    const res = await fetch('http://leanp.myweb.cs.uwindsor.ca/60334/users');
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
        <Text>Welcome the information</Text>
        <FlatList
        data={this.state.data}
        keyExtractor={(item,index)=> index.toString()}
        renderItem={({item})=>
        <View>
          <Text>{ item.username}</Text>
        <Text>{ item.id}</Text>
          </View>
      }>

      </FlatList>
      </View>
    )
  }
}
class HomeScreen extends React.Component {
  static navigationOptions =({navigation})=>({
    headerTitle: 'Home',
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('About')}>
      <Text style={{color: 'white', paddingRight: 20}}>About</Text>
      </TouchableOpacity>
  });
  render() {
    return (
      <View style={HomeStyle.container}>
        <View style={HomeStyle.CompareContainer}>
          <Text>Compare commute will come here</Text>
        </View>
        <View style={HomeStyle.BridgeContainer}>
          <ImageBackground source={require('./images/bridge.jpg')} style={{width: '100%', height: '100%', opacity: 0.5}}><Text style={HomeStyle.TextHead}>Bridge Wait Times</Text></ImageBackground>
        </View>
        <View style={HomeStyle.TunnelContainer}>
          <Text style={HomeStyle.TextHead}>Tunnel Wait Times</Text>
        </View>
        <View style={HomeStyle.AdSupportContainer}>
          <Text style={{color: 'white', textAlign: 'center'}}>Support this App - watch this ad</Text>
        </View>
      </View>
    );
  }
}

class AboutScreen extends React.Component {
  static navigationOptions ={
    title: 'About'
  };
  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.AboutContainer}>
          <Text style={styles.head}>Windsor-Detroit Border Traffic
            <Text style={{fontWeight: 'normal', fontSize: 15}}>
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
              <TouchableOpacity onPress={() => Linking.openURL('http://hsdeogan.com')}><Text style={{color: 'blue'}}>hsdeogan.com</Text></TouchableOpacity>
            </View>
            <View style={{width: 150, height: 50, alignItems: 'center'}}>
              <Text>Prakort Lean</Text>
              <TouchableOpacity onPress={() => Linking.openURL('http://github.com/prakort')}><Text style={{color: 'blue'}}>github</Text></TouchableOpacity>
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

// Stack navigator 
// we can have different format of navigator bottom , top , stack or none button in return to //render those page
const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  About: AboutScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#553D32',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

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
    paddingTop: 20,
    textTransform: 'uppercase',
    fontSize: 15,
  },

});