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
import { Icon, Label } from 'native-base';
import {
    GoogleSigninButton,
    GoogleSignin,
    statusCodes,
} from "@react-native-community/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';


var validateEmail = '';
var validatePass = '';
let that = this;

export default class Login extends Component {

    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: '',
            isLoading: false,
            error: false,
            showPassword: true,
            icon: "eye-off",

        }
        this.onLoginPressed = this.onLoginPressed.bind(this);
        this.navigate = this.props.navigation.navigate.bind(this);
    }

    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            showPassword: !prevState.showPassword
        }));
    }

    onLoginPressed() {
        if (this.state.email != '' && this.state.password != '') {
            console.log("email", this.state.email);
            console.log("password", this.state.password);
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.onCheckStatuts();
                    // AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
                    //     this.props.navigation.goBack();
                    //   });      
                })
                .catch((error) => {
                    Alert.alert("Error while logging in.")
                    console.log("error...", error);
                })
        }
    }

    onCheckStatuts() {

        console.log("Check Status");

        let userID = firebase.auth().currentUser.uid;
        var dbref = firebase.database().ref(`users/patients/${userID}/`);
        dbref.on("value", (snapshot) => {
            // snapshot.forEach((data)=>{
            // let userID = firebase.auth().currentUser.uid; 
            console.log("userID_Token", userID);
            var FCM = firebase.messaging();
            var ref = firebase.database().ref(`users/patients/`).child(`${userID}`);
            FCM.getToken().then(token => {
                console.log("token_Token", token);
                ref.update({ pushToken: token });
            });

            console.log("pending_data", snapshot);
            console.log("pending_data", snapshot._value);
            if (snapshot._value.status == 'pending') {
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

    onGoogleSignInPress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // setUserInfo(userInfo)
            console.log("userInfo", userInfo);
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            console.log("userInfo_credential", credential);

            firebase
                .auth()
                .signInWithCredential(credential)
                .then((user) => {
                    console.log("user", user);
                    console.log(user.user.uid);
                    console.log("this.state.urgentcareName", this.state.urgentcareName);
                    console.log("this.state.number", this.state.number);

                    var dbref = firebase
                        .database()
                        .ref(`users/patients/${user.user.uid}/`);
                    dbref.on("value", (snapshot) => {

                        var FCM = firebase.messaging();
                        var ref = firebase.database().ref(`users/patients/`).child(`${user.user.uid}`);
                        FCM.getToken().then(token => {
                            console.log("token_Token", token);
                            ref.update({ pushToken: token });
                        });
                        console.log("snapshot exist", snapshot.exists())
                        if (!snapshot.exists()) {
                            Alert.alert(
                                "User does not exist, kindly register to login with this credentials."
                            );
                        } else {
                            console.log("snapshot", snapshot);
                            console.log(snapshot);
                            if (snapshot._value.status !== undefined) {
                                if (snapshot._value.status == "pending") {
                                    Alert.alert(
                                        "Your account is not Approved by the Admin yet."
                                    );

                                    console.log("pending", "status is pending");

                                } else {
                                    AsyncStorage.setItem(LOGIN_CHECK, "true").then(() => {
                                        this.props.navigation.goBack();
                                    });
                                }
                            }
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // when user cancels sign in process,
                Alert.alert("Process Cancelled");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // when in progress already
                Alert.alert("Process in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // when play services not available
                Alert.alert("Play services are not available");
            } else {
                // some other error
                Alert.alert("Something else went wrong... ", error.toString());
                // setError(error)
                console.log("error", error);
            }
        }
    };

    navigateBack() {
        AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
            this.props.navigation.goBack();
        });
    }


    onFacebookSignInPress() {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            (result) => {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const credential = firebase.auth.FacebookAuthProvider.credential(
                            data.accessToken
                        );

                        firebase
                            .auth()
                            .signInWithCredential(credential)
                            .then((user) => {
                                console.log("user", user);

                                var dbref = firebase
                                    .database()
                                    .ref(`users/patients/${user.user.uid}/`);
                                dbref.on("value", (snapshot) => {
                                    var FCM = firebase.messaging();
                                    var ref = firebase.database().ref(`users/patients/`).child(`${user.user.uid}`);
                                    FCM.getToken().then(token => {
                                        console.log("token_Token", token);
                                        ref.update({ pushToken: token });
                                    });
                                    if (!snapshot.exists()) {
                                        Alert.alert(
                                            "User does not exist, kindly register to login with this credentials."
                                        );

                                        // this.props.navigation.navigate("Home");
                                    } else {
                                        console.log("snapshot", snapshot);
                                        if (snapshot._value.status == "pending") {
                                            Alert.alert(
                                                "Your account is not Approved by the Admin yet."
                                            );
                                            console.log("pending", "status is pending");
                                            this.props.navigation.navigate("Home");

                                        } else {
                                            AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
                                                this.props.navigation.navigate("Home");
                                                // this.navigate('Home');
                                            });
                                        }
                                    }
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
                }
            },
            (error) => {
                console.log("Login fail with error: " + error);
            }
        );
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

    componentDidMount() {
        GoogleSignin.configure({
            webClientId:
                "1094017099438-avdi1s0dt309v64k24m1qkj5bh1835nm.apps.googleusercontent.com",
            scopes: ["profile", "email"],
        });
    }

    componentWillMount() {
        validateEmail = '';
        validatePass = '';
    }

    render() {
        return (
            <SafeViewArea style={{ flexWrap: "wrap" }}>
                <Statusbar barStyle="dark-content" />
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
                            secureTextEntry={this.state.showPassword}
                            returnKeyType={"next"}
                            inputStyle={styles.input}
                            blurOnSubmit={true}
                            onChangeText={(event) => this.handlePassChange(event)}
                        />

                        <Icon style={{ marginTop:-40,alignSelf:'flex-end' }}
                            name={this.state.icon} onPress={() => this._changeIcon()} />

                        {
                            validatePass ? validatePass : <Container></Container>
                        }
                        <Button onPress={this.onLoginPressed} title="Login" style={styles.loginButtonStyles} textStyle={styles.loginButtonText} />
                        {/* <GoogleSigninButton
                            style={{
                                width: 220,
                                height: 48,
                                alignSelf: "center",
                                marginTop: 12,
                                marginRight: 10,
                                marginLeft: 10,
                            }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this.onGoogleSignInPress}
                        />

                        <Button
                            style={{
                                width: 220,
                                height: 48,
                                alignSelf: "center",
                                marginTop: 10,
                                marginRight: 10,
                                marginLeft: 10,
                                backgroundColor: "#EA2626",
                                borderRadius: 15,
                                justifyContent: 'center'

                            }}
                            textStyle={{ fontSize: 16, color: "white", marginLeft: 15, fontWeight: 'bold' }}
                            onPress={() => {
                                this.onFacebookSignInPress();
                            }}
                            title="SignIn with Facebook"
                        ></Button> */}
                        <Container ContainerStyle={{ padding: 7 }}></Container>
                        <Button
                            style={{ borderRadius: 5, backgroundColor: '#EA2626', height: 45, width: 300, alignItems: 'center', flexDirection: 'row' }}
                            textStyle={{ fontSize: 18, color: 'white', marginLeft: 15 }}
                            onPress={() => {
                                this.onGoogleSignInPress();
                            }}
                            title="Sign in with Google">
                            <FontAwesomeIcon name='google' size={25} style={{ marginLeft: 12, color: '#fff' }} />
                        </Button>
                        <Container ContainerStyle={{ padding: 7 }}></Container>
                        <Button
                            style={{ borderRadius: 5, backgroundColor: '#EA2626', height: 45, width: 300, alignItems: 'center', flexDirection: 'row' }}
                            textStyle={{ fontSize: 18, color: 'white', marginLeft: 15 }}
                            onPress={() => {
                                this.onFacebookSignInPress();
                            }}
                            title="Signin with Facebook">
                            <FontAwesomeIcon name='facebook' size={25} style={{ marginLeft: 12, color: '#fff' }} />
                        </Button>
                        <Button onPress={() => { }} title="FORGET PASSWORD?" style={styles.forgetPasswordButton} textStyle={styles.forgetPasswordStyle} />
                        <Button onPress={() => this.props.navigation.push('SignUp')} title={SIGNUP_TEXT} style={styles.signup} textStyle={styles.signuphere} />
                    </Container>


                    <Container ContainerStyle={{
                        alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 15, bottom: 0,
                        position: 'absolute', bottom: 0
                    }}>
                        <Textview >
                           Powered by Matz Pvt Ltd
                            </Textview>
                    </Container>


                </Scrollview>



            </SafeViewArea>
        );
    }
}
