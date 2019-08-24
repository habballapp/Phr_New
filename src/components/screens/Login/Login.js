import React, { Component } from 'react'
import {
    Input,
    Button,
    Container,
    Statusbar,
    Scrollview,
    Textview,
    ImagePicker
} from '../../default';
import { Logintag } from './LoginTag';
import { styles } from './login_styles';
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

    componentDidMount() {
        console.log('firbase', firebase)
    }

    handleEmailChange(event) {
        this.setState({
            email: event
        })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;
        if (reg.test(event) === false && event != '') {
            validateEmail = <Textview textStyle={styles.inValidEmailStyles}>Please enter valid email</Textview>;
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
            validatePass = <Textview textStyle={styles.inValidPasswordStyles}>Password is not valid</Textview>;
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
            <Container ContainerStyle={styles.container}>
                <Statusbar
                    backgroundColor={'#0080ff'}
                    barStyle='light-content'
                />
                <Scrollview ScrollViewStyle={styles.mainContainer} behavior="padding" enabled>
                    <ImagePicker
                        ContainerStyle={styles.imageContainer}
                        imageStyle={styles.image}
                        imgSource={require('../../../assets/logo.png')}
                    />
                    <Logintag
                        loginTagContainerStyle={styles.loginTagContainer}
                        style1={styles.style1}
                        style2={styles.style2}
                    />
                    <Container ContainerStyle={styles.lineStyle} />
                    <Container ContainerStyle={styles.formContainer}>
                        <Input
                            placeholder="Email"
                            placeholderTextColor="#000"
                            keyboardType="email-address"
                            returnKeyType={"next"}
                            blurOnSubmit={true}
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
                            blurOnSubmit={true}
                            onChangeText={(event) => this.handlePassChange(event)}
                        />
                        {
                            validatePass ? validatePass : <Container></Container>
                        }
                        <Container ContainerStyle={styles.buttonContainer}>
                            <Button>
                                Login
                            </Button>
                        </Container>
                        <Textview textStyle={styles.forgetPasswordStyle}>FORGET PASSWORD?</Textview>
                    </Container>
                </Scrollview>
            </Container>
        );
    }
}
