import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },

    instagram_logo: {
        width: 200,
        height: 60
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

    button_sign_in_no: {
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

    button_sign_in: {
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

    button_sign_in_text: {
        fontWeight: 'bold',
        color: '#FFF'
    },

    footer: {
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderTopColor: '#DBDBDB',
    },
    
    sign_up_text: {
        fontWeight: 'bold',
        color: '#3897f0'
    }

  })

  export default styles
  