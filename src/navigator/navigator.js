import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from '../router/router';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { FIRST_EVER_APP_START, LOGIN_CHECK } from "../constants/StorageConstans";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk'

class App extends Component {
	state = { firstTime: true, loading: true, logincheck: true}

	componentDidMount() {
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