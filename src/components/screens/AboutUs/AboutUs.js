import React, {Component} from 'react';
import {Container, Textview, Button, ImageView} from '../../default';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLogo from "../../../assets/logo.png";
import { ScrollView } from 'react-native';

export default class AboutUs extends Component{
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'About Us';
        let drawerIcon= (                            
            <MaterialCommunityIcons name="information-outline" size={20} color="blue"/>
        )
        return {drawerLabel, drawerIcon};
    }
    render(){
        return(
            <Container>
                <Container ContainerStyle={{justifyContent:'center',alignSelf:'center', padding:20,marginTop:10}}>
                        <ImageView
                            resizeMode="center"
                            imageStyle={styles.appLogo}
                            imgSource={AppLogo}
                        />
                        <Textview textStyle={{fontSize:30, color:'black', fontWeight:'bold',alignSelf:'center'}} text="About Us"/>
                </Container>
                <Container ContainerStyle={{width:'85%',height:'70%',backgroundColor:'rgba(0,128,255, 0.7)',alignSelf:'center',padding:20,borderRadius:15,marginBottom:20}}>
                    
                    <ScrollView 
                    showsVerticalScrollIndicator={false}>
                    <Textview textStyle={{fontSize:18, color:'white',alignSelf:'center'}} 
                    
                    text="Urgent Care of Milford (UCOM) is the newest leader in urgent care and health services located in downtown Milford. UCOM is dedicated to providing our patients with quality medical care and exceptional service for patients of all ages, illnesses, and injuries.

                    Urgent Care of Milford is open 7 days a week, 12 hours per day, to treat non-life threatening illnesses and injuries.
                    
                    Our highly trained and attentive team of providers have extensive urgent care and occupational health experience, and include board certifies physicians, physician assistant, nurse practitioners, and medical assistants. Our staff is dedicated to providing minimum wait times with no appointments necessary."
                    
                    />
                    </ScrollView>
                </Container>
            </Container>
        )
    }
}
const styles = {
    appLogo: {
        height: 100,
        width: 100,
        alignSelf:'center'
    },
}