import React from 'react';
import { TouchableOpacity  } from 'react-native';
import {Textview} from './index';

export const Button = (props) => {

    const {
        buttonstyle,
        onPress,
        textstyle
    } = props;

    return(
        <TouchableOpacity 
        onPress={onPress}
        style={[Styles.defaultbuttonstyle, buttonstyle]}>
            <Textview textStyle={[Styles.defaulttextstyle, textstyle]}>{props.children}</Textview>    
        </TouchableOpacity>
    );
}
const Styles = {
    defaultbuttonstyle: {
        alignSelf:'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#0080ff',
        padding:15,
        width:'70%',
        height:'80%'
    },
    defaulttextstyle: {
        fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
		fontSize: 24
    }
}