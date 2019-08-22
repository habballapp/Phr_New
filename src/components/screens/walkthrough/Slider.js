import React from 'react'
import {styles} from './walkthrough_styles';
import {Container, Textview} from '../../default';

export default Slider = (props) => {
    const { title, des} = props.pageItem;
    return(
        <Container ContainerStyle={styles.slide}>
            <Textview 
                textStyle={{fontSize:36, fontFamily:'calibri', color:'white', fontWeight:'bold', fontStyle:'normal' }}>
                    {title}
                </Textview>
                <Textview 
                textStyle={{fontSize:28, fontFamily:'calibri', color:'white', fontStyle:'italic' }}>
                {des}
            </Textview>
        </Container>
    )
}