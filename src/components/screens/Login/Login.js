import React, { Component } from 'react'
import {
    Input,
    Button,
    Container,
    Statusbar,
    Scrollview,
    Textview,
    SafeViewArea
} from '../../default';
import { KeyboardAvoidingView } from "react-native";
import { Logintag } from './LoginTag';
import { styles } from './login_styles';
import Home from '../Home/Home'
import firebase from 'react-native-firebase';

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
            companyCode: '',
        }
        
    }    

    onLoginPressed(){
        this.props.navigation.navigate('HomeScreen');
    }

    componentDidMount() {
        console.log('firbase', firebase)
    }

    handleEmailChange(event) {
        this.setState({
            email: event
        })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;
        if (reg.test(event) === false && event != '') {
            validateEmail = <Textview textStyle={styles.invalidInputStyles}>Please enter valid email</Textview>;
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
            validatePass = <Textview textStyle={styles.invalidInputStyles}>Password is not valid</Textview>;
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
            <SafeViewArea style={{flex: 1}}>
                <Statusbar barStyle='dark-content'/>
                <Scrollview contentContainerStyle={styles.scrollViewStyles} >
                    <KeyboardAvoidingView behavior="position">
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
                            <Button onPress={()=>this.onLoginPressed()} title="Login" style={styles.loginButtonStyles} textStyle={styles.loginButtonText}/>
                            <Button onPress={()=>{}} title="FORGET PASSWORD?" style={styles.forgetPasswordButton} textStyle={styles.forgetPasswordStyle}/>
                        </Container>
                    </KeyboardAvoidingView>
                </Scrollview>
            </SafeViewArea>
        );
    }
}
