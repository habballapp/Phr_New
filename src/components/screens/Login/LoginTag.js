import React from 'react';
import {Textview, Container} from '../../default/index';

export const Logintag = (props) => {
    const {
        loginTagContainerStyle,
        style1,
        style2
    } = props;
    return (
        <Container ContainerStyle={loginTagContainerStyle}>
            <Textview textStyle={style1}>Welcome</Textview>
            <Textview textStyle={style2}>Please Login to your Account</Textview>
        </Container>
    )
}