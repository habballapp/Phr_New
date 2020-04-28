import React, { Component } from 'react';
import { Container, Textview, Button, Statusbar, Checkbox, ImageView } from '../../default';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLogo from "../../../assets/logo.png";
import { Icon, Header, Title, Item } from 'native-base';
import { FlatList, ActivityIndicator, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage'



var arr_insurance = [];
export default class AboutUs extends Component {

    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'View Insurance';
        let drawerIcon = (
            <MaterialCommunityIcons name="information-outline" size={20} color="red" />
        )
        return { drawerLabel, drawerIcon };
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            insurances: [],
            app: [],
         //   urgentcareID: this.props.navigation.getParam('urgentcareID')

        }
    }

    componentDidMount() {


        this.setState({loading:true});
		AsyncStorage.getItem("urgentcareid").then((value) => {
			if (value != null) {
				this.setState({ urgentcareID: value })
                this.takeInsurances();
			}
			this.setState({ loading: false })
		});
        // console.log("Here")
        // this.takeInsurances();

    }
   
    takeInsurances() {

        //   let userID = firebase.auth().currentUser.uid;

        var dbref = firebase.database().ref(`users/urgentcare/${this.state.urgentcareID}/insurance/`)
        console.log("userid", this.state.urgentcareID);

        dbref.on("value", (snapshot) => {
            snapshot.forEach((data) => {
                arr_insurance.push(data.val());
            })

            if (arr_insurance !== undefined || arr_insurance !== '' || arr_insurance !== null) {
                this.setState({ insurances: arr_insurance }, () => {
                    this.setState({ loading: false })
                })
            }
            console.log("insurances", arr_insurance)
            arr_insurance = [];


        })
    }


    render() {

        return (
            <Container ContainerStyle={{ flex: 1 }}>
                <Header style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', height: 70 }}>
                    <Statusbar
                        translucent
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <Title style={styles.titleStyles}>Insurances</Title>
                </Header>
                <Container ContainerStyle={{ marginTop: 20, height: '90%', }}>
                    <FlatList
                        data={this.state.insurances}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                            <Container ContainerStyle={{alignItems: 'center', alignSelf: 'center', marginBottom: 20, height: 160, backgroundColor: '#EA2626', width: '90%', borderRadius: 10 }}>
                                <Textview textStyle={{ fontSize: 18, color: 'white' }} text={item.Name} />
                                <Container ContainerStyle={{flexDirection:'row',backgroundColor: '#EA2626', width:180,marginRight:'auto' }}>
                                    <Textview textStyle={{ fontSize: 20, color: 'white' }} text={item.Description} />
                                    <ImageView imageStyle={{ width: '80%', height: '100%', flexGrow: 0 }} imgSource={{ uri: item.Logo }} />
                                </Container>

                            </Container>
                        )}
                    //    keyExtractor={(item)=>item.key.toString()}
                    />
                </Container>
            </Container>
        )
    }
}









const styles = {
    appLogo: {
        height: 100,
        width: 100,
        alignSelf: 'center'
    },
    titleStyles: { fontWeight: 'bold', fontSize: 26, alignSelf: 'center', flex: 1, color: '#EA2626' }
}