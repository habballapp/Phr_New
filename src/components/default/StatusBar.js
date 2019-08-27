import React from 'react';
import {StatusBar} from 'react-native';

export const Statusbar = (props) => {
    const {
        backgroundColor,
        barStyle
    } = props;
    return (
        <StatusBar 
            backgroundColor={backgroundColor ? backgroundColor : '#0080ff'}
            barStyle={barStyle ? barStyle : 'light-content'}/>
    )
}