import * as WebBrowser from 'expo-web-browser';
import React,{Component} from 'react';
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

 //import { MonoText } from '../components/StyledText';
 //import Login from '../src/pages/Login';
 //import Signup from '../src/pages/Signup';
 import Routes from '../src/Routes';
 import firebase from 'firebase';
 //import Map from '../src/pages/Map';
//export default function HomeScreen() {
	
export default class HomeScreen extends Component {
	componentWillMount()
	{
			const firebaseConfig = {
			   apiKey: "AIzaSyDR6Q-c96bjsLqABehAL1m13z-QQ28ObB8",
  authDomain: "locationtaskremainder-74b7a.firebaseapp.com",
  databaseURL: "https://locationtaskremainder-74b7a.firebaseio.com",
  projectId: "locationtaskremainder-74b7a",
  storageBucket: "locationtaskremainder-74b7a.appspot.com",
  messagingSenderId: "1085289381045",
  appId: "1:1085289381045:web:f7f769c5b7c9c3529052fc",
  measurementId: "G-H322S3DYD2"
			};
			if(!firebase.apps.length){
		firebase.initializeApp(firebaseConfig);
			}
	}
	
    render(){
	
  return (
    <View > 
      <Routes/>
    </View>  
  );
	}
}

 const styles = StyleSheet.create({
   container: {
     //backgroundColor: '#455a64',
     flex:1,
     //alignItems:'center',
    // justifyContent:'center',
   }
 });
