import React, { Component } from 'react';
import { Container, Textview, Statusbar, Button} from '../../default';
import {Platform, ImageBackground,Image, View} from 'react-native';
import {Header,  Icon, Title} from 'native-base';
import {Button as NavButton} from 'native-base';


export default class Home extends Component {
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Home';
        let drawerIcon= (
            <Icon name={Platform.OS == 'ios' ? "ios-home" : "md-home"} style={{ color:'#0080ff' }} />
        )
        return {drawerLabel, drawerIcon};
    }

    onDoctorPress(){
        this.props.navigation.navigate("DoctorScreen");
    }

    render(){
        return(
            <Container>
                <Header style={{backgroundColor:'#0080ff'}}>
                    <Statusbar 
                        backgroundColor={'#0080ff'}
                        barStyle='light-content'
                    />
                    <NavButton transparent style={{position:'absolute', left:0}} onPress={this.props.navigation.openDrawer}>
                        <Icon name= {Platform.OS == 'ios' ? "ios-menu" : "md-menu"} />
                    </NavButton>
                    <Title style={styles.titleStyles}>Home</Title>
                </Header>
                <Container style={{flex:1}}>
                <ImageBackground
                    style={{alignSelf:'stretch',width:'100%',height:'100%'}}
                    source={require('../../../assets/backgroundImage4.jpg')}>
                        <Container ContainerStyle={{flexDirection:'row', height:70, width:350, alignSelf:'center', position:'absolute', bottom:150}}>
                            <Button style={{backgroundColor:'blue',borderRadius:50, height:70,width:70, marginRight:20}} onPress={()=>{this.onDoctorPress()}}/>
                            <Button style={{backgroundColor:'green',borderRadius:50, height:70,width:70, marginRight:20}} onPress={()=>{}}/>
                            <Button style={{backgroundColor:'orange',borderRadius:50, height:70,width:70}} onPress={()=>{}}/>
                            <Button style={{backgroundColor:'red',borderRadius:50, height:70,width:70,marginLeft:20}} onPress={()=>{}}/>
                        </Container>
                </ImageBackground> 
                </Container>
                
            </Container>
        )
    }
}
const styles = {
    titleStyles: {fontSize:24, alignSelf:'center'}
}