import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ThemeProvider, Header } from 'react-native-elements';

class HomeScreen extends React.Component {
  static navigationOptions ={
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="About the app"
          onPress={() => this.props.navigation.navigate('About')}
        />
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
      <View>
        <Text>About Us :)</Text>
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
      
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  About: AboutScreen
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
});
