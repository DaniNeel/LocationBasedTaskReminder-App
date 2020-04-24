import React,{Component}from 'react';
import {PureComponent} from 'react';
import {Actions} from 'react-native-router-flux';
import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import LocationIQ from 'react-native-locationiq';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
import firebase from 'firebase';
//import DropdownMenu from 'react-native-dropdown-menu';
import { YellowBox } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Geocoder from 'react-native-geocoding';

//import { Dropdown } from 'react-native-material-dropdown';
//import Geolocation from 'react-native-geolocation-service';
import {
  Platform,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

export default class NewFinish extends React.Component {
	constructor(props)
	{
		
    
		super(props);
	}
	componentDidMount(){
				const {navigation}=this.props;
		var item=navigation.getParam('w','l');
		
	var ref=firebase.database().ref('location');
    var query=ref.orderByChild("task").equalTo(item);
	ref.once("value",snapshot=>{
		snapshot.forEach(child=>{
			
			if(item==child.val().task)
			{			
				var p=child.key;
				ref.child(p).remove();
				
			}
		 })
	})
	firebase.database().ref('location').on('value', snapshot=> {
            				
               if(snapshot.val())
			   {
				   Actions.newhomeafteradd();
			   }
			   else{
				   Actions.newhome();
			   }
            
            //console.log("items_load: " + items);
        });
		
	}
	render(){

		
        return(
			<View>
			</View>
		
		)
	}

}