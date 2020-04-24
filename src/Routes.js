import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';

import {Router,Stack,Scene} from 'react-native-router-flux';
import Login from './pages/Login';
import Signup from './pages/Signup';

import NewHome from './pages/NewHome';
import NewAddTask from './pages/NewAddTask';
import newhomeafteradd from './pages/newhomeafteradd';
import NewViewDetail from './pages/NewViewDetail';
import NewFinish from './pages/NewFinish';
import NewViewSingle from './pages/NewViewSingle';
import NewStart from './pages/NewStart';
import NewView from './pages/NewView';

import firebase from 'firebase';

export default class Routes extends Component {
	componentDidMount() {
		
	
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
			//console.disableYellowBox = true;
	}
    render(){
        return(
            <Router>
				<Stack key="root">
					<Scene key="login" component={Login} initial={true}   />
					<Scene key="signup" component={Signup}/>
					
					<Scene key="newhome" title="Task Nearby" component={NewHome}    />
					<Scene key="newaddtask" title="Add Task" component={NewAddTask}   />
					<Scene key="newhomeafteradd"  title="Task Nearby" component={newhomeafteradd}   />
					<Scene key="newviewdetail" title="Task Details"  component={NewViewDetail}   />
					<Scene key="newfinish" component={NewFinish}  />
					<Scene key="newviewsingle" component={NewViewSingle}  />
					<Scene key="newstart" component={NewStart}  />
					<Scene key="newview" component={NewView}  />
					
				</Stack>
			</Router>
        )
    }
}