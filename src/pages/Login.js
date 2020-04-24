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
} from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
	
	
	
	signup(){
		Actions.signup()
	}
	
    render(){
        return(
            <View style={styles.container}>
                <Logo/>
				<Form type="Login"/>
				<View style={styles.signupText}>
					<Text style={styles.signupTextt}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupbutton}>Signup</Text></TouchableOpacity>
				</View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
      
      backgroundColor: '#455a64',
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },

	signupText:{
		flexGrow:1,
      alignItems:'flex-end',
      justifyContent:'center',
	  paddingVertical:16,
	  flexDirection:'row',
	},
	signupTextt:{
		color:'rgba(255,255,255,0.6)',
		fontSize:16,
		
		paddingTop:150,
	},
	signupbutton:{
		"color":"#ffffff",
		"fontSize":16,
		"fontWeight":"500",
	}
});
