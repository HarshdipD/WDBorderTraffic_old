import * as React from 'react';
import { Button, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer, withOrientation ,createBottomTabNavigator,createMaterialTopTabNavigator ,TabBarBottom } from "react-navigation";
import { ThemeProvider, Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 

class HomeScreen extends React.Component {
  static navigationOptions =({navigation})=>({
   Title: 'Home',
    headerRight: <Button title='About'
    onPress={() => navigation.navigate('About')}>
    </Button>
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
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

export default class App extends React.Component {
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


