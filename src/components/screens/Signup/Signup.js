import React, { Component } from "react";
import { SafeViewArea, Scrollview, KeyboardAvoidView, Container } from "../../default";
import Swiper from 'react-native-swiper'
import { FormOne, FormTwo } from "./SignupFormOne";
import { SignupHeader } from "./SignupHeader";
import { SignupButtons } from "./SignupButtonContainer";
import { StyleSheet } from 'react-native'

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.index = 0
        this.state = {
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
    }

    onBackHandler = () => {
        if (this.state.swiperIndex == 1) {
            this.setState({ swiperIndex: 0 })
            this.refs.swiper.scrollView.setPage(0)
        } else {
            this.props.navigation.pop()
        }
    }

    render() {
        return (
            <SafeViewArea style={{ flex: 1 }}>
                <Scrollview contentContainerStyle={styles.scrollViewStyles} keyboardShouldPersistTaps="true">
                    <KeyboardAvoidView>
                        <SignupHeader />
                        <Swiper style={styles.swipeWrapper}
                            scrollEnabled={false}
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
                                agreementValue={this.state.agreementState} />
                        </Swiper>
                        <SignupButtons
                            swiperIndex={this.state.swiperIndex}
                            continueSignup={this.continueSignupHandler}
                            goBack={this.onBackHandler} />
                    </KeyboardAvoidView>
                </Scrollview>
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