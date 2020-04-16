import React, {Component} from 'react';
import {Container, Textview, Button, Statusbar, Checkbox, ImageView} from '../../default';
import {Text, StyleSheet, Platform, FlatList,ActivityIndicator} from 'react-native'
import { Icon, Header, Title, Item} from 'native-base';
import firebase from 'react-native-firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

var arr_appointment = [];
var arr_app = [];
export default class AppointmentHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,   
            appointments: [],
            app: [],
            urgentcareID: this.props.navigation.getParam('urgentcareID')
             
        }
    }

    componentDidMount(){
        this.takeAppointments();
    }
    takeAppointments(){
        let userID = firebase.auth().currentUser.uid;
    //    let key = firebase.database().ref(`users/urgentcare/${this.state.urgentcareID}/`).child('appointments').push().key;
       
        var dbref = firebase.database().ref(`users/urgentcare/${this.state.urgentcareID}/appointments/`)
        console.log("userid", this.state.urgentcareID);

        dbref.on("value", (snapshot)=>{
            snapshot.forEach((data)=>{
                if(userID === data.val().userID)
                    arr_appointment.push(data.val());
            })  
          
            // console.log("Appointments array before ... ", arr_appointment)
          arr_appointment = arr_appointment.reverse()
            
            
        //s    console.log("Key ... ", key)
            if(arr_appointment!==undefined || arr_appointment!=='' || arr_appointment!==null){    
                this.setState({appointments: arr_appointment}, ()=>{
                    this.setState({loading:false})
                })                        
            }
            arr_appointment = [];
            
        })
    }
    render(){
        if(this.state.loading){
            return(
                <ActivityIndicator size="large" animating color="#0000ff" style={{flex:1,alignSelf:'center'}} />
            )
        }
        else{
            return(
                <Container ContainerStyle={{flex:1}}>     
                    <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70}}>
                        <Statusbar 
                            translucent 
                            backgroundColor='white'
                            barStyle='dark-content'
                        />
                        <Title style={styles.titleStyles}>Appointment History</Title>
                    </Header>
                    <Container ContainerStyle={{marginTop:20,height:'80%',}}>
                        <FlatList
                            data={this.state.appointments}
                            extraData={this.state}
                            renderItem={({item,index})=>(
                                <Container ContainerStyle={{padding:20,alignItems:'center',alignSelf:'center',marginBottom:20,height:160,backgroundColor:'#EA2626',width:'90%',borderRadius:10,flexDirection:'row'}}>
                                    <MaterialCommunityIcons name="calendar-clock" size={100} color="white"/>
                                    <Container ContainerStyle={{marginLeft:25,width:'60%'}}>
                                        <Textview textStyle={{fontSize:20,color:'white'}} text={item.appointment_subject}/>
                                        <Textview textStyle={{fontSize:18,color:'white'}} text={item.date}/>
                                        <Textview textStyle={{fontSize:18,color:'white'}} text={item.time_slot}/>
                                        <Textview textStyle={{fontSize:18,color:'white'}} text={item.status}/>
                                    </Container>
                                </Container>
                            )}
                            keyExtractor={(item)=>item.key.toString()}
                        />
                    </Container>
                </Container>
            )
        }
    }
}
const styles = {
    titleStyles: {fontWeight: 'bold',fontSize:26, alignSelf:'center', flex:1,color:'#EA2626'},
}