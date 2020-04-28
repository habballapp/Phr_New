import React, { Component } from 'react';
import { Container, Textview, Statusbar, Button, ImageView,Input} from '../../default';
import {Platform,ActivityIndicator,Alert,Linking,TouchableOpacity,PermissionsAndroid} from 'react-native';
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
import Modal from "react-native-modal";

var emergency_numbers = [];
var flag_emergency=0;
class Home extends Component {
    constructor(props){
        super(props);
        var urgentcareid = this.props.navigation.getParam('urgent_care_data').key;
        // AsyncStorage.setItem("urgentcareid", urgentcareid).then(() => {

        //     console.log("setKey", "urgent care id is set to be " + urgentcareid);
        // });  
        global.urgentcare_data = this.props.navigation.getParam('urgent_care_data');
        global.urgentcareid = this.props.navigation.getParam('urgent_care_data').key;
        global.urgentname = this.props.navigation.getParam('urgent_care_data').first_name;
        // console.log("global.urgentcareid_1", this.props.navigation.getParam('urgent_care_data'));
        // console.log("global.urgentcareid_2", this.props.navigation.getParam('urgent_care_data').key);
        // console.log("global.urgentcareid_3", global.urgentcareid);
      
        this.state = {
            loading:false,
            urgentcares:'',
            numbers: [],
            isModalVisible: false,
            
            urgent_care_data:this.props.navigation.getParam('urgent_care_data')
        }
        console.log("UrgentCare",this.state.urgent_care_data)
    }
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Home';
        let drawerIcon= (
            <Icon name={Platform.OS == 'ios' ? "ios-home" : "md-home"} style={{ color:'red' }} size={20}/>
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
              
                  
                }).catch(()=>{
                    this._menu.hide();
                    Alert.alert("You are not signed in.")
                    this.setState({ isModalVisible: true });
                });
            }
            else{
                this._menu.hide();
               this.setState({ isModalVisible: true });
            }
		});
    };
   
    showMenu = () => {
      this._menu.show();
    };


    onHomeIconPressed(){
        let Number_ = this.state.urgent_care_data.pnumber;
        let phoneNumber = Number_;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${Number_}`;
        }
        else  {
            phoneNumber = `tel:${Number_}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } 
            else {
                return Linking.openURL(phoneNumber);
            }
        })
    }

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
        AsyncStorage.setItem("urgentcareid", this.state.urgent_care_data.key).then(() => {

        });      


        

        // PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        //     {
        //         title: 'Record Audio permission',
        //         message:
        //         'Urgent care app needs access to your microphone ' +
        //         'so you can record audio.',
        //         buttonNeutral: 'Ask Me Later',
        //         buttonNegative: 'Cancel',
        //         buttonPositive: 'OK',
        //     },
        // );


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

    onSavePressed(){
        
        this.props.navigation.navigate("LoginStackScreen")
        this.setState({isModalVisible:false})
        
    }

    onCancelPressed(){

     //   this.props.navigation.navigate("SignUp");

        this.props.navigation.navigate("SignUp",{'urgentcareName':this.state.urgent_care_data.first_name})

     
        this.setState({ isModalVisible: false });
    }

    
    onDoctorPress(){
        console.log("urgent care state..", this.state.urgentcares)
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
                this.props.navigation.navigate("BookAppointmentScreen",{'urgentcareID':this.state.urgent_care_data.key})
              //  this.setState({ isModalVisible: false });
            }
            else{
               
              this.setState({ isModalVisible: true });

             
            }
		});
    }
    onHealthTipsPressed(){
        // this.props.navigation.navigate("HealthTips")
        this.props.navigation.navigate("HealthTips",{'urgentcareID':this.state.urgent_care_data.key})
    }
    onServicesPressed(){

        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
                this.props.navigation.navigate("Prescription")
              this.setState({ isModalVisible: false });
            }
            else{
                this.setState({ isModalVisible: true });
            }
		});
      
    }
    onEmergencyPressed(){
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
                this.props.navigation.navigate("Emergency",{'urgentcare':this.state.urgent_care_data})
              this.setState({ isModalVisible: false });
            }
            else{
                this.setState({ isModalVisible: true });
            }
		});
    }
    onAppointmentHistoryPressed(){
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
                this.props.navigation.navigate("AppointmentHistory",{'urgentcareID':this.state.urgent_care_data.key})
             //   this.setState({ isModalVisible: false });
            }
            else{
             //   this.props.navigation.navigate("LoginStackScreen")
            // this.PopUpPressed();
            this.setState({ isModalVisible: true });
            }
		});
    }
    chatmenu = () => {
        AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
			if (value != null) {
                this.props.navigation.navigate("Chat",{'urgentcareID':this.state.urgent_care_data.key})
                this.setState({ isModalVisible: false });
            }
            else{
                this.setState({ isModalVisible: true });
            }
		});
    }
    onAboutUsPressed(){
       
        this.props.navigation.navigate("Insurance",{'urgentcareID':this.state.urgent_care_data.key})

     //  this.props.navigation.navigate("AboutUs");
      //  this.props.navigation.navigate("AboutUs",{'urgentcareAbout':this.state.urgent_care_data.about})
    }
    onOurLocationPressed(){
       // this.props.navigation.navigate("OurLocation");
        this.props.navigation.navigate("OurLocation",{'urgentcare':this.state.urgent_care_data})

    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };


      onClosePressed(){

        this.setState({ isModalVisible: false});
      }

    
   

    render(){
        return(
            this.state.loading ? <ActivityIndicator size="large" color="#EA2626" style={{flex:1,alignSelf:'center'}} /> :
           
            <Container ContainerStyle={{flex:1, backgroundColor:'#fff'}}>
           <Container stylesbutton = {{alignSelf:'baseline', backgroundColor:'#fed8b1'}} >
                <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70}}>
                    <Statusbar 
                        translucent 
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <TouchableOpacity onPress={() => {this.props.navigation.openDrawer() } }>
                        <FontAwesome name="bars" style={{padding: 10, marginLeft:5}} size={22} color="#EA2626"/>
                    </TouchableOpacity>
                    <Title style={styles.titleStyles}>Home</Title>
                    <Menu
                        ref={this.setMenuRef}
                        button={<Icon name='ios-more' size={35} color="#EA2626" onPress={this.showMenu}/>}
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
                    
                    <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:20,backgroundColor:'#fff'}}>
                        <Button textStyle={styles.loginButtonText} title="Book an Appointment" style={{marginRight:10,borderRadius:10,borderWidth:1.5, borderColor:'black',backgroundColor:'#EA2626', height:100,width:100, alignSelf:'center', marginBottom:20, justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onDoctorPress()}}>
                            <MaterialCommunityIcons name="calendar-clock" size={32} color="white"/>
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="Add Prescription" style={{marginRight:10,borderWidth:1.5,borderRadius:10, borderColor:'black',backgroundColor:'#EA2626',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{ this.onServicesPressed()}}>
                            <FontAwesome name="ambulance" size={32} color="white"/>
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="View Health Tips" style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'#EA2626',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onHealthTipsPressed()}}>
                            <MaterialCommunityIcons name="lightbulb-on-outline" size={32} color="white"/>    
                        </Button>                        
                    </Container>    
                    <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:10,}}>
                        <Button textStyle={styles.loginButtonText} title="View Insurance" style={{marginRight:10,borderRadius:10,borderWidth:1.5, borderColor:'black',backgroundColor:'#EA2626', height:100,width:100, alignSelf:'center', marginBottom:20, justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onAboutUsPressed()}}>
                             <FontAwesome name="medkit" size={32} color="white"/>
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="Our Location" style={{marginRight:10,borderWidth:1.5,borderRadius:10, borderColor:'black',backgroundColor:'#EA2626',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onOurLocationPressed()}}>
                            <MaterialCommunityIcons name="map-marker" size={32} color="white"/>    
                        </Button>
                        <Button textStyle={styles.loginButtonText} title="Contact Us" style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'#EA2626',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.onHomeIconPressed()}}>
                            <FontAwesome name="phone" size={32} color="white"/>
                        </Button>                        
                    </Container>
                    <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:10,}}>
                        <Button title="Appointment History" textStyle={styles.loginButtonText} style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'#EA2626',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center',marginRight:10}} onPress={()=>{this.onAppointmentHistoryPressed()}}>
                            <MaterialCommunityIcons name="clock-outline" size={32} color="white"/>
                        </Button> 
                        <Button textStyle={styles.loginButtonText} title="EMERGENCY CALL" style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'#EA2626',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center',marginRight:10}} onPress={()=>{this.onEmergencyPressed()}}>
                            <MaterialCommunityIcons name="phone-plus" size={32} color="white"/>
                        </Button>
                        <Button title="Chat" textStyle={styles.loginButtonText} style={{borderWidth:1.5,borderRadius:10, borderColor:'black', backgroundColor:'#EA2626',  height:100,width:100, alignSelf:'center', marginBottom:20,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.chatmenu()}}>
                            <Icon name="md-chatboxes" size={32} color="white"/>
                        </Button> 
                    </Container>

                </Container>
                <PushController/> 

                <Modal
                            isVisible={this.state.isModalVisible}
                            style={{justifyContent: 'flex-end',}}
                            animationIn="slideInUp"
                            animationOut="slideOutDown"
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            backdropTransitionInTiming={800}
                            backdropTransitionOutTiming={800}    
                            >
                            <Container ContainerStyle={{ backgroundColor: '#fff', padding: 20,height: 300, borderRadius:15 }}>

                                <Textview styles={{alignSelf:'center'}}>
                                    Please Sign In or Sign Up First
                                </Textview>
                               
                               
                            <Container ContainerStyle={{flexDirection:'column', alignSelf:'center', alignItems:'center'}}>
                                <Button title="Sign In" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={()=>{this.onSavePressed()}} />
                                <Button title="Sign Up" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={()=>{this.onCancelPressed()}} />
                                <Button title="Close" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={()=>{this.onClosePressed()}} />
                            </Container>
                            </Container>
                        </Modal>
         
            </Container>

                            <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:10,
                                position:'absolute', bottom:0}}>
                            <Textview >
                                Powered by Matz Group©
                            </Textview>
                        </Container>

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
    titleStyles: {fontWeight: 'bold',fontSize:26, alignSelf:'center', flex:1,color:'#EA2626'},
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
    input: {
        fontSize: 18,
        color: '#000',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height:150,
        alignSelf:'flex-start',
        textAlignVertical: 'top'
    },
    titleStyles: {
        fontSize:22, 
        marginLeft:20,
        alignSelf:'center'
    },
    inputModal:{
        borderRadius:10,
        marginBottom:15,
        marginTop:15,
        borderWidth: 1,
        borderColor: '#000',
        fontSize: 18,
        color: '#000',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height:60,
    },
    ModalButton: {
        marginTop: 30,
        width: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA2626',
        height: 40,
        marginRight:10,
        marginBottom:10
    },
    ModalButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
    },
    // bottomView:{
 
    //     width: '100%', 
    //     height: 50, 
    //     backgroundColor: '#FF9800', 
    //     justifyContent: 'center', 
    //     alignItems: 'center',
    //     position: 'absolute',
    //     bottom: 0
    //   },
    //   textStyle:{
 
    //     color: '#fff',
    //     fontSize:22
    //   }
}