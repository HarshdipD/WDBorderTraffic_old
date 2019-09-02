import React , {Component} from 'react';
import {FlatList, Text, View,  } from 'react-native';



class WebData extends Component{
    constructor(props){
      super(props);
        this.state={
          
          data: {},
          key: this.props.value,
          time: '',
          
        
      }
    }
    fetchData = async()=>
    { 
  
    try{

      const res = await fetch('https://pure-ocean-75553.herokuapp.com/combine');
      const users = await res.json();
      console.log(users)
      var a = this.state.key;
      var result = users[a];
      this.setState({data: users,time: result});
      console.log(result);
  
      
    }
    catch(error){
      console.error('An error occured. Sorry about that, we\'re still learning!');
    }
    }
    componentDidMount(){
      this.fetchData();
    }
  
      render(){
          return(
                  <View>
                      <Text style={{textAlign: 'center'}}>{this.state.time}</Text>
                  </View>
          )
      }
  }
  export default WebData;