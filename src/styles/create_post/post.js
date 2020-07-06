import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25
  },

  header: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  new_post_text: {
    fontWeight: 'bold',
    fontSize: 18
  },

  button_post_text: {
    fontWeight: 'bold',
    color: '#3897f0',
    fontSize: 18
  },

  body: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },

  description_input: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    width: 250,
    height: 50,
    padding: 5
  },

  error_text: {
    color: '#FF0000',
    marginTop: 15,
    textAlign: 'center'
  },

})

export default styles