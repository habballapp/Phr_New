import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    scrollViewStyles: {
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
    },
    loginButtonStyles: {
        marginTop: 50,
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA2626',
        height: 50
    },
    loginButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },
    lineStyle: {
        borderBottomColor: '#EA2626',
        borderBottomWidth: 3,
        width: 70,
        marginLeft: 30,
        marginTop: 10
    },
    forgetPasswordButton: {
        marginTop: 20,
    },
    forgetPasswordStyle: {
        marginTop:10,
        fontSize: 18,
        color: 'red',
        fontWeight:'bold',
    },
    signup: {
        marginTop: 20,
        marginBottom:100
    },
    signuphere:{
        fontSize: 18,
        color: '#0080ff',
        fontWeight:'bold',
    },
    invalidInputStyles: {
        marginTop: 5,
        alignSelf: 'center',
        color: 'red'
    }
})