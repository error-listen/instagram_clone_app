import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header_container: {
      padding: 20,
      backgroundColor: '#F5F5F5'
  },

  user_picture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5
  },

  full_name: {
      marginTop: 10,
      fontWeight: 'bold'
  },

  button_upload_picture: {
    paddingTop: 20,
    paddingBottom: 20
  },

  button_upload_picture_text: {
    fontWeight: 'bold',
    color: '#3897f0'
  },

  button_remove_picture: {
    paddingBottom: 20
  },

  button_remove_picture_text: {
    fontWeight: 'bold',
    color: '#FF0000'
  },

  separate: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#DBDBDB',  
      borderBottomColor: '#DBDBDB',  
      padding: 5,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#F5F5F5'
  },

  posts_icon: {
      height: 30,
      width: 30
  },

  body_container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  post_image: {
      height: 120,
      width: 120
  }

})

export default styles