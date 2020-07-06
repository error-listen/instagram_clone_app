import React, { useEffect, useState, Fragment, useRef, useCallback } from 'react'

import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, AsyncStorage, RefreshControl, SafeAreaView } from 'react-native'

import { Video } from 'expo-av'

import io from 'socket.io-client'

import AutoHeightImage from 'react-native-auto-height-image'

import HEADER from '../components/header'

import HEADER_CONTEXT from '../contexts/header_context'

import api from '../services/api'

import styles from '../styles/feed'

import like_image from '../assets/images/like.png'
import dislike_image from '../assets/images/dislike.png'
import play_image from '../assets/images/play.png'
import no_user_picture from '../assets/images/no_user_picture.jpg'

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    })
}

function Feed({ navigation }) {

    const [posts, set_posts] = useState([])
    const [user_logged, set_user_logged] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const win = Dimensions.get('window')

    const videos = useRef([])
    const buttons = useRef([])

    async function load_feed() {

        const app_token = await AsyncStorage.getItem('app_token')

        const get_posts = await api.get('posts', {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })

        set_posts(get_posts.data.posts)

        const get_user_loged = await api.get('user', {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })

        set_user_logged(get_user_loged.data.user)
    }

    useEffect(() => {

        load_feed()

    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true)

        load_feed()

        wait(2000).then(() => setRefreshing(false))
    }, [])

    useEffect(() => {
        const socket = io('https://project-instagram-backend.herokuapp.com', {
            query: { user: user_logged._id }
        })
        socket.on('post', new_post => {
            set_posts(posts.map(post => post._id === new_post._id ? new_post : post))
        })
    })

    navigation.addListener('blur', () => {
        for (let i = 0; i < videos.current.length; i++) {
            if (videos.current[i] !== undefined && videos.current[i] !== null) {
                videos.current[i].pauseAsync()
                buttons.current[i].setNativeProps({ display: 'flex' })
            }
        }
    })

    function play_video(index_video) {
        if (videos.current[index_video] !== undefined) {
            videos.current[index_video].playAsync()
            buttons.current[index_video].setNativeProps({ display: 'none' })
        }
    }

    function pause_video(index_video) {
        if (videos.current[index_video] !== undefined) {
            videos.current[index_video].pauseAsync()
            buttons.current[index_video].setNativeProps({ display: 'flex' })
        }
    }

    async function like(post_id) {

        const app_token = await AsyncStorage.getItem('app_token')

        await api.post('/post/like', {
            post_id,
            user_id: user_logged._id,
        }, {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })
    }

    function check_like(like) {
        if (like.username === user_logged.username) {
            return true
        } else {
            return false
        }
    }

    return (
        <Fragment>
            <HEADER_CONTEXT.Provider value={"feed"}>
                <HEADER />
            </HEADER_CONTEXT.Provider>
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {posts.map((post, i) => {
                    return (
                        <View style={styles.post} key={post._id}>
                            <View style={styles.post_header}>
                                <TouchableOpacity onPress={() => navigation.navigate("Users_profile", { username: post.author })}>
                                    <Image
                                        style={styles.author_post_picture}
                                        source={!post.picture_url ? no_user_picture : { uri: post.picture_url }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Users_profile", { username: post.author })}>
                                    <Text style={styles.text_bold}>{post.author}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.post_body}>
                                {post.type === "image" ?
                                    <AutoHeightImage width={win.width} source={{ uri: post.file_url }} /> :
                                    <View style={styles.container_video}>
                                        <TouchableOpacity onPress={() => pause_video(i)}>
                                            <Video
                                                ref={el => videos.current[i] = el}
                                                source={{ uri: post.file_url }}
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="cover"
                                                shouldPlay={false}
                                                isLooping
                                                style={{ width: "100%", aspectRatio: 1 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => play_video(i)} style={styles.button_play}>
                                            <Image style={styles.button_play_image} source={play_image} ref={el => buttons.current[i] = el} />
                                        </TouchableOpacity>
                                    </View>}
                                <TouchableOpacity onPress={() => like(post._id)}>
                                    <Image style={styles.like_image} source={post.likes.filter(check_like).length > 0 ? dislike_image : like_image} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.footer}>
                                {post.likes.length > 0
                                    ? post.likes.length > 1
                                        ? <Text>Liked by <Text style={styles.text_bold}>{post.likes[0].username}</Text> <Text>and</Text> {post.likes.length > 1
                                            ? <Text style={styles.text_bold}>others people</Text>
                                            : <Text></Text>}</Text> : <Text style={styles.text_bold}>{post.likes.length} likes</Text>
                                    : <Text></Text>}
                                {!post.description ? <Text></Text> : <Text><Text style={styles.text_bold}>{post.author}</Text><Text> {post.description}</Text></Text>}
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </Fragment >
    )
}


export default Feed