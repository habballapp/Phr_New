import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Dimensions,
  Image,
  Text
} from 'react-native'
import {Input} from '../default';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')
var validateEmail = '';
var validatePass = '';

export default class Login extends Component{

    constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isLoading: false,
			error: false,
			companyCode: '',
		}
    }    
        static navigationOptions = () => ({
        title: `Login`,
        headerStyle: {
            backgroundColor: '#fff',
            height: 70,
            elevation: 0
        },
        headerTitleStyle:{
            fontSize: 28,
            textAlign: 'center',
            flex:1,
            marginVertical: 10
        }
    })

    handleEmailChange(event) {
		this.setState({
			email: event
		})
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;
		if (reg.test(event) === false && event != '') {
			validateEmail = <Text style={{ color: 'red' }}>Please enter valid email</Text>;
			return false;
		}
		else {
			validateEmail = <View></View>;
		}
    }
    handlePassChange(event) {
		this.setState({
			password: event
		})
		if (event != '' && event.length < 8) {
			validatePass = <Text style={{ color: 'red' }}>Password is not valid</Text>;
		} else {
			validatePass = <View></View>;
		}
    }
    componentWillMount() {
		validateEmail = '';
		validatePass = '';
    }
    
    render(){
        return(
            <View style={styles.container}>
                <StatusBar 
                backgroundColor={'#0080ff'}
                barStyle='light-content'/>
                <ScrollView style={styles.mainContainer} behavior="padding" enabled>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../../assets/logo.png')}/>
                    </View>
                    <View style={styles.formContainer}>
                        <Input 
                            placeholder="Email"
                            placeholderTextColor="#000"
                            keyboardType="email-address"
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                            onChangeText={(event) => this.handleEmailChange(event)}/>
                        {
                            validateEmail ? validateEmail : <View></View>
                        }
                        <Input 
                            placeholder="Password"
                            placeholderTextColor="#000"
                            secureTextEntry={true}
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                            onChangeText={(event) => this.handlePassChange(event)}/>
                        {
                            validatePass ? validatePass : <View></View>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex:1,
    },
    mainContainer:{
        backgroundColor:'#fff',
        flex:1
    },
    imageContainer: {
        flex:1,
        alignItems:'center',
    },
    formContainer:{
        flex:1
    },
    image: {
        marginTop: 45,
        marginBottom: 40,
        height:150,
        width:185
    }
}