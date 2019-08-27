import React from 'react'
import {styles} from './walkthrough_styles';
import {Container, Textview} from '../../default';

export default Slider = (props) => {
    const { title, des} = props.pageItem;
    return(
        <Container ContainerStyle={styles.slide}>
            <Textview textStyle={{fontSize:36, color:'white', fontWeight:'bold', fontStyle:'normal' }} text={title} />
            <Textview textStyle={{fontSize:28, color:'white', fontStyle:'italic' }} text={des} />
        </Container>
    )
}