import React from 'react';
import {Text} from 'react-native';

export const Textview = (props) => {
    const {
        textStyle
    } = props;
    return (
        <Text style={[styles.default, textStyle]}>{props.children}</Text>
    )
}
const styles = {
    default: {
        fontSize: 16,
        color: 'black',
    }
}