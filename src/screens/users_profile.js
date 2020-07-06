import React, { Fragment, useEffect, useState } from 'react'

import { View, Text, AsyncStorage, ScrollView, Image, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { Video } from 'expo-av'

import HEADER from '../components/header'

import HEADER_CONTEXT from '../contexts/header_context'

import api from '../services/api'

import styles from '../styles/profile'

import posts_icon from '../assets/images/posts_icon.png'
import no_user_picture from '../assets/images/no_user_picture.jpg'

function Profile({ route }) {

    const [profile, set_profile] = useState([])
    const [user_posts, set_user_posts] = useState([])

    const { username } = route.params

    useEffect(() => {

        async function load_profile() {

            const app_token = await AsyncStorage.getItem('app_token')

            const get_profile = await api.get(`/profile/${username}`, {
                headers: {
                    authorization: `Bearer ${app_token}`
                }
            })

            set_profile(get_profile.data.user)

            const get_posts = await api.get('/posts', {
                headers: {
                    authorization: `Bearer ${app_token}`
                }
            })

            function filter_by_author(post) {
                return post.author === get_profile.data.user.username
            }

            set_user_posts(get_posts.data.posts.filter(filter_by_author))

        }

        load_profile()

    }, [])

    return (
        <Fragment>
            <HEADER_CONTEXT.Provider value={{ screen: "profile", username: username }}>
                <HEADER />
            </HEADER_CONTEXT.Provider>
            <ScrollView style={styles.container}>
                <View style={styles.header_container}>
                    <Image
                        style={styles.user_picture}
                        source={!profile.picture_url ? no_user_picture : { uri: profile.picture_url }} />
                    <Text style={styles.full_name}>{profile.full_name}</Text>
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