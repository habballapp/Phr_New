import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import {Header, Title, Icon} from 'native-base';
import {Button as NavButton} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Statusbar, Container, Textview, ImageView} from '../../default';
import Swiper from 'react-native-swiper'

export default class HealthTips extends Component{
    constructor(props){
        super(props);
        this.state={
            swiperIndex: 0,
            imagesSlider:[
                require('./tip01.jpg'),
                require('./tip02.jpg'),
                require('./tip03.jpg')
            ]
        }
    }
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Health Tips';
        let drawerIcon= (                            
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="blue"/> 
        )
        return {drawerLabel, drawerIcon};
    }
   
    render(){
        return(
            <Container ContainerStyle={{flex:1}}>
                 <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70}}>
                    <Statusbar 
                        translucent 
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <NavButton transparent style={{position:'absolute', left:0}} onPress={()=>{this.props.navigation.goBack()}}>
                        <Icon name= {Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} color="#0080ff" />
                    </NavButton>
                    <Title style={styles.titleStyles}>Health Tips</Title>
                </Header>
                <Container ContainerStyle={{marginTop:50,flex:1,backgroundColor:'#fff',justifyContent:'center',}}>
                    <Container ContainerStyle={{height:450,backgroundColor:'white',justifyContent:'center',width:'100%',alignSelf:'center'}}>
                        <Swiper 
                            autoplay={true}
                            height={250}
                            width={'100%'}
                            dot={<Container></Container>}
                            autoplayTimeout={5}
                            activeDot={<Container></Container>}
                            >
                            <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                <ImageView imageStyle={{width:'100%',height:400}} imgSource={require('./tip01.jpg')}/>
                            </Container>
                            <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                <ImageView imageStyle={{width:'100%',height:400}} imgSource={require('./tip02.jpg')}/>
                            </Container>
                            <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                <ImageView imageStyle={{width:'100%',height:400}} imgSource={require('./tip03.jpg')}/>
                            </Container>

                        </Swiper>
                    </Container>
                </Container>
            </Container>
 
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
       
    },
    slide1: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide2: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide3: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    titleStyles: {fontWeight: 'bold',fontSize:26, alignSelf:'center', flex:1,color:'#0080ff'},
  })
