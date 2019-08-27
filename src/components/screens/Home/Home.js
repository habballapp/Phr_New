import React, { Component } from 'react';
import { Container, Textview, Statusbar} from '../../default';
import {Platform} from 'react-native';
import {Header, Button, Icon, Title} from 'native-base';


export default class Home extends Component {
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Home';
        let drawerIcon= (
            <Icon name={Platform.OS == 'ios' ? "ios-home" : "md-home"} style={{ color:'#0080ff' }} />
        )
        return {drawerLabel, drawerIcon};
    }

    render(){
        return(
            <Container>
                <Header style={{backgroundColor:'#0080ff'}}>
                    <Statusbar 
                        backgroundColor={'#0080ff'}
                        barStyle='light-content'
                    />
                    <Button transparent style={{position:'absolute', left:0}} onPress={this.props.navigation.openDrawer}>
                        <Icon name= {Platform.OS == 'ios' ? "ios-menu" : "md-menu"} />
                    </Button>

                    <Title style={styles.titleStyles}>Home</Title>
                
                </Header>
                <Container>
                    <Textview>HOME SCREEN</Textview>
                </Container>
            </Container>
        )
    }
}
const styles = {
    titleStyles: {fontSize:24, alignSelf:'center'}
}