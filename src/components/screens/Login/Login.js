import React, { Component } from 'react'
import {
    Input,
    Button,
    Container,
    Statusbar,
    Scrollview,
    Textview,
    SafeViewArea,
} from '../../default';
import { Logintag } from './LoginTag';
import { styles } from './login_styles';
import { SIGNUP_TEXT } from "../../../res/strings";
import firebase from 'react-native-firebase';
import { LOGIN_CHECK } from '../../../constants/StorageConstans';
import AsyncStorage from '@react-native-community/async-storage'
import { Alert } from 'react-native';

var validateEmail = '';
var validatePass = '';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            error: false,
        }
        this.onLoginPressed = this.onLoginPressed.bind(this)
    }

    onLoginPressed() {
        if(this.state.email!='' && this.state.password!=''){
            firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(()=>{
                this.onCheckStatuts();
                // AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
                //     this.props.navigation.goBack();
                //   });      
            })
            .catch((error)=>{
                Alert.alert("Error while logging in.")
                console.log("error...", error);
            })
        }
    }

    onCheckStatuts(){
              
        console.log("Check Status");

        let userID = firebase.auth().currentUser.uid;
        var dbref = firebase.database().ref(`users/patients/${userID}/`);
        dbref.on("value", (snapshot)=>{
            // snapshot.forEach((data)=>{
                console.log("pending_data", snapshot);
                console.log("pending_data", snapshot._value);
                 if(snapshot._value.status == 'pending') {
                    Alert.alert("Your account is not Approved by the Admin yet.");
                    console.log("pending", "status is pending");
                } else {
                    AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
                        this.props.navigation.goBack();
                    });      
                }
            // })  
        })
    }
               
           
        
    

    handleEmailChange(event) {
        this.setState({
            email: event
        })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;
        if (reg.test(event) === false && event != '') {
            validateEmail = <Textview textStyle={styles.invalidInputStyles} text="Please enter valid email" />;
            return false;
        }
        else {
            validateEmail = <Container></Container>;
        }
    }

    handlePassChange(event) {
        this.setState({
            password: event
        })
        if (event != '' && event.length < 8) {
            validatePass = <Textview textStyle={styles.invalidInputStyles} text="Password is not valid" />;
        } else {
            validatePass = <Container></Container>;
        }
    }

    componentWillMount() {
        validateEmail = '';
        validatePass = '';
    }

    render() {
        return (
            <SafeViewArea style={{ flex: 1 }}>
                <Statusbar barStyle="dark-content"/>
                <Scrollview >
                    <Logintag />
                    <Container ContainerStyle={styles.lineStyle} />
                    <Container ContainerStyle={styles.formContainer}>
                        <Input
                            placeholder="Email"
                            placeholderTextColor="#000"
                            keyboardType="email-address"
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                            inputStyle={styles.input}
                            onChangeText={(event) => this.handleEmailChange(event)}
                        />
                        {
                            validateEmail ? validateEmail : <Container></Container>
                        }
                        <Input
                            placeholder="Password"
                            placeholderTextColor="#000"
                            secureTextEntry={true}
                            returnKeyType={"next"}
                            inputStyle={styles.input}
                            blurOnSubmit={true}
                            onChangeText={(event) => this.handlePassChange(event)}
                        />
                        {
                            validatePass ? validatePass : <Container></Container>
                        }
                        <Button onPress={this.onLoginPressed} title="Login" style={styles.loginButtonStyles} textStyle={styles.loginButtonText} />
                        <Button onPress={() => { }} title="FORGET PASSWORD?" style={styles.forgetPasswordButton} textStyle={styles.forgetPasswordStyle} />
                        <Button onPress={() => this.props.navigation.push('SignUp')} title={SIGNUP_TEXT} style={styles.signup} textStyle={styles.signuphere} />
                    </Container>
                </Scrollview>
            </SafeViewArea>
        );
    }
}
