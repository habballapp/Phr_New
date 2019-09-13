import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from '../router/router';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { FIRST_EVER_APP_START } from "../constants/StorageConstans";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';

class App extends Component {
	state = { firstTime: true, loading: true }

	componentDidMount() {
		AsyncStorage.getItem(FIRST_EVER_APP_START).then((value) => {
			if (value != null) {
				this.setState({ firstTime: false })
			}
			SplashScreen.hide()
			this.setState({ loading: false })
		});
	}

	render() {
		if (this.state.loading) {
			return null;
		}
		if (this.state.firstTime) {
			const Layout = createAppContainer(createRootNavigator('GOTOWALK'));
			return <Layout />
		}
		else if (this.state.firstTime == false) {
			const Layout = createAppContainer(createRootNavigator('GOTOLOGIN'));
			return (
				<Provider store={createStore(reducers)}>
					<Layout />
				</Provider>
			)
		}
	}
}

export default App;