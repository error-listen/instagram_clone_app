import React, { Fragment, useEffect, useState } from 'react'

import { View, Text, AsyncStorage, ScrollView, Image, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { Video } from 'expo-av'

import HEADER from '../components/header'

import HEADER_CONTEXT from '../contexts/header_context'
import AUTH_CONTEXT from '../contexts/auth_context'
import PICTURE_CONTEXT from '../contexts/picture_context'

import api from '../services/api'

import styles from '../styles/profile'

import posts_icon from '../assets/images/posts_icon.png'
import no_user_picture from '../assets/images/no_user_picture.jpg'

function Profile() {

    const [user_logged, set_user_logged] = useState([])
    const [user_posts, set_user_posts] = useState([])

    const { sign_out } = React.useContext(AUTH_CONTEXT)
    const { user_picture } = React.useContext(PICTURE_CONTEXT)

    async function load_profile() {

        const app_token = await AsyncStorage.getItem('app_token')

        const get_user_loged = await api.get('user', {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })
        set_user_logged(get_user_loged.data.user)

        const get_posts = await api.get('/posts', {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })


        function filter_by_author(post) {
            return post.author === get_user_loged.data.user.username
        }

        set_user_posts(get_posts.data.posts.filter(filter_by_author))

    }


    useEffect(() => {

        load_profile()

    }, [])

    async function dele_picture_profile() {

        const app_token = await AsyncStorage.getItem('app_token')

        await api.post('user/delete/picture', { user_id: user_logged._id }, {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })

        user_picture('Change')

        load_profile()

        user_picture('')

    }

    function random_name_image(length) {
        var result = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters_length = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters_length))
        }
        return result
    }

    async function upload_picture_profile() {

        await ImagePicker.requestCameraRollPermissionsAsync()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        })

        let file_extension = result.uri.split('.').pop()

        const app_token = await AsyncStorage.getItem('app_token')

        const data = new FormData()
        data.append('user_id', user_logged._id)
        data.append('file', {
            name: random_name_image(10),
            type: `image/${file_extension}`,
            uri: result.uri
        })

        await api.post('user/add/picture', data, {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })

        user_picture('Change')

        load_profile()

        user_picture('')

    }

    async function logout() {
        await AsyncStorage.removeItem('app_token')
        sign_out()
    }

    return (
        <Fragment>
            <HEADER_CONTEXT.Provider value={{ screen: "profile", username: '' }}>
                <HEADER />
            </HEADER_CONTEXT.Provider>
            <ScrollView style={styles.container}>
                <View style={styles.header_container}>
                    <TouchableOpacity>
                        <Image
                            style={styles.user_picture}
                            source={!user_logged.picture_url ? no_user_picture : { uri: user_logged.picture_url }} />
                    </TouchableOpacity>
                    <Text style={styles.full_name}>{user_logged.full_name}</Text>
                    <TouchableOpacity onPress={upload_picture_profile} style={styles.button_upload_picture}>
                        <Text style={styles.button_upload_picture_text}>Upload photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={dele_picture_profile} style={styles.button_remove_picture}>
                        <Text style={styles.button_remove_picture_text}>Remove current photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout} style={styles.button_remove_picture}>
                        <Text style={styles.button_remove_picture_text}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separate}>
                    <Image style={styles.posts_icon} source={posts_icon} />
                </View>
                <View style={styles.body_container}>
                    {user_posts.map(post => {
                        return (
                            <Fragment key={post._id}>
                                {post.type === "image" ? <Image style={styles.post_image} source={{ uri: post.file_url }} ></Image> : <Video
                                    source={{ uri: post.file_url }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="stretch"
                                    shouldPlay={false}
                                    isLooping
                                    style={{ width: 120, height: 120 }}
                                />}
                            </Fragment>
                        )
                    })}
                </View>
            </ScrollView>
        </Fragment >
    )
}

export default Profile