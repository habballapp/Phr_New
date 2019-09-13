import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems } from "react-navigation";
import Walkthrough from './components/screens/walkthrough/Walkthrough';
import Login from './components/screens/Login/Login';
import Home from './components/screens/Home/Home';
import Doctors from './components/screens/Doctor/Doctors';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react';

var {heigth , width} = Dimensions.get('window');

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
})

const CustomHeaderContentComponent = (props) => {
  return (
    <View>
      <View style={styles.headerContainerStyle}>
        <Text style= {styles.headerUserTextStyle}>Welcome, User</Text>
      </View>
      <DrawerItems {...props}/>
    </View>
  )
}
let drawerNavigationConfig = {
  drawerWidth: width/1.3,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: CustomHeaderContentComponent
}

const Drawer = createDrawerNavigator({
  AppHome: Home,
}, drawerNavigationConfig)

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
      },
      DoctorScreen:{
        screen: Doctors
      }
    },
    {
      initialRouteName: signedIn === 'GOTOWALK' ? "Walkthrough" : signedIn === 'GOTOLOGIN' ? "Login" : "null"
    }
  )
  
}

const styles = {
  headerUserTextStyle:{color: 'white',fontSize: 24, position:'absolute', bottom:1, alignSelf: 'center'},
  headerContainerStyle:{height:120, backgroundColor:'#0080ff'}
}