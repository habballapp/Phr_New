import React from 'react';
import {Text} from 'react-native';

export const Textview = (props) => {
    const {
        textStyle
    } = props;
    return (
        <Text style={textStyle}>{props.children}</Text>
    )
}