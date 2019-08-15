import { StyleSheet } from 'react-native';

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
    tableLay: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: 50,
      alignContent: 'center',
      alignItems: 'center', 
    },
    tableRow: {
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    tableCol: {
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'column',
      backgroundColor: '#fff',
      opacity: 0.9,
      marginHorizontal: 50,
      borderWidth: 1,
      borderRadius: 10,
      shadowOffset: {height: 5, width: 10},
      shadowColor: 'red',
      
    },
});

module.exports = HomeStyle;
