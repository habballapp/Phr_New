import React from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
const { width, height } = Dimensions.get('window')

export default Slider = (props) => {
    console.log('this',props);
    const { title, des} = props.pageItem;
    return(
        <View style={styles.slide}>
            <Text 
                style={{fontSize:36, fontFamily:'calibri', color:'white', fontWeight:'bold', fontStyle:'normal' }}>
                    {title}
                </Text>
                <Text 
                style={{fontSize:28, fontFamily:'calibri', color:'white', fontStyle:'italic' }}>
                {des}
            </Text>
        </View>
    )
}
const styles = {
    wrapper: {
      // backgroundColor: '#f00'
    },
    nextButtonStyles:{
      backgroundColor:'transparent',
      position:'absolute',
      right:20,
      bottom:65
    },
    PreviosButtonStyles:{
      backgroundColor:'transparent',
      position:'absolute',
      left:20,
      bottom:65
    },
    buttonTextStyles:{
      fontSize:18,
      color:'white',
      fontWeight:'bold'
    },
    slide: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
    },
  
    imgBackground: {
      width,
      height,
      backgroundColor: 'transparent',
      position: 'absolute'
    },
  
    image: {
      width,
      height,
    }
  }
  