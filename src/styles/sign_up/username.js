import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },

    icon_user: {
        width: 200,
        height: 200
    },

    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text_input: {
        padding: 10,
        width: 300,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: '#EBEBEB'
    },

    error_text: {
        color: '#FF0000',
        marginTop: 15,
        textAlign: 'center'
    },

    button_advance_no: {
        marginTop: 15,
        padding: 15,
        width: 300,
        height: 40,
        backgroundColor: '#C3E0FB',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    button_advance: {
        marginTop: 15,
        padding: 15,
        width: 300,
        height: 40,
        backgroundColor: '#3897f0',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    button_advance_text: {
        fontWeight: 'bold',
        color: '#FFF'
    },

    footer: {
        borderTopWidth: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        borderTopColor: '#DBDBDB',
    },

    sign_in_text: {
        fontWeight: 'bold',
        color: '#3897f0'
    }

})

export default styles