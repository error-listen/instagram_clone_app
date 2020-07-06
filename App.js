import React, { useEffect, useState, useReducer, useMemo } from 'react'

import { AsyncStorage, Image, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import SIGN_IN_SCREEN from './src/screens/sign_in'
import USERNAME_SCREEN from './src/screens/sign_up/username'
import SIGN_UP_SCREEN from './src/screens/sign_up/sign_up'
import FEED_SCREEN from './src/screens/feed'
import PROFILE_SCREEN from './src/screens/profile'
import CHOOSE_FILE_SCREEN from './src/screens/creat_post/choose_file'
import POST_SCREEN from './src/screens/creat_post/post'
import USERS_PROFILE from './src/screens/users_profile'

import api from './src/services/api'

import AUTH_CONTEXT from './src/contexts/auth_context'
import PICTURE_CONTEXT from './src/contexts/picture_context'

import icon_in_feed from './src/assets/images/in_feed.png'
import icon_feed from './src/assets/images/feed.png'
import no_user_picture from './src/assets/images/no_user_picture.jpg'
import icon_new_post from './src/assets/images/new_post.png'

import loading_gif from './src/assets/gifs/loading_background_white.gif'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function ICON_IN_FEED() {
  return <Image source={icon_in_feed} style={{ height: 30, width: 30 }} />
}

function ICON_FEED() {
  return <Image source={icon_feed} style={{ height: 30, width: 30 }} />
}

function ICON_NEW_POST() {
  return <Image source={icon_new_post} style={{ height: 30, width: 30 }} />
}

function SPLASH_SCREEN() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
      <Image source={loading_gif} style={{ width: 40, height: 40 }} />
    </View>
  )
}

function Home() {

  const [user_logged, set_user_logged] = useState([])

  useEffect(() => {

    get_user()

  }, [])

  async function get_user() {

    const app_token = await AsyncStorage.getItem('app_token')

    const get_user_loged = await api.get('user', {
      headers: {
        authorization: `Bearer ${app_token}`
      }
    })

    set_user_logged(get_user_loged.data.user)

  }

  function render_picture() {
    return (
      <Image style={{ height: 30, width: 30, borderRadius: 50, }} source={!user_logged.picture_url ? no_user_picture : { uri: user_logged.picture_url }} />
    )
  }

  function render_in_picture() {
    return (
      <View style={{ height: 35, width: 35, borderRadius: 50, borderColor: "black", borderWidth: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image style={{ height: 30, width: 30, borderRadius: 50, }} source={!user_logged.picture_url ? no_user_picture : { uri: user_logged.picture_url }} />
      </View>
    )
  }

  const picture_context = useMemo(() => ({

    user_picture: async data => {
      if (data) {
        get_user()
      }
    },

  }),
    []
  )

  return (
    <PICTURE_CONTEXT.Provider value={picture_context}>
      <Tab.Navigator tabBarOptions={{ showLabel: false }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === "Feed") {
              if (focused) {
                return <ICON_IN_FEED color={color} size={size} />
              } else {
                return <ICON_FEED color={color} size={size} />
              }
            } else if (route.name === "Choose_File") {
              return <ICON_NEW_POST color={color} size={size} />
            } else if (route.name === "Profile") {
              if (focused) {
                return render_in_picture()
              } else {
                return render_picture()
              }
            }
          },
        })}>
        <Tab.Screen name="Feed" component={FEED_SCREEN} />
        <Tab.Screen name="Choose_File" component={CHOOSE_FILE_SCREEN} />
        <Tab.Screen name="Profile" component={PROFILE_SCREEN} />
      </Tab.Navigator>
    </PICTURE_CONTEXT.Provider>
  )
}


function App() {

  const [state, dispatch] = useReducer(
    (prev_state, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prev_state,
            user_token: action.token,
            is_loading: false,
          }
        case 'SIGN_IN':
          return {
            ...prev_state,
            is_sign_out: false,
            user_token: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prev_state,
            is_sign_out: true,
            user_token: null,
          }
      }
    },
    {
      is_loading: true,
      is_sign_out: false,
      user_token: null,
    }
  )

  useEffect(() => {
    const bootstrap_async = async () => {
      let user_token

      try {
        user_token = await AsyncStorage.getItem('app_token')
      } catch (e) {
      }
      dispatch({ type: 'RESTORE_TOKEN', token: user_token })
    }

    bootstrap_async()
  }, [])

  const auth_context = useMemo(() => ({

    sign_in: async data => {
      dispatch({ type: 'SIGN_IN', token: data })
    },

    sign_out: () => dispatch({ type: 'SIGN_OUT' }),

    sign_up: async data => {
      dispatch({ type: 'SIGN_IN', token: data })
    },
  }),
    []
  )

  return (
    <AUTH_CONTEXT.Provider value={auth_context}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.is_loading ?
            <Stack.Screen name="Splash" component={SPLASH_SCREEN} options={{ headerShown: false }} /> :
            state.user_token == null ?
              <>
                <Stack.Screen name="Sign_in" options={{ headerShown: false }} component={SIGN_IN_SCREEN} />
                <Stack.Screen name="Username" options={{ headerShown: false }} component={USERNAME_SCREEN} />
                <Stack.Screen name="Sign_up" options={{ headerShown: false }} component={SIGN_UP_SCREEN} />
              </> :
              <>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Post" options={{ headerShown: false }} component={POST_SCREEN} />
                <Stack.Screen name="Users_profile" options={{ headerShown: false }} component={USERS_PROFILE} />
              </>}
        </Stack.Navigator>
      </NavigationContainer>
    </AUTH_CONTEXT.Provider>
  )
}

export default App
