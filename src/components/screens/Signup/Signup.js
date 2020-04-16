import React, { Component } from "react";
import { SafeViewArea, Scrollview, Statusbar, Container,Textview } from "../../default";
import Swiper from 'react-native-swiper'
import { FormOne, FormTwo } from "./SignupForm";
import { SignupHeader } from "./SignupHeader";
import { SignupButtons } from "./SignupButtonContainer";
import { StyleSheet, Platform,Alert } from 'react-native'
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage'
import { LOGIN_CHECK } from '../../../constants/StorageConstans';

var user = firebase.auth().currentUser;

//var urgent_care_data = this.props.navigation.getParam('urgent_care_data');

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.index = 0

        this.state = {
            
            urgentcareName: this.props.navigation.getParam('urgentcareName') ,
            swiperIndex: 0,
            agreementState: false,
            controls: {
                email: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isEmail: true
                    }
                },
                password: {
                    value: "",
                    valid: false,
                    validationRules: {
                        minLength: 6
                    }
                },
                confirmPassword: {
                    value: "",
                    valid: false,
                    validationRules: {
                        equalTo: "password"
                    }
                },
                firstName: {
                    value: "",
                    valid: false,
                    validationRules: {
                        minLength: 3
                    }
                },
                lastName: {
                    value: "",
                    valid: false,
                    validationRules: {
                        minLength: 3
                    }
                },
                securityNo: {
                    value: "",
                    valid: false,
                    validationRules: {
                        maxLength: 4
                    }
                }
  
            }
        }
    }

    handleUpdateInput = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: this.validateInput(value, key)
                    }
                }
            }
        })
    }

    validateInput(value, key) {
        let isValid = false;
        switch (key) {
            case 'email':
                isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
                break;
            case 'password':
                isValid = value.length >= 6;
                break;
            case 'confirmPassword':
                isValid = (value === this.state.controls.password.value);
                break;
            case 'firstName':
                isValid = value.length >= 3;
                break;
            case 'lastName':
                isValid = value.length >= 3;
                break;

            case 'securityNo':
                isValid= value.maxLength >5;

            default:
                isValid = false;
        }
        return isValid;
    }

    continueSignupHandler = () => {
        const { email, password, confirmPassword } = this.state.controls;
        if (email.valid && password.valid && confirmPassword.valid) {
            console.log('validate', this.state.controls)
        }
        if (this.state.swiperIndex == 0) {
            this.setState({ swiperIndex: 1 })
            this.refs.swiper.scrollBy(1)
        }
        else if (this.state.swiperIndex == 1){
            firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
                .then( (user) => {
                    console.log("asdnaskdnaskd", user);
                    let userID = firebase.auth().currentUser.uid;
                    firebase.database().ref('users/').child('patients').child(userID).set({
                    email:this.state.controls.email.value,    
                    firstname: this.state.controls.firstName.value,
                    lastname: this.state.controls.lastName.value,
                    patientId: userID,
                    status: 'pending',
                    Phone:this.state.controls.securityNo.value,
                    UName: this.state.urgentcareName
                });
                     
                Alert.alert("Your account creation request has been posted to the admin.");
                    // AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
                    //     this.props.navigation.goBack();
                    // });

                  //  this.defaultEmergency();
                    this.props.navigation.navigate("Home")
                }) .catch(error => {   
                    alert(error.message);
                 })


                
            }
        
    }

  

    onBackHandler = () => {
        if (this.state.swiperIndex == 1) {
            this.setState({ swiperIndex: 0 })
            if (Platform.OS === 'android') {
                this.refs.swiper.scrollView.setPage(0)
            }else {
                this.refs.swiper.scrollBy(0)
            }
        } else {
            this.props.navigation.pop()
        }
    }

    render() {
        return (
            <SafeViewArea style={{ flex: 1 }}>
                <Statusbar barStyle="dark-content"/>
                <Scrollview keyboardShouldPersistTaps="true">
                        <SignupHeader />
                        <Swiper style={styles.swipeWrapper}
                            scrollEnabled={true}
                            dot={<Container></Container>}
                            activeDot={<Container></Container>}
                            ref='swiper'
                            index={this.state.swiperIndex}
                            showsButtons={false}
                            loop={false}>
                            <FormOne
                                emailChangeHandler={(email) => this.handleUpdateInput('email', email)}
                                passwordChangeHandler={(password) => this.handleUpdateInput('password', password)}
                                confirmPasswordHandler={(confirmPass) => this.handleUpdateInput('confirmPassword', confirmPass)} />
                        
                            <FormTwo
                                firstNameChangeHandler={(firstName) => this.handleUpdateInput('firstName', firstName)}
                                lastNameChangeHandler={(lastName) => this.handleUpdateInput('lastName', lastName)}
                                securityNoChangeHandler={(securityNo) => this.handleUpdateInput('securityNo', securityNo)}
                                agreementValue={this.state.agreementState}
                                onCheckHandler={(value) => {
                                    this.setState({agreementState: value})
                                    console.log('Switch 1 is: ' + value)
                                 }} />
                        </Swiper>
                        <SignupButtons
                            swiperIndex={this.state.swiperIndex}
                            continueSignup={this.continueSignupHandler}
                            goBack={this.onBackHandler}/>
                </Scrollview>

                <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:10,
                                position:'absolute', bottom:0}}>
                            <Textview >
                                Powered by Matz Group©
                            </Textview>
                        </Container>
            </SafeViewArea>
        )
    }
}

const styles = StyleSheet.create({
    scrollViewStyles: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    swipeWrapper: {
        height: 250,
    }
})