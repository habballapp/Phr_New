import React, {Component} from 'react';
import {Container, Textview, Button} from '../../default';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class ContactUs extends Component{
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Contact Us';
        let drawerIcon= (                            
            <FontAwesome name="phone" size={20} color="blue"/>
            )
        return {drawerLabel, drawerIcon};
    }
    render(){
        return(
            <Container>
                
            </Container>
        )
    }
}