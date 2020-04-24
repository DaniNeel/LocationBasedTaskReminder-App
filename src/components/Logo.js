import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
} from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image style={{width:70,height:90}} source={require('../images/images.png')}/>
				<Text style={styles.logoText}>Welcome to Reminder</Text>
			</View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
      
      backgroundColor: '#455a64',
      flexGrow:1,
      alignItems:'center',
      justifyContent:'flex-end',
    //  paddingTop:'20',
    },
	logoText:{
		marginVertical:15,
		fontSize:18,
		color:'rgba(255,255,255,0.7)'
	}
});
