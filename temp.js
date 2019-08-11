import * as React from 'react';
import { Button, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer, withOrientation ,createBottomTabNavigator,createMaterialTopTabNavigator ,TabBarBottom } from "react-navigation";
import { ThemeProvider, Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 


async function loadGraphicCards(page=1){

  const searchUrl ='https://www.amazon.de/s/?page=${page}&keywords=graphic+card';
  const response = await fetch(searchUrl);

  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);

  const liList = $("#s-results-list-atf > li").map((_, li)=>
  ({
    asin: $(li).data("asin"),
    title: $("h2",li).text(),
    price: $("span.a-color-price",li).text(),
    rating: $("span.a-icon-alt",li).text(),
    imageUrl: $("img.s-access-image").att('src')
  }));

}


class HomeScreen extends React.Component {
  static navigationOptions =({navigation})=>({
   Title: 'Home',
    headerRight: <Button title='About'
    onPress={() => navigation.navigate('Display')}>
    </Button>
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
      /* <Button
         title="About the app"
         onPress={() => this.props.navigation.navigate('About')}
       ></Button>
      */
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

// craete top navigation bar
const topNav = createMaterialTopTabNavigator(
  {
    // list each route
    Home: {
      screen: HomeScreen,
      navigationOptions:{
        
        tabBarLabel: "Home"
      }
    },
    Aboutus:{
      screen: AboutScreen,
      navigationOptions:{
        tabBarLabel:"About Us"
      }
    },

  },
  {
    initialRouteName: 'Home',
    tabBarOptions:{
     // color before press
      activeTintColor: 'tomato',
      inactiveTintColor: '#000000',
      activeBackgroundColor:'#ffcbcb',
      pressColor: '#efefef',
      tabBarPosition: 'top',
      indicatorStyle: {
        backgroundColor: '#c83660',
        height: 2,
      },
      labelStyle: {
        fontSize: 15,
      },
      tabStyle: {
        height: 50,
        marginHorizontal: 20,
      },
        style: {
        paddingTop:20,
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        }
    },
    
    },
  
)

// Stack navigator 
// we can have different format of navigator bottom , top , stack or none button in return to //render those page
const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  About: AboutScreen,
  Display: Display,
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

class Display extends Reach.Component{
  state={
    page: 0,
    items: [],
  };

  componentDidMount=()=>this.loadNextPage();

  loadNextPage=()=>
  this.setState(async state =>{
    const page = state.page +1;
    const items = await loadGraphicCards(page);
    return {item, page};
  });

  render =()=>(
    <ScrollView>
      {this.state.items.map(item => <Item {...item} key={item.asin}/>)}
    </ScrollView>
  );
}
const Item = props=> (
  <TouchableOpacity onPress={() => alert("ASIN:" + props.asin)}>
    <Text>{props.title}</Text>
    <Image source={{uri: props.imageUrl}}/>
    <Text>{props.price}</Text>
    <Text>{props.rating}</Text>
  </TouchableOpacity>
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


