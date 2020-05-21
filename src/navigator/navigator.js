import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from '../router/router';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { FIRST_EVER_APP_START, LOGIN_CHECK } from "../constants/StorageConstans";
import { createStore, applyMiddleware } from 'redux';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';
import firebase from 'react-native-firebase';


class App extends Component {
	state = { firstTime: true, loading: true, logincheck: true}


	notificationListener() {
		console.log("function", "in function");
		firebase
		  .notifications()
		.onNotification((localnotification) => {
		  console.log("local notification : ", localnotification.notificationId);
		  console.log("local notification data : ", localnotification.data);
		  console.log("local notification body : ", localnotification.body);
		  console.log("local notification title : ", localnotification.title);
		  const localNotification = new firebase.notifications.Notification({
			data: localnotification.data,
			body: localnotification.body,
			title: localnotification.title,
			sound: "default",
			show_in_foreground: true,
		  });
		  if (Platform.OS == "android") {
			const channel = new firebase.notifications.Android.Channel(
			  localnotification.notificationId,
			  "uc channel",
			  firebase.notifications.Android.Importance.Max
			).setDescription("uc channel");
			// Creating the channel
			firebase.notifications().android.createChannel(channel);
			localNotification.android
			  .setPriority(firebase.notifications.Android.Priority.High)
			  .android.setBigPicture('','',localnotification.title,localnotification.body)
			  .android.setBigText(localnotification.body,localnotification.title,localnotification.body)
			  .android.setChannelId(localnotification.notificationId)
			//   .android.setSmallIcon('R.mipmap.logo')
			//   .android.setLargeIcon('R.mipmap.logo')
			  .android.setVibrate(1000);
		  }
		  firebase
			.notifications()
			.displayNotification(localNotification)
			.catch((error) => {
			  console.log(error);
			});
		});
	  }

	componentDidMount() {
		this.notificationListener();
		AsyncStorage.getItem(FIRST_EVER_APP_START).then((value) => {
			if (value != null) {
				this.setState({ logincheck: false })
			}
			SplashScreen.hide()
			this.setState({ loading: false })
		});
	}

	render() {
		if (this.state.loading) {
			return null;
		}
		if (this.state.logincheck) {
			const Layout = createAppContainer(createRootNavigator('GOTOWALK'));
			return (
				<Provider store={createStore(reducers, {},applyMiddleware(ReduxThunk))}>
					<Layout />
				</Provider>
			)
		}
		else if (this.state.logincheck == false) {
				const Layout = createAppContainer(createRootNavigator('GOTOHOME'));
				return (
					<Provider store={createStore(reducers, {},applyMiddleware(ReduxThunk))}>
						<Layout />
					</Provider>
				)	
			}	
		}
}

export default App;