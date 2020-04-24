import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import getDirections from 'react-native-google-maps-directions';

export default class NewViewDetail extends Component {

	constructor(props) {
   
    super(props);
	this.state={
	
	}

  }
  myFunc=()=>{
		
		const {navigation}=this.props;
		var l=JSON.stringify(navigation.getParam('q','item'));
		
		 this.props.navigation.navigate('newfinish',{w:l});
	}
  
  myFunc1=()=>{
	  
	  Alert.alert(
     
      'Are You Sure?',
      //body
      'Do you want to mark Done ?',
      [
        {text: 'Yes', onPress: this.myFunc.bind(this)},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }
  
  handleGetDirections = () => {
    const data = {
       source: {
        latitude: global.slat,
        longitude: global.slong
      },
      destination: {
        latitude: global.lat,
        longitude: global.longi
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      /*waypoints: [
        {
          latitude:global.slat,
        longitude: global.slong
        },
      
       

      ]*/
    }

    getDirections(data)
  }
  clickHandler = (loc) => {
    
	 this.props.navigation.navigate('newviewsingle',{v:loc});
	//Actions.demo();
  };
  render() {
	    const {navigation}=this.props;
		var task=JSON.stringify(navigation.getParam('q','item'));
		var loc=JSON.stringify(navigation.getParam('x','lx'));
		//var loc=global.view;
    return (
      <View style={styles.container}>
          <View style={styles.header}>
			
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                source={require('../images/taskdetail.png')}/>

              
            </View>
          </View>
		  <TouchableOpacity onPress={this.handleGetDirections}>
			<Image source={require('../images/direction1.png')} style={styles.imageView1}  />
		</TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.bodyContent}>

				<View style={{flex:1, flexDirection: 'row'}}>
						<Image source={require('../images/task.png')} style={styles.imageView}  />
                        <Text style={styles.item}  
                              >{task}</Text>
						
					</View>
				


            </View>
				<View style={{flex:1, flexDirection: 'row'}}>
						<Image source={require('../images/tasklocation2.png')} style={styles.imageView}  />
                        <Text style={styles.item}  
                              >{loc}</Text>
							  
					
				
						
					</View>
						
				
				
        </View>
		<View>
					<TouchableOpacity style={styles.buton} onPress={this.myFunc1} >
					<Text style={styles.buttonText}>Mark Done</Text>
				</TouchableOpacity>	 
			</View>
		
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#1abc9c",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },

  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:40,
    flexDirection: 'row',
    //flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:22,
    color: "#696969",
  },
  imageView: {
 
    width: 40,
    height: 40 ,
    margin: 10,

   
 
},
imageView1: {
 
    width: 60,
    height: 60 ,
    margin: 10,
	marginLeft:320,
	marginTop:-32,
   borderRadius:100
	
},

item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
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
		marginTop:345
		
		
		
	},
});