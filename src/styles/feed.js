import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  text_bold: {
    fontWeight: 'bold'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  post: {
    marginBottom: 10
  },

  post_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },

  author_post_picture: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5
  },

  like_image: {
    width: 30, 
    height: 30,
    marginLeft: 15,
    marginTop: 15
  },

  footer: {
    display: 'flex',
    padding: 10
  },

  container_video: {
    position: 'relative',
  },

  button_play: {
    position: 'absolute',
    top: '50%',
    left: '35%',
    transform: [{ translateX: -50 }],
    transform: [{ translateY: -50 }],
  },

  button_play_image: {
    width: 100,
    height: 100,
  }

})

export default styles