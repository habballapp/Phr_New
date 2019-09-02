import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = {
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
      color:'#808080',
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
    registerButtonStyles: {
      
    },
    sliderPageTitleStyle:{
      padding: 10,
      fontSize:30, 
      color:'#0080ff',
      textAlign:'center'
    },
    sliderPageDescriptionStyle:{
      fontSize:17, 
      color:'#808080',
      padding:25,
      textAlign:'center', 
      marginBottom:20
    },
    sliderMainContainer: {
      flex:1, 
      marginTop:70
    },
    sliderImageStyle: {
      height:250,
      width:250, 
      alignSelf:'center'
    },
}