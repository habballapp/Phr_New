import React from 'react';
import { Textview, Container, ImageView } from '../../default/index';
import AppLogo from "../../../assets/logo.png";
import { WELCOME, LOGIN_HEADER } from "../../../res/strings";

export const Logintag = () => {
    const { appLogo, loginTagContainer, headingOne, headingTwo } = styles;
    return (
        <Container ContainerStyle={loginTagContainer}>
            <ImageView
                resizeMode="center"
                imageStyle={appLogo}
                imgSource={AppLogo} />
            <Textview textStyle={headingOne} text={WELCOME} />
            <Textview textStyle={headingTwo} text={LOGIN_HEADER} />
        </Container>
    )
}

const styles = {
    loginTagContainer: {
        marginTop: 60,
        marginLeft: 30
    },
    appLogo: {
        height: 100,
        width: 100,
    },
    headingOne: {
        marginTop: 25,
        fontSize: 24,
        color: 'black'
    },
    headingTwo: {
        fontSize: 16,
        color: 'black'
    }
}