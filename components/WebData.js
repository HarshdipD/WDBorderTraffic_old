import React , {Component} from 'react';
import {FlatList, Text, View,  } from 'react-native';



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
    { 
  
      try{

      const res = await fetch('http://192.168.1.35:3003/ready');
      const users = await res.json();
      var a = this.state.key;
      var result = users[0][a];
      this.setState({data: users,time:result});
      console.log(users);
      console.log(a);
  
      
    }
    catch(error){
      console.error(error);
    }
    }
    componentDidMount(){
      setTimeout(()=>{this.fetchData();},4000);
    }
  
      render(){
          return(
          
                  <FlatList
                  keyExtractor={(item,index)=> index.toString()}
                  renderItem={({item})=>
                  <View>
                      <Text style={{textAlign: 'center'}}>{this.state.time}
                      </Text>
                      </View>
                  }>
  
              </FlatList>
  
          )
      }
  }
  export default WebData;