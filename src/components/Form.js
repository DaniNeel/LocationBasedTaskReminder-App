import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';


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

export default class Form extends Component {
	
	static navigationOption={header:null}
	
	
	constructor(props)
	{
		super(props);
		this.state={
			msg:'error',
			email:'',
			password:'',
			loading:false,
		};
		  this.myFunc = this.myFunc.bind(this);
		  global.email="";
	}
	
	
	
	
	myFunc= () => {
		
		const {email,password}=this.state;
			if (email === "") {
				this.setState(() => ({ nameE: "Email required."}));
			} else {
				this.setState(() => ({ nameE: null}));
			}
			if (password === "") {
				this.setState(() => ({ nameError: "Password required."}));
			} else {
				this.setState(() => ({ nameError: null}));
			}
		if(email!=''&&password!='')
		{
		if(this.props.type=='Signup')
		{
			
			   firebase.auth().createUserWithEmailAndPassword(email,password)
			.then(()=>{
				
				alert("Successfully registered Email:"+email);
				var myRef = firebase.database().ref('user').push();
			  var key = myRef.key;
			console.log(key);
			  var newData={
				  
					email: email,
				  Password : password
			   }

			   myRef.push(newData);
			   Actions.pop();
			})
			.catch(()=>{
					
				alert("User already exist Try with new Credentials");
				this.email.clear();
				this.password.clear();
			})
			   
		}
		else{
			firebase.auth().signInWithEmailAndPassword(email,password)
			.then(()=>{
				AsyncStorage.setItem('name',email);
				global.email=email;
				alert("Successfully Login");
				Actions.newhome();

			})
			.catch(()=>{
				
				alert("Authentication Failed Please try again");
				this.email.clear();
				this.password.clear();
			})
			
		}
		}
		
	}
	
	
    render(){
		if(AsyncStorage.getItem('name')==this.state.email)
		{
			console.log(AsyncStorage.getItem('name'));
			Actions.home();
		}
        return(
            <View style={styles.container}>
			
                <TextInput style={styles.inputbox} value={this.state.email} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" selectionColor='#fff' keyboardType="email-address" onChangeText={email => this.setState({email})} ref={(input)=> this.email = input}  placeholderTextColor="#ffffff" />
						{!!this.state.nameE && (
					<Text style={{color: 'white'}}>
					{this.state.nameE}
						</Text>)}
				
				<TextInput style={styles.inputbox} value={this.state.password}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Password" onChangeText={password => this.setState({password})} secureTextEntry={true} ref={(input)=> this.password = input} placeholderTextColor="#ffffff" />
				
				{!!this.state.nameError && (
					<Text style={{color: 'white'}}>
					{this.state.nameError}
						</Text>)}
				
				<TouchableOpacity style={styles.buton} onPress={this.myFunc.bind(this)}>
					<Text style={styles.buttonText}>{this.props.type}</Text>
				</TouchableOpacity>
			</View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
      
      backgroundColor: '#455a64',
      flexGrow:1,
      alignItems:'center',
      justifyContent:'center',
   
    },
	inputbox:{
		width:300,
		height:40,
		backgroundColor:'rgba(255,255,255,0.2)',
		borderRadius:25,
		paddingHorizontal:16,
		fontSize:16,
		color:'#ffffff',
		marginVertical:10,
	},
	buttonText:{
		fontSize:16,
		fontWeight:'500',
		color:'#ffffff',
		textAlign:'center',
	},
	buton:{
		width:300,
		height:40,
		backgroundColor:'#1c313a',
		borderRadius:25,
		marginVertical:10,
		paddingVertical:12,
		
		
	}
	
	
});
