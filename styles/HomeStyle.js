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
});

module.exports = HomeStyle;
