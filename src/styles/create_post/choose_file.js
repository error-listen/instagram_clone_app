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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  gallery_text: {
    fontWeight: 'bold',
    fontSize: 18
  },

  button_advance_text: {
    fontWeight: 'bold',
    color: '#3897f0',
    fontSize: 18
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
    display: 'none'
  },

  images: {
    width: 90,
    height: 90,
    margin: 1
  }
})

export default styles