import React from 'react';
import { StatusBar, Platform } from 'react-native';

export const Statusbar = (props) => {
    const {
        backgroundColor,
    } = props;
    return (
        <StatusBar
            animated={true}
            backgroundColor={backgroundColor ? backgroundColor : '#0080ff'}
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
    )
}