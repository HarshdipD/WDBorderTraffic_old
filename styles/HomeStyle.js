import { StyleSheet } from 'react-native';

const HomeStyle = StyleSheet.create({
    container: {
      flex: 1
    },
    CompareContainer: {
      flex: 2,
      backgroundColor: 'white',
      textAlign: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      paddingTop: 20,
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
      paddingTop: 10,
      textTransform: 'uppercase',
      fontSize: 18,
      fontWeight: 'bold',
    },
    TextHeadLink: {
      color: 'white',
      textAlign: 'right',
      fontSize: 12,
      paddingRight: 20,
      paddingTop: 10,
    },
    CompareText: {
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    tableLay: {
      flex: 4,
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 40,
      alignContent: 'center',
      alignItems: 'center', 
    },
    tableRow: {
      flex: 2,
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
      marginHorizontal: 20,
      borderWidth: 1,
      borderRadius: 10,
      shadowOffset: {height: 5, width: 10},      
    },
    dataBox:{
      alignContent: 'center',
    },
    timeRow: {
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center', 
    },
    timeCol:{
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      color: '#fff'
    }

});

module.exports = HomeStyle;
