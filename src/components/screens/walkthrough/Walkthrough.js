import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Dimensions,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import Slider from "./Slider";
const { width, height } = Dimensions.get('window')

const colors=['#d57eeb','#fccb90']
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

export default class Walkthrough extends Component {
  static navigationOptions = { header: null };
  data = [
    { title: 'Screen one', des: 'asd'},
    { title: 'Screen two', des: 'asd'},
    { title: 'Screen three', des: 'asd'},
    { title: 'Screen four', des: 'asd'},
    { title: 'Screen five', des: 'asd'},
    { title: 'Screen six', des: 'asd'},
]

  constructor(props){
    super(props);
    this.swiper
    this.index = 1
    this.state = { BackShow: false , NextShow:true, StartShow:false, showRealApp: false}
  }

  onScrollingBeginDrag = (a,b,c) => {
    console.log("onScroll...")
    this.setState({show:false})
  }

  onScrollingEndDrag = (a,b,c) => {
    console.log("onScroll end...")
    this.setState({show:true})
  }

  swipeEnd(){
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
      this.props.navigation.navigate('Login');
    });
  }

  swipeForward(targetIndex) {
    const currentIndex = this.swiper.state.index;
    const offset = targetIndex- currentIndex;
    this.swiper.scrollBy(offset);
  }

  swipeBackward(targetIndex) {
    const currentIndex = this.swiper.state.index;
    const offset = currentIndex - targetIndex;
    this.swiper.scrollBy(offset);
  }

  onIndexChanged = (newIndex) => {
    const { onIndexChanged } = this.props;
    this.index = newIndex+1;
    if(newIndex > 0){ //middle page
      this.setState({BackShow:true})
      if (newIndex == 5){ //end page
        this.setState({NextShow:false, StartShow:true})
      }
      else{
        this.setState({NextShow:true, StartShow:false})
      }
    }
    else if (newIndex == 0){ //start page
      this.setState({BackShow:false,StartShow:false,NextShow:true})
    }
    if (onIndexChanged) {
        onIndexChanged(newIndex);
    }
  };

  render () {
    return (
      <View style={styles.container}>
          <StatusBar 
          backgroundColor={'#0fbe9f'}
          barStyle='light-content' />
          <LinearGradient
            colors={['#0fbe9f','#039be6']}
            style={styles.imgBackground}
          />
          <Swiper style={styles.wrapper}
            dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 10, height: 10, borderRadius: 7, marginLeft: 2, marginRight: 2}} />}
            activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 8, marginLeft: 2, marginRight: 2}} />}
            paginationStyle={{
              bottom: 70
            }}
            ref={component => this.swiper = component}
            showsButtons={false} 
            onIndexChanged={this.onIndexChanged}
            loop={false}>
                {this.data.map((item, key) =>{ return <Slider pageItem={item} key={key} /> })}
          </Swiper>
          {this.state.NextShow ? (
          <TouchableOpacity style={styles.nextButtonStyles} onPress={()=>this.swipeForward(this.index)} >
                  <Text style={styles.buttonTextStyles}>NEXT</Text>
          </TouchableOpacity>
          ) : null }
          {this.state.StartShow ? (
          <TouchableOpacity style={styles.nextButtonStyles} onPress={()=>this.swipeEnd()} >
                  <Text style={styles.buttonTextStyles}>START</Text>
          </TouchableOpacity>
          ) : null }
          {this.state.BackShow ? (
          <TouchableOpacity style={styles.PreviosButtonStyles} onPress={()=>this.swipeBackward(this.index)} >
                  <Text style={styles.buttonTextStyles}>BACK</Text>
          </TouchableOpacity>
          ) : null }
        </View>
      )
  }
}