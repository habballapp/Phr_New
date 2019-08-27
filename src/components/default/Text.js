import React from 'react';
import { Text } from 'react-native';

export const Textview = (props) => {
    const {
        textStyle,
        text
    } = props;

    return (
        <Text style={[styles.defaulttextstyle, textStyle]}>{ text }</Text>
    )
}

const styles = {
    defaulttextstyle: {
		color: 'black',
		fontSize: 16
    }
}
