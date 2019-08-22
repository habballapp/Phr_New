import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Dimensions,
  Image
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class Login extends Component{
    static navigationOptions = () => ({
        title: `Basdasd`,
    })
    


    render(){
        return(
            <View style={styles.container}>
            {/* <Image style={styles.image} source={require('../assets/loginLogo.png')}/> */}
            </View>
        );
    }
}

const styles = {
    container: {
        flex:1,
        backgroundColor:'#d57eeb',
        alignItems: 'center'
    },
    image: {
        marginTop: 45
    }
}