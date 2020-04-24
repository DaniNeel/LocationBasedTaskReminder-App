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

import { YellowBox } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Geocoder from 'react-native-geocoding';
//import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

export default class Start extends React.Component {

    constructor(props) {
        YellowBox.ignoreWarnings(['Setting a timer']);
        super(props);
        //global.dist=0;
        this.state={
			token:null,
			notification:null,
            latitude: 0,
          longitude: 0,
            dist:9999,
            location:'',
			task:''
        }
      }
      


    componentDidMount() {

        var ref=firebase.database().ref('location');
//        var query=ref.orderByChild("em").equalTo(global.em);
               
        ref.once("value",async snapshot=>{
            snapshot.forEach(child=>{
              
                console.log(child.key,child.val().latitude,child.val().longitude);
                var lat1=child.val().latitude;
                var lon1=child.val().longitude;
                var loc=child.val().task;
				var tas=child.val().loc;
                navigator.geolocation.getCurrentPosition(
                    function(position){
                        var x=geolib.getDistance(position.coords,{
                            latitude:lat1,
                            longitude:lon1,
                        });
                        console.log(x/1000,'km');
                        var dis=x/1000;
                        
                        if(this.state.dist>=dis)
                        {
                            this.setState({dist:dis})
                            console.log(this.state.dist);
                            this.setState({latitude:lat1,
                                longitude:lon1,
								location:loc,
								task:tas
                                });
                        }
                                             
                        console.log("minimum",this.state.latitude,this.state.longitude);//this.state.location);
                        
                    }.bind(this),
                        ()=>{
                        alert("position cound nopt determine");
                    },
            );
            
         });
		 	const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } =  await Permissions.askAsync(Permissions.NOTIFICATIONS);
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

   fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
		title: "REMAINDER",
        body: "Finish First"+this.state.location+" "+this.state.task,
		 //sdata: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
	Actions.newhomeafteradd();
		 
    });
	
  }
	
 

	handleNotification = notification => {
    this.setState({
      notification
    });
  };
   
    render(){
       return(
		<View>
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
      }
  });