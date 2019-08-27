import React from 'react';
import {Container} from '../../default';

export const InActiveDot = () => {
    return(
        <Container 
            ContainerStyle={styles.inActiveDotStyle}
        />
    )
}

const styles = {
    inActiveDotStyle: {
        backgroundColor: 'rgba(255,255,255,.3)', 
        width: 10, 
        height: 10, 
        borderRadius: 7, 
        marginLeft: 2,
        marginRight: 2
    }
}