import React from 'react';
import { TextInput, View } from 'react-native';

export const Input = (props) => {
    const {
        placeholder, 
        placeholderTextColor,
        keyboardType,
        returnKeyType,
        blurOnSubmit,
        onChangeText,
        secureTextEntry,
        inputstyle,
        editable
    } = props;

    return(
        <TextInput 
        style={[Styles.inputFields, inputstyle]}
        placeholder = {placeholder}
        placeholderTextColor = {placeholderTextColor}
        keyboardType = {keyboardType}
        returnKeyType = {returnKeyType}
        blurOnSubmit = {blurOnSubmit}
        onChangeText = {onChangeText}
        secureTextEntry = {secureTextEntry}
        editable = {editable}
        />
    );
}

const Styles = {
    inputStyle: {
        height: 40,
        paddingLeft: 5
    },
    inputFields: {
		color: '#ddd',
		fontSize: 20,
		color: '#000',
		borderBottomWidth: 1,
		borderBottomColor: '#000',
        marginTop: 20,
        width: '80%',
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 40
	},
}