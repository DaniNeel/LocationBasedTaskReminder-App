import React  from 'react';
import {PureComponent} from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import LocationIQ from 'react-native-locationiq';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
import firebase from 'firebase';

import { YellowBox } from 'react-native';



import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
const styles=StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    },
	map: {
        position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
	  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  }
});


export default class view extends PureComponent {

  constructor(props) {
    YellowBox.ignoreWarnings(['Setting a timer']);
    super(props);
	//global.dist=0;
	this.state={
		latitude: 0,
        longitude: 0,
		dist:0,
    listing:[],
	task:''
    
	}

  }
  

  componentDidMount() {	
        var ref=firebase.database().ref('location');
       // ref.on('value',gotData,errData);
       // var query=ref.orderByChild("em").equalTo(global.em);
       ref.once("value",snapshot=>{
            snapshot.forEach(child=>{
              this.setState({listing:[...this.state.listing,
                 {latitude:parseFloat(child.val().latitude),longitude:parseFloat(child.val().longitude)} ]
              });
                console.log(child.key,child.val().latitude,child.val().longitude);
                var lat=parseFloat(child.val().latitude);
                var lon=parseFloat(child.val().longitude);
				
                  this.state.listing.push({
                    latitude: lat,
                    longitude: lon
                  });
				  this.setState({task:child.val().task});
                console.log("state valu");
               console.log(this.state.listing);

        //         // }));
         });
      
    });
        
  }
  
		render(){
			let d=global.dist;
    return (
      <View style={styles.container}>

	  {/* <MapView style={styles.map}
			zoomEnabled={true}
            showsUserLocation={true}
			followUserLocation = { true }
          initialRegion={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude),
            latitudeDelta:150,
            longitudeDelta:150
          }}>
		  
		  <MapView.Marker
          coordinate={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude)
          }}></MapView.Marker>
		  
      </MapView>
	  <View style={styles.bottomView}>
	 {/* <Text style={styles.txtStyle}>{d}</Text>
      */}
       <MapView
              style={{ position: 'absolute',
              top: 0,
              left:0,
              right:0,
              bottom: 0}}
              initialRegion={{
                latitude: 22.2587,
                longitude: 71.1924,
                latitudeDelta: 0.6,
                longitudeDelta: 0.6,
              }}>

                {this.state.listing.map((coordinate) => {
                        return  (<MapView.Marker
                          onPress={() => alert('task:'+this.state.task)}
                          coordinate={coordinate}
                          />)
            })}
        </MapView>
        
	
	  </View>
    );
  }
}
