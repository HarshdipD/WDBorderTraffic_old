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
    { try{
      
      const res = await fetch('http://10.0.9.50:3003/ready');
      const users = await res.json();
      var a = this.state.key;
      var result = users[0][a];
      this.setState({data: users,time:result});
      console.log(users);
  
      
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
          
                  <FlatList
                  data={this.state.data}
                  value={this.state.data}
                  keyExtractor={(item,index)=> index.toString()}
                  renderItem={({item})=>
                  <View>
                      <Text style={{color:'red'}}>{this.state.time}
                      </Text>
                      </View>
                  }>
  
              </FlatList>
  
          )
      }
  }
  export default WebData;