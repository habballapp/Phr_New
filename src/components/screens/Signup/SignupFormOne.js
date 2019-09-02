import React from "react";
import { Container, Input, Textview } from "../../default";
import { CheckBox, StyleSheet } from 'react-native';
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, CONFIRM_PASS_PLACEHOLDER, FIRST_NAME, LAST_NAME, TERMS_AND_CONDITIONS } from "../../../res/strings";

export const FormOne = (props) => {
    const { emailChangeHandler, passwordChangeHandler, confirmPasswordHandler } = props;
    return (
        <Container ContainerStyle={styles.formContainer}>
            <Input
                placeholder={EMAIL_PLACEHOLDER}
                keyboardType="email-address"
                returnKeyType={"next"}
                blurOnSubmit={true}
                inputStyle={styles.input}
                onChangeText={emailChangeHandler} />
            <Input
                placeholder={PASSWORD_PLACEHOLDER}
                secureTextEntry={true}
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={passwordChangeHandler} />
            <Input
                placeholder={CONFIRM_PASS_PLACEHOLDER}
                secureTextEntry={true}
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={confirmPasswordHandler} />
        </Container>
    )
}

export const FormTwo = (props) => {
    const { firstNameChangeHandler, lastNameChangeHandler, agreementValue, onCheckHandler } = props;
    return (
        <Container ContainerStyle={styles.formContainer}>
            <Input
                placeholder={FIRST_NAME}
                returnKeyType={"next"}
                blurOnSubmit={true}
                inputStyle={styles.input}
                onChangeText={firstNameChangeHandler} />
            <Input
                placeholder={LAST_NAME}
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={lastNameChangeHandler} />
            <Container ContainerStyle={styles.agreementsContainer}>
                <CheckBox onValueChange={(val) => console.log('state', val)} />
                <Textview text={TERMS_AND_CONDITIONS} textStyle={styles.termsConditionText} />
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
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    termsConditionText: {
        color: '#A9A9A9',
        marginLeft: 10,
        fontSize: 16
    }
})