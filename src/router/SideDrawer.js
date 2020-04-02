import React from 'react';
import { View, Text, Dimensions } from 'react-native'
import { DrawerItems } from "react-navigation";
import AppLogo from "../assets/logo.png";
import {Container,ImageView, Textview} from "../components/default"


const { width } = Dimensions.get('window');

const CustomHeaderContentComponent = (props) => {
    return (
        <View>
            <Container ContainerStyle={{justifyContent:'center',alignSelf:'center', padding:20, marginTop:15}}>
                        <ImageView
                            resizeMode="center"
                            imageStyle={styles.appLogo}
                            imgSource={AppLogo}
                        />
                        <Textview textStyle={{fontSize:26, color:'black', fontWeight:'bold',alignSelf:'center'}} text="XYZ Urgent Care"/>
            </Container>
            <DrawerItems {...props} activeTintColor='#EA2626' />
        </View>
    )
}

const styles = {
    headerUserTextStyle: {
        color: 'white',
        fontSize: 24,
        position: 'absolute',
        bottom: 1,
        alignSelf: 'center'
    },
    headerContainerStyle: {
        height: 120,
        backgroundColor: '#0080ff'
    },
    appLogo: {
        height: 100,
        width: 100,
        alignSelf:'center'
    },
}

export const DrawerNavigationConfig = {
    drawerWidth: width / 1.3,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: CustomHeaderContentComponent
}
