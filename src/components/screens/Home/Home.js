import React, { Component } from 'react';
import { Container, Textview, Statusbar, Button, ImageView} from '../../default';
import {Platform,ActivityIndicator,Alert,TouchableOpacity,PermissionsAndroid} from 'react-native';
import {Header, Title, } from 'native-base';
import { connect } from 'react-redux';
import {getUserLocation} from '../../../actions/UserLocationAction'
import firebase from 'react-native-firebase'
import Menu, { MenuItem, } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import { LOGIN_CHECK } from '../../../constants/StorageConstans';
import AppLogo from "../../../assets/logo.png";
import PushController from './PushController';
// this.props.navigation.getParam('urgent_care_data')
var emergency_numbers = [];
var flag_emergency=0;
class Home extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            loading:false,
            urgentcares:'',
            numbers: [],
            urgent_care_data:this.props.navigation.getParam('urgent_care_data')
        }
    }
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Home';
        let drawerIcon= (
            <Icon name={Platform.OS == 'ios' ? "ios-home" : "md-home"} style={{ color:'blue' }} size={20}/>
        )
        let Header = null
        return {drawerLabel, drawerIcon, Header};
    }
    _menu = null;
 
    setMenuRef = ref => {
      this._menu = ref;
    };
   
    hideMenu = () => {
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
            let userID = firebase.auth().currentUser.uid; 
            var ref = firebase.database().ref(`users/patients/${userID}/`).child('pushToken');
            ref.remove();
			if (value != null) {
				firebase.auth().signOut().then(()=>{
                    this._menu.hide();
                    AsyncStorage.setItem(LOGIN_CHECK, '').then(() => {
                        this.props.navigation.goBack();
                    });  
                    this.props.navigation.navigate("HomeScreen")
                }).catch(()=>{
                    this._menu.hide();
                    Alert.alert("You are not signed in.")
                });
            }
            else{
                this._menu.hide();
            }
		});
    };
   
    showMenu = () => {
      this._menu.show();
    };

    // takeData(){
    //     console.log("into takeData()")
    //     if(flag == 0){
    //         var dbref = firebase.database().ref(`users/urgentcare/`);
    //         dbref.on("value", function(snapshot){
    //             snapshot.forEach(function(data){
    //                 uc_data.push(data.val())
    //                 console.log("snapshot urgent care... ", uc_data)
    //             })
    //         });
    //         flag=1;
    //     }
    //     if(uc_data!=''){
    //         console.log("uc data is not null", uc_data);
    //         this.setState({loading:false});
    //     }
    //     setTimeout(function(){
    //         this.checkData()
    //     }.bind(this),5000);
    //     this.setState({urgentcares:uc_data})
    // }
    // checkData(){
    //     urgentcares_data = uc_data;
    //     if(urgentcares_data==undefined || urgentcares_data.length<1){
    //         Alert.alert("No or weak Internet Connection.")
    //         this.takeData()
    //     }
    //     else
    //         this.setState({loading:false});
    // }

    componentDidMount(){
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Record Audio permission',
                message:
                'Urgent care app needs access to your microphone ' +
                'so you can record audio.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        AsyncStorage.getItem(LOGIN_CHECK).then((val)=>{
            if(val!=null){
                let userID = firebase.auth().currentUser.uid; 
                var FCM = firebase.messaging();
                var ref = firebase.database().ref(`users/patients/`).child(`${userID}`);
                FCM.getToken().then(token => {
                    ref.update({pushToken: token});
                   });
            }
            else{
                //do nothing..
            }
        })
    }
    componentWillUnmount() {
        flag=0;
    }

    takeEmergencyNumbers(){
        if(flag_emergency==0){
            emergency_numbers.pop();
            console.log("popped..", emergency_numbers);
            let userID = firebase.auth().currentUser.uid;
            var dbref = firebase.database().ref(`users/patients/${userID}/EmergencyContacts/`);
            dbref.on("value", function(snapshot){
                snapshot.forEach(function(data){
                    emergency_numbers.push(data.val())
                })  
                console.log("snapshot emergency numbers... ", emergency_numbers)
            })
            if(emergency_numbers!==undefined || emergency_numbers!==null){
                flag_emergency=1;
                this.updateState(flag_emergency);
            }
        }
        else if(emergency_numbers!=undefined || emergency_numbers!=null){
            this.setState({loading:false})
        }
    }
    updateState(flag_emergency){
        if(flag_emergency==1){
            this.setState({numbers:emergency_numbers}, ()=>{
                console.log("snapshot emergency... ", this.state.numbers)
                this.setState({loading:false})
            });
        }
    }

    onDoctorPress(){
        console.log("urgent care state..", this.state.urgentcares)
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
				this.props.navigation.navigate("BookAppointmentScreen",{'urgentcareID':this.state.urgent_care_data.key})
            }
            else{
                this.props.navigation.navigate("LoginStackScreen")
            }
		});
    }
    onHealthTipsPressed(){
        this.props.navigation.navigate("HealthTips")
    }
    onServicesPressed(){
        this.props.navigation.navigate("Services")
    }
    onEmergencyPressed(){
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
				this.props.navigation.navigate("Emergency",{'urgentcareID':this.state.urgent_care_data.key})
            }
            else{
                this.props.navigation.navigate("LoginStackScreen")
            }
		});
    }
    onAppointmentHistoryPressed(){
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
				this.props.navigation.navigate("AppointmentHistory",{'urgentcareID':this.state.urgent_care_data.key})
            }
            else{
                this.props.navigation.navigate("LoginStackScreen")
            }
		});
    }
    chatmenu = () => {
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
                this.props.navigation.navigate("Chat",{'urgentcareID':this.state.urgent_care_data.key})            }
            else{
                this.props.navigation.navigate("LoginStackScreen")
            }
		});
    }
    onAboutUsPressed(){
        this.props.navigation.navigate("AboutUs");
    }
    onOurLocationPressed(){
        this.props.navigation.navigate("OurLocation");
    }

    render(){
        return(
            this.state.loading ? <ActivityIndicator size="large" color="#0000ff" style={{flex:1,alignSelf:'center'}} /> :
            <Container ContainerStyle={{flex:1, backgroundColor:'#fff'}}>
                <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70}}>
                    <Statusbar 
                        translucent 
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <TouchableOpacity onPress={() => {this.props.navigation.openDrawer(); } }>
                        <FontAwesome name="bars" style={{padding: 10, marginLeft:10}} size={22} color="#0080ff"/>
                    </TouchableOpacity>
                    <Title style={styles.titleStyles}>Home</Title>
                    <Menu
                        ref={this.setMenuRef}
                        button={<Icon name='ios-more' size={35} color="#0080ff" onPress={this.showMenu}/>}
                        >
                        <MenuItem onPress={this.hideMenu}>Sign out</MenuItem>
                    </Menu>
                </Header>
                <Container >                
                    <Container ContainerStyle={{justifyContent:'center',alignSelf:'center', padding:20,}}>
                        <ImageView
                            resizeMode="center"
                            imageStyle={styles.appLogo}
                            imgSource={AppLogo}
                        />
                        <Textview textStyle={{fontSize:30, color:'black', fontWeight:'bold',alignSelf:'center'}} text={this.state.urgent_care_data.first_name}/>
                    </Container>
                    
                    <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:20,}}>
                        <Button textStyle={styles.loginButtonText} title="Book an Appointment" style={{marginRight:10,borderRadius:10,borderWidth:1.5, borderColor:'black',backgroundColor:'rgba(0,128,255, 0.7)', height:100,width:100, alignSelf:'center', marginBottom:20, justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onDoctorPress()}}>
                            <MaterialCommunityIcons name="calendar-clock" size={32} color="white"/>
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="Our Services" style={{marginRight:10,borderWidth:1.5,borderRadius:10, borderColor:'black',backgroundColor:'rgba(0,128,255, 0.7)',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onServicesPressed()}}>
                            <FontAwesome name="handshake-o" size={32} color="white"/>
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="View Health Tips" style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'rgba(0,128,255, 0.7)',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onHealthTipsPressed()}}>
                            <MaterialCommunityIcons name="lightbulb-on-outline" size={32} color="white"/>    
                        </Button>                        
                    </Container>
                    <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:10,}}>
                        <Button textStyle={styles.loginButtonText} title="About Us" style={{marginRight:10,borderRadius:10,borderWidth:1.5, borderColor:'black',backgroundColor:'rgba(0,128,255, 0.7)', height:100,width:100, alignSelf:'center', marginBottom:20, justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onAboutUsPressed()}}>
                            <MaterialCommunityIcons name="information-outline" size={32} color="white"/>
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="Our Location" style={{marginRight:10,borderWidth:1.5,borderRadius:10, borderColor:'black',backgroundColor:'rgba(0,128,255, 0.7)',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onOurLocationPressed()}}>
                            <MaterialCommunityIcons name="map-marker" size={32} color="white"/>    
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="Contact Us" style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'rgba(0,128,255, 0.7)',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{}}>
                            <FontAwesome name="phone" size={32} color="white"/>
                        </Button>                        
                    </Container>
                    <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:10,}}>
                        <Button title="Appointment History" textStyle={styles.loginButtonText} style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'rgba(0,128,255, 0.7)',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center',marginRight:10}} onPress={()=>{this.onAppointmentHistoryPressed()}}>
                            <MaterialCommunityIcons name="clock-outline" size={32} color="white"/>
                        </Button> 
                        <Button textStyle={styles.loginButtonText} title="EMERGENCY CALL" style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'#F08080',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center',marginRight:10}} onPress={()=>{this.onEmergencyPressed()}}>
                            <MaterialCommunityIcons name="phone-plus" size={32} color="white"/>
                        </Button>
                        <Button title="Chat" textStyle={styles.loginButtonText} style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'rgba(0,128,255, 0.7)',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.chatmenu()}}>
                            <Icon name="md-chatboxes" size={32} color="white"/>
                        </Button> 
                    </Container>
                </Container>
                <PushController/> 
            </Container>
        )
    }
}
const mapStateToProps = state => {
    console.log("home mapstatetoprops..", state)
    return state
}
const mapActionToProps = {
    location: getUserLocation,
}
export default connect(mapStateToProps,mapActionToProps)(Home)

const styles = {
    titleStyles: {fontWeight: 'bold',fontSize:26, alignSelf:'center', flex:1,color:'#0080ff'},
    loginButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
        alignSelf:'center',
        textAlign:'center'
    },
    appLogo: {
        height: 100,
        width: 100,
        alignSelf:'center'
    },
}