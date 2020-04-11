import React from "react";
import { Container, Input, Textview } from "../../default";
import { CheckBox, StyleSheet, Platform, Switch, TouchableHighlightBase,TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, CONFIRM_PASS_PLACEHOLDER, FIRST_NAME, LAST_NAME, TERMS_AND_CONDITIONS,SOCIAL_SECURITY_NO } from "../../../res/strings";
import { View } from "native-base";

export const FormOne = (props) => {
    const { emailChangeHandler, passwordChangeHandler, confirmPasswordHandler } = props;
    return (
        <Container ContainerStyle={styles.formContainer}>
            <Input
                placeholder={EMAIL_PLACEHOLDER}
                placeholderTextColor='rgba(0,0,0,0.7)'
                keyboardType="email-address"
                returnKeyType={"next"}
                blurOnSubmit={true}
                inputStyle={styles.input}
                onChangeText={emailChangeHandler} />
            <Input
                placeholder={PASSWORD_PLACEHOLDER}
                placeholderTextColor='rgba(0,0,0,0.7)'
                secureTextEntry={true}
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={passwordChangeHandler} />
            <Input
                placeholder={CONFIRM_PASS_PLACEHOLDER}
                placeholderTextColor='rgba(0,0,0,0.7)'
                secureTextEntry={true}
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={confirmPasswordHandler} />
        </Container>
    )
}



export const FormTwo = (props) => {

    this.state = {
        isModalVisible: false, 
    }

    const { firstNameChangeHandler, lastNameChangeHandler, securityNoChangeHandler,agreementValue, onCheckHandler } = props;
    return (
        <Container ContainerStyle={styles.formContainer}>

            
            <Input
                placeholder={LAST_NAME}
                placeholderTextColor='rgba(0,0,0,0.7)'
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={lastNameChangeHandler} />
            <Input
                placeholder={FIRST_NAME}
                placeholderTextColor='rgba(0,0,0,0.7)'
                returnKeyType={"next"}
                blurOnSubmit={true}
                inputStyle={styles.input}
                onChangeText={firstNameChangeHandler} />

             <Input
                placeholder={SOCIAL_SECURITY_NO }
                placeholderTextColor='rgba(0,0,0,0.7)'
                returnKeyType={"next"}
                blurOnSubmit={true}
                inputStyle={styles.input}
                onChangeText={securityNoChangeHandler} />     

   
            <Container ContainerStyle={styles.agreementsContainer}>
                { Platform.OS === 'android' ? (
                        <CheckBox onValueChange={(val) => console.log('state', val)} />
                    ) : (
                        <Switch onValueChange = {onCheckHandler} value={agreementValue}/>
                    ) }
                       <Textview text={TERMS_AND_CONDITIONS} textStyle={styles.termsConditionText} /> 
                   {/* <Modal
                            isVisible={this.state.isModalVisible}
                            style={{justifyContent: 'flex-end',}}
                            animationIn="slideInUp"
                            animationOut="slideOutDown"
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            backdropTransitionInTiming={800}
                            backdropTransitionOutTiming={800}    
                            >
                            <Container ContainerStyle={{ backgroundColor: '#fff', padding: 20,height: 300, borderRadius:15 }}>
                            <Container ContainerStyle={{flexDirection:'column', alignSelf:'center', alignItems:'center'}}>
                          
                            </Container>
                            </Container>
                        </Modal> */}

                        
                         

                  
                 
            </Container>

           
        </Container>
        
            
             
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    input: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.5)',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
    },
    agreementsContainer: {
        marginTop: 130,
        flexDirection: 'row',
        alignItems: 'center'
    },
    termsConditionText: {
        color: '#A9A9A9',
        marginLeft: 10,
        fontSize: 16
    }
})