import React from 'react';
import {Textview, Container, ImageView} from '../../default/index';
import AppLogo from "../../../assets/logo.png";

export const Logintag = (props) => {
    const { appLogo, loginTagContainer, headingOne, headingTwo } = styles;
    return (
        <Container ContainerStyle={loginTagContainer}>
            <ImageView
                resizeMode="center"
                imageStyle={appLogo}
                imgSource={AppLogo} />
            <Textview textStyle={headingOne} text="Welcome" />
            <Textview textStyle={headingTwo} text="Please Login to your Account" />
        </Container>
    )
}

const styles = {
    loginTagContainer:{
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 30
    },
    appLogo: {
        height: 100,
        width: 100,
    },
    headingOne:{
        marginTop: 20,
        fontSize: 24,
        color: 'black'
    },
    headingTwo:{
        fontSize:16,
        color:'black'
    }
}