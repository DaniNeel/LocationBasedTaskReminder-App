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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image,
  Switch,
  Header,
} from 'react-native';
import {AsyncStorage} from 'react-native';
export default class newhomeafteradd extends Component {
	static navigationOption={header:null}
	
	constructor(props) {
	 YellowBox.ignoreWarnings(['Setting a timer']);
    super(props);
	this.state={
		token:null,
		notification:null,
		latitude: 0,
        longitude: 0,
		latitude1: 0,
        longitude1: 0,
		d:0,
		listing:[],
		listing1:[],
		dist:9999,
		location:'',
		task:'',
		view:'',
	};
	  
    
	

  }
 
	  renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
	  };
	
	async componentDidMount() {
		
		  
		var ref = firebase.database().ref('location');
	var query = ref.orderByChild("email").equalTo(global.email);
		var items = [];
		var items1=[];
       query.on('value', snapshot=> {
            snapshot.forEach(childSnapshot=> {				
               var childKey = childSnapshot.key;
             var childData = JSON.parse(childSnapshot.val().loc);
			 var childData1 = JSON.parse(childSnapshot.val().task);
              items.push(childData);
			  items1.push(childData1);
			 
            }) 
            
        });
	await	 this.setState({ listing:[...this.state.listing, ...items ],isLoaded:false})
	await	 this.setState({ listing1:[...this.state.listing1, ...items1 ],isLoaded:false})
	
			
			
  }
	
	
  clickHandler = () => {
    
	Actions.newaddtask();
  };
   clickHandler1 = () => {
	   
	   var ref=firebase.database().ref('location');
		var query=ref.orderByChild("email").equalTo(global.email);
               
        query.once("value",async snapshot=>{
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
        body: "Finish First"+this.state.location+" "+this.state.task+"Distance:"+dis,
		 //sdata: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

		 
    });
	 
  };
 handleNotification = notification => {
    this.setState({
      notification
    });
  };
   clickHandler2 = () => {
    
	Actions.newview();
  };
  clickHandler3 = () => {
    AsyncStorage.clear();
	Actions.login();
  };
  getListViewItem = (item) => {  
		var ref=firebase.database().ref('location');
		var query=ref.orderByChild("email").equalTo(global.email);
		console.log("in jkjkj"+item);
		query.once("value",snapshot=>{
		snapshot.forEach(child=>{
			console.log(child.val().task);
			if(item==JSON.parse(child.val().task))
			{			
				var s=JSON.parse(child.val().loc);
				var lat=JSON.parse(child.val().latitude);
				var longi =JSON.parse(child.val().longitude);
				global.view=s;
				global.lat=lat;
				global.longi=longi;
				
			}
		 })
	})
	navigator.geolocation.getCurrentPosition(
                    function(position){
                       global.slat=position.coords.latitude;
					   global.slong=position.coords.longitude;
					});   
		
		

        this.props.navigation.navigate('newviewdetail',{q:item,x:global.view}); 
    }  
	


  render() {
	  
    return (
      <View style={styles.MainContainer}>
	
		 <FlatList  
                    data={this.state.listing1} 
					
					 ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item}) =>  
					 <View style={{flex:1, flexDirection: 'row'}}>
						<Image source={require('../images/location.png')} style={styles.imageView} />
                        <Text style={styles.item}  
                             onPress={this.getListViewItem.bind(this, item)} >{item}</Text>
						
					</View>
					}
				 keyExtractor={(item, index) => index.toString()}
                />  
		
               <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Add New Task" onPress={this.clickHandler}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Start Task" onPress={this.clickHandler1}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="View Tasks On Map" onPress={this.clickHandler2}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
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
	margin:5,
    //alignItems: 'center',
    //backgroundColor: '#F5F5F5',
  },actionButtonIcon: {
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
   v_container: {
      flex: 1,
      padding: 8,
      flexDirection: 'column', // main axis
      justifyContent: 'center', // main axis
      alignItems: 'center', // cross axis
      //backgroundColor: colors.background_dark,
    },
	container: {
      marginTop: 14,
      alignSelf: "stretch",
    },
    row: {
      elevation: 1,
      borderRadius: 2,
      //backgroundColor: colors.tertiary,
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
    },
    row_cell_timeplace: {
      flex: 1,
      flexDirection: 'column',
    },
    row_cell_temp: {
      //color: colors.weather_text_color,
      paddingLeft: 16,
      flex: 0,
     // fontSize: values.font_temp_size,
      //fontFamily: values.font_body,
    },
    row_time: {
      //color: colors.weather_text_color,
      textAlignVertical: 'bottom',
      includeFontPadding: false,
      flex: 0,
      //fontSize: values.font_time_size,
      //fontFamily: values.font_body,
    },
    row_place: {
      //color: colors.weather_text_color,
      textAlignVertical: 'top',
      includeFontPadding: false,
      flex: 0,
      //fontSize: values.font_place_size,
      //fontFamily: values.font_body,
    },
	 item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    }, 
 
imageView: {
 
    width: 40,
    height: 40 ,
    margin: 5,
    
 
},	
imageView1: {
 
    width: 60,
    height: 60 ,
    margin: 10,
	marginLeft:320,
	marginTop:-32,
   borderRadius:100
	
},
});