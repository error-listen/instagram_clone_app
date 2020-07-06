import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text_instrution: {
        fontWeight: 'bold'
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

    button_sign_up_no: {
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

    button_sign_up: {
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

    button_sign_up_text: {
        fontWeight: 'bold',
        color: '#FFF'
    },

})

export default styles