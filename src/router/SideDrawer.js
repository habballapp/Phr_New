import React from 'react';
import { View, Text, Dimensions } from 'react-native'
import { DrawerItems } from "react-navigation";

const { width } = Dimensions.get('window');

const CustomHeaderContentComponent = (props) => {
    return (
        <View>
            <View style={styles.headerContainerStyle}>
                <Text style={styles.headerUserTextStyle}>Welcome, User</Text>
            </View>
            <DrawerItems {...props} />
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
    }
}

export const DrawerNavigationConfig = {
    drawerWidth: width / 1.3,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: CustomHeaderContentComponent
}
