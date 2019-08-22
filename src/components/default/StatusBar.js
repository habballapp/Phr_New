import React from 'react';
import {StatusBar} from 'react-native';

export const Statusbar = (props) => {
    const {
        backgroundColor,
        barStyle
    } = props;
    return (
        <StatusBar 
            backgroundColor={backgroundColor}
            barStyle={barStyle}/>
    )
}