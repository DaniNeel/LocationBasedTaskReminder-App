import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import { YellowBox } from 'react-native';
import {AsyncStorage} from 'react-native';
import NewHome from './NewHome';
import Reinput from 'reinput'
import {
	Alert,
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
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
import LocationIQ from 'react-native-locationiq';
export default class NewAddTask extends React.Component
{
	constructor(props)
	{
		
    
		super(props);
	this.state={
			token:null,
			notification:null,
			msg:'error',
			task:'',
			location:'',
			loading:false,
			 latitude: 0,
            longitude: 0,
            error: null,
            Address: null
		};
		 
	}
	myFunc=async()=>{
		
			const {task,location}=this.state;
			console.log(location);
			console.log(task);
			
			if (task === "") {
				this.setState(() => ({ nameE: "Task required."}));
			} else {
				this.setState(() => ({ nameE: null}));
			}
			if (location === "") {
				this.setState(() => ({ nameError: "Location required."}));
			} else {
				this.setState(() => ({ nameError: null}));
			}
			LocationIQ.init("4e5b5d3f9046aa"); // use a valid API key
		var lat,lon;
		//global.dist=0;
		 var ts=JSON.stringify(task);
		 var ls=JSON.stringify(location);
		var email1=global.email;
		LocationIQ.search(location)
			.then(json => {
			  //console.log("Coordinate");
				 lat = json[0].lat;
				 lon = json[0].lon;
				 var newdata={
						email:email1,
						latitude:lat,
						longitude:lon,
						loc:ls,
						task:ts
					}
				var my=firebase.database().ref('location').push(newdata);
					
					
				console.log(lat, lon);
			navigator.geolocation.getCurrentPosition(
			
		function(position) {

			var x=geolib.getDistance(position.coords, {
					latitude: lat,
					longitude: lon,
				});
			console.log(x/1000,'km');	
			global.dist=x/1000;
			this.setState({d:x/1000});
		}.bind(this),
		() => {
			alert('Position could not be determined.');
		},
	);		
			this.setState({
					latitude:lat,
					longitude:lon
					//d:global.dist
					});	
				
			})
			.catch(error => console.warn(error));
			
			
		
	
		Actions.newhomeafteradd();
		
	}
	
		
	/*myFunc= async() => {
		
		 const { status } =await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();
	console.log(token);
    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
			
		 
		
		
		const {task,location}=this.state;
			if (task === "") {
				this.setState(() => ({ nameE: "Task required."}));
			} else {
				this.setState(() => ({ nameE: null}));
			}
			if (location === "") {
				this.setState(() => ({ nameError: "Location required."}));
			} else {
				this.setState(() => ({ nameError: null}));
			}
			if(task!=''&&location!='')
			{
				 fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
		title: "REMAINDER",
        body: "TASK ADDED",
		 //sdata: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
				//		console.log(task+location);
				this.task.clear();
				this.location.clear();
				//Actions.map();
				this.props.navigation.navigate('map',{t:location,l:task});
			}
	}
	handleNotification = notification => {
    this.setState({
      notification,
    });
  };*/
 
 render()
 {
	 /*AsyncStorage.getItem('name').then(function(res){
			if(res==null)
	 {
		 Actions.login();
	 }	 
	 });*/
	 
    return(
       <View style = { styles.container }>
	
		
<Reinput style={styles.re} label='Remind me about' value={this.state.task}   keyboardType="email-address" onChangeText={task => this.setState({task})} ref={(input)=> this.task = input} labelActiveColor="#1abc9c"labelColor="#A9A9A9"  />
						{!!this.state.nameE && (
					<Text style={{color: ''}}>
					{this.state.nameE}
						</Text>)}
				
				<Reinput style={styles.re1} label='Add Location'  value={this.state.location}   onChangeText={location => this.setState({location})} ref={(input)=> this.location = input} labelActiveColor="#1abc9c" labelColor="#A9A9A9" />
				
				{!!this.state.nameError && (
					<Text style={{color: 'white'}}>
					{this.state.nameError}
						</Text>)}
				
				<TouchableOpacity style={styles.buton} onPress={this.myFunc.bind(this)}>
					<Text style={styles.buttonText}>SAVE</Text>
				</TouchableOpacity>	   
	   </View>
    );
 }
}
const styles=StyleSheet.create({
    container: {
      
      backgroundColor: '#FFFFFF',
      flexGrow:1,
      alignItems:'center',
      justifyContent:'center',
	
    },
	re:{
		paddingBottom:200,
		marginBottom:1,
		marginTop:10,
		width:400,
		
	},
	re1:{
		paddingBottom:250,
		marginTop:-170,
		width:400,
		
	},
	inputbox:{
		width:250,
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
		width:400,
		height:40,
		backgroundColor:'#1abc9c',
		borderRadius:25,
		marginVertical:10,
		paddingVertical:12,
		marginBottom:-200
		
		
		
	},
	ImageStyle: {
   paddingBottom:200,
		marginBottom:1,
		marginTop:10,
		

    
},
	
	
});
