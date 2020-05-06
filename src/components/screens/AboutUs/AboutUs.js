import React, { Component } from 'react';
import { Container, Textview, Button, ImageView } from '../../default';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLogo from "../../../assets/logo.png";
import { ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class AboutUs extends Component {


    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'About Us';
        let drawerIcon = (
            <MaterialCommunityIcons name="information-outline" size={20} color="red" />
        )
        return { drawerLabel, drawerIcon };
    }

    constructor(props) {
        super(props);

        urgent_care = global.urgentcare_data;
        this.state = {
            // urgent_care_data:this.props.navigation.getParam('urgentcare')
            urgent_care_data: urgent_care
        }
    }


    render() {
        return (
            <Container>
                <Container ContainerStyle={{ justifyContent: 'center', alignSelf: 'center', padding: 20, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <FontAwesome name="bars" style={{ padding: 10, marginRight: "90%" }} size={20} color="#EA2626" />
                    </TouchableOpacity>
                    <ImageView
                        resizeMode="center"
                        imageStyle={styles.appLogo}
                        imgSource={AppLogo}
                    />

                    <Textview textStyle={{ fontSize: 30, color: 'black', fontWeight: 'bold', alignSelf: 'center' }} text="About Us" />
                </Container>
                <Container ContainerStyle={{ width: '85%', height: '70%', backgroundColor: '#EA2626', alignSelf: 'center', padding: 20, borderRadius: 15, marginBottom: 20 }}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}>
                        <Textview textStyle={{ fontSize: 18, color: 'white', alignSelf: 'center' }}
                            text={this.state.urgent_care_data.about}
                        />
                    </ScrollView>
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
}