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

      const res = await fetch('http://192.168.0.26:3003/ready');
      const users = await res.json();
      var a = this.state.key;
      var result = users[0][a];
      this.setState({data: users,time:result});
      console.log(users);
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
          
                  <FlatList
                  data={this.state.data}
                  value={this.state.data}
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