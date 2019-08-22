import React from 'react';
import { ScrollView } from 'react-native';

export const Scrollview = (props) => {
    const {
        ScrollViewStyle
    } = props;
    return (
        <ScrollView style={ScrollViewStyle}>
            {props.children}
        </ScrollView>
    )
}