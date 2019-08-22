import React from 'react';
import {Image} from 'react-native';
import {Container} from './index';

export const ImagePicker = (props) => {
    const {
        ContainerStyle,
        imageStyle,
        imgSource
    } = props;
    return(
        <Container ContainerStyle={ContainerStyle}>
            <Image style={imageStyle} source={imgSource}/>
        </Container>
    )
}