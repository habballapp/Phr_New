// importing navigation routers from react navigation;
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
// importing navigation options and header props for  different screens
import { NonHeaderProps } from "./HeaderProps";
// importing different screen layouts
import Walkthrough from '../components/screens/walkthrough/Walkthrough';
import Login from '../components/screens/Login/Login';
import Home from '../components/screens/Home/Home';
import Signup from '../components/screens/Signup/Signup';

// importing side drawer component props
import { DrawerNavigationConfig } from "./SideDrawer";

const ApplicationWalkThrough = createStackNavigator({
  Walkthrough: {
    screen: Walkthrough,
    navigationOptions: NonHeaderProps
  }
});

const LoginStackScreen = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: NonHeaderProps
  },
  SignUp: {
    screen: Signup,
    navigationOptions: NonHeaderProps
  }
})

const Drawer = createDrawerNavigator({
  AppHome: Home,
}, DrawerNavigationConfig)

export const createRootNavigator = (signedIn) => {
  return createSwitchNavigator(
    {
      Walkthrough: {
        screen: ApplicationWalkThrough
      },
      Login: {
        screen: LoginStackScreen
      },
      HomeScreen: {
        screen: Drawer,
      }
    },
    {
      initialRouteName: signedIn === 'GOTOWALK' ? "Walkthrough" : signedIn === 'GOTOLOGIN' ? "Login" : "null"
    }
  )
}
