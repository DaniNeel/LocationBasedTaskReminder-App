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
export default class Signup extends Component {
	
	
	
	
	goback(){
		Actions.pop()
	}
    render(){
        return(
            <View style={styles.container}>
                <Logo/>
				<Form type="Signup"/>
				<View style={styles.signupText}>
					<Text style={styles.signupTextt}>Already have an account yet?</Text>
					<TouchableOpacity onPress={this.goback}><Text style={styles.signupbutton}>Sign in</Text></TouchableOpacity>
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
	  paddingVertical:10,
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
