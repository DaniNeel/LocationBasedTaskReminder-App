//This is an example code for React Native Floating Action Button//
import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage,YellowBox} from 'react-native';
import NewAddTask from './NewAddTask';
import LocationIQ from 'react-native-locationiq';
//import react in our code.
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
//import all the components we are going to use.

export default class NewHome extends Component {
	static navigationOption={header:null}
	constructor(props)
	{
		 YellowBox.ignoreWarnings(['Setting a timer']);
		super(props);
	}
	
	async componentDidMount() {
		
	
			const firebaseConfig = {
  apiKey: "AIzaSyDLs_YS5Es3SY9Xmqzk7axHBN-5gi3C_CI",
  authDomain: "location-reminder-5f94e.firebaseapp.com",
  databaseURL: "https://location-reminder-5f94e.firebaseio.com",
  projectId: "location-reminder-5f94e",
  storageBucket: "location-reminder-5f94e.appspot.com",
  messagingSenderId: "164112422729",
  appId: "1:164112422729:web:17cbfa731b20657d1aac98",
  measurementId: "G-QPNQ39XLDB"
};
			if(!firebase.apps.length){
		firebase.initializeApp(firebaseConfig);
			}
			var ref = firebase.database().ref('location');
	var query = ref.orderByChild("email").equalTo(global.email);
	
		   query.on('value', snapshot=> {
            				
               if(snapshot.val())
			   {
				   Actions.newhomeafteradd();
			   }
            
            //console.log("items_load: " + items);
        });
	}
	
  clickHandler =  () => {
	   
    console.log(global.email);
	Actions.newaddtask();
  };
     clickHandler3 = () => {
    
	AsyncStorage.clear();
	Actions.login();
  };
 

  render() {
	  return (
			<View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Add New Task" onPress={this.clickHandler}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
           <ActionButton.Item buttonColor='#FFFF00' title="Logout" onPress={this.clickHandler3}>
            <Icon name="md" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
      
		 );
	
    
    
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
   actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});