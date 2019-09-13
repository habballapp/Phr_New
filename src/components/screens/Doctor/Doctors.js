import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform, FlatList} from 'react-native';
import {Container, Statusbar, Textview} from '../../default';
import { SearchBar } from 'react-native-elements';
import {Header,  Icon, Title} from 'native-base';
import {Button as NavButton} from 'native-base';
import { Modal,TouchableOpacity, View, Text } from 'react-native';

function Item({ title }) {
    return (
      <Container ContainerStyle={{}}>
        <Textview textStyle={{fontSize:20, color:'black'}} text={title}/>
      </Container>
    );
  }
  
  
class Doctors extends Component{
    state = {
        search: '',
        doctorsList: this.props.doctors,
        addFilters:false,
        modalVisible:false
      };
      updateSearch = (search) => {
        let doctor = this.props.doctors.filter((item) => {
            return String(item.name).includes(search)
        })
        this.setState({
            doctorsList: doctor
        })
    }
    AddFilters() {
        console.log(this.state.addFilters)
        
      }
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }    
    render(){
        return(
            <Container style={{flex:1, backgroundColor:'grey'}}>
                <Header style={{backgroundColor:'#0080ff'}}>
                    <Statusbar 
                        backgroundColor={'#0080ff'}
                        barStyle='light-content'
                    />
                    <NavButton transparent style={{position:'absolute', left:0}} onPress={this.props.navigation.openDrawer}>
                        <Icon name= {Platform.OS == 'ios' ? "ios-menu" : "md-menu"} />
                    </NavButton>
                    <SearchBar
                        placeholder="Search for doctors..."
                        onChangeText={this.updateSearch}
                        value={this.state.doctorsList}
                        round
                        lightTheme
                        containerStyle={{width:'70%', backgroundColor:'#0080ff'}}
                    />
                    <NavButton transparent style={{position:'absolute', right:0}} onPress={() => this.setModalVisible(true)}>
                        <Icon name= {Platform.OS == 'ios' ? "ios-add" : "md-add"} />
                    </NavButton>
                </Header>
                <FlatList
                    extraData={this.state}
                    data={this.state.doctorsList}
                    renderItem={({ item, index, separators }) => (
                        <Container ContainerStyle={{backgroundColor:'grey'}}>
                            <TouchableOpacity
                                style={{backgroundColor:'white', height:40}}
                                onPress={() => {}}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <Container ContainerStyle={{backgroundColor: 'white'}}>
                                    <Textview textStyle={{fontSize:20, color:'black'}} text={item.name}/>
                                </Container>
                            </TouchableOpacity>
                        </Container>
                    )}
                    keyExtractor={item => item.id}
                  />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                        <Text>Hello World!</Text>

                        <TouchableOpacity
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    console.log("mapStateToProps",state);
    return state;
}
export default connect(mapStateToProps)(Doctors);
