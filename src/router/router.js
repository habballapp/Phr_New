// importing navigation routers from react navigation;
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
// importing navigation options and header props for  different screens
import { NonHeaderProps } from "./HeaderProps";
// importing different screen layouts
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons'

import {Platform} from 'react-native'
import Walkthrough from '../components/screens/walkthrough/Walkthrough';
import Login from '../components/screens/Login/Login';
import Home from '../components/screens/Home/Home';
import Signup from '../components/screens/Signup/Signup';
import Doctors from '../components/screens/Doctor/Doctors';
import BookAppointment from '../components/screens/Appointment/BookAppointment';
import HealthTips from "../components/screens/HealthTips/Healthtips";
import Services from "../components/screens/Services/Services";
import EmergencyScreen from "../components/screens/Emergency/EmergencyScreen";

// importing side drawer component props
import { DrawerNavigationConfig } from "./SideDrawer";
import OurLocation from "../components/screens/OurLocation/OurLocation";
import ContactUs from "../components/screens/ContactUs/ContactUs";
import AboutUs from "../components/screens/AboutUs/AboutUs";
import ChatScreen from "../components/screens/chat/ChatScreen";
import AppointmentHistory from "../components/screens/Appointment/AppointmentHistory";


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

const ApplicationStackScreen = createStackNavigator({  
  UrgentCares:{
    screen: Doctors,
    navigationOptions: NonHeaderProps
  },
  Home:{
    screen:Home, 
    navigationOptions: NonHeaderProps
  },
  HealthTips:{
    screen:HealthTips,
    navigationOptions: NonHeaderProps
  },
  Services:{
    screen:Services,
    navigationOptions: NonHeaderProps
  },
  AboutUs:{
    screen:AboutUs,
    navigationOptions: NonHeaderProps
  },
  OurLocation:{
    screen:OurLocation,
    navigationOptions: NonHeaderProps
  },
  ContactUs:{
    screen:ContactUs,
    navigationOptions: NonHeaderProps
  },
  BookAppointmentScreen:{
    screen: BookAppointment,
    navigationOptions: NonHeaderProps
  },
  Emergency:{
    screen: EmergencyScreen,
    navigationOptions: NonHeaderProps
  },
  LoginStackScreen:{
    screen: Login,
    navigationOptions: NonHeaderProps
  },
  Chat:{
    screen: ChatScreen,
    navigationOptions: NonHeaderProps

  },
  AppointmentHistory:{
    screen: AppointmentHistory,
    navigationOptions: NonHeaderProps

  }
})

class Hidden extends React.Component {
  render() {
    return null;
  }
}

const Drawer = createDrawerNavigator({
  "Home": {
    screen: ApplicationStackScreen,
    
    navigationOptions:{
      drawerIcon: ({ tintColor }) => (
        <Icon name={Platform.OS == 'ios' ? "ios-home" : "md-home"} style={{ color:'#EA2626' }} size={20}/>
      )
    }
  },
  "Health Tips": HealthTips,
  "Our Services": Services,
  "About Us": AboutUs,
  "Our Location": OurLocation,
  "Contact Us": ContactUs
}, DrawerNavigationConfig)

export const createRootNavigator = (signedIn) => {
  return createSwitchNavigator(
    {
      Walkthrough: {
        screen: ApplicationWalkThrough
      },
      HomeScreen: {
        screen: Drawer,
      },
      Login: {
        screen: LoginStackScreen
      },
    },
    {
      initialRouteName: signedIn === 'GOTOWALK' ? "Walkthrough" : signedIn === 'GOTOLOGIN' ? "Login" : signedIn === 'GOTOHOME' ? "HomeScreen" : null
    }
  )
}
