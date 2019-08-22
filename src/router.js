import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Walkthrough from './components/screens/walkthrough/Walkthrough';
import Login from './components/screens/Login/Login';

const ApplicationWalkThrough = createStackNavigator({
  Walkthrough: {
    screen: Walkthrough,
    navigationOptions:{
      header:null
    }
  }
});
const LoginStackScreen = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      header:null
    }
  }
});

export const createRootNavigator = (signedIn) => {
  return createSwitchNavigator(
    {
      Walkthrough: {
        screen: ApplicationWalkThrough
      },
      Login: {
        screen: LoginStackScreen
      },
    },
    {
      initialRouteName: signedIn === 'GOTOWALK' ? "Walkthrough" : signedIn === 'GOTOLOGIN' ? "Login" : "null"
    }
  )
}
