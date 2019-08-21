import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from '../router';
import { AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { firstTime: true, loading: false }
	}

	componentDidMount() {
		SplashScreen.hide()
		this.setState({ loading: true })
		AsyncStorage.getItem('first_time').then((value) => {
			if (value != null) {
				this.setState({ firstTime: false })
			}
			this.setState({ loading: false })
		});
	}

	render() {
		if (this.state.loading) {
			return null;
		}
		if (this.state.firstTime) {
			console.log("....firstTime if", this.state.firstTime)
			const Layout = createAppContainer(createRootNavigator('GOTOWALK'));
			return <Layout />
		}
		else if (this.state.firstTime == false) {
			console.log("....firstTime else", this.state.firstTime)
			const Layout = createAppContainer(createRootNavigator('GOTOLOGIN'));
			return <Layout />
		}
	}
}

export default App;