import React, { useState, useEffect } from 'react'

import { View, Text, TouchableOpacity, AsyncStorage, TextInput, Image } from 'react-native'

import { CommonActions } from '@react-navigation/native'

import api from '../../services/api'
import styles from '../../styles/create_post/post'

import loading_gif from '../../assets/gifs/loading_background_white.gif'

function Post({ route, navigation }) {

    const [user_logged, set_user_logged] = useState([])
    const [description, set_description] = useState('')
    const [loading, set_loading] = useState(false)
    const [error_message, set_error_message] = useState('')

    const { uri } = route.params
    const { type } = route.params
    const { filename } = route.params
    const { type_file } = route.params

    useEffect(() => {

        async function get_user_logged() {
            const app_token = await AsyncStorage.getItem('app_token')

            const get_user_loged = await api.get('user', {
                headers: {
                    authorization: `Bearer ${app_token}`
                }
            })
            set_user_logged(get_user_loged.data.user)
        }

        get_user_logged()
    }, [])

    async function post() {

        set_error_message('')

        set_loading(true)

        const data = new FormData()

        const app_token = await AsyncStorage.getItem('app_token')

        data.append('user_id', user_logged._id)
        data.append('description', description)
        data.append('file', {
            uri: uri,
            type: type,
            name: filename
        })
        data.append('type', type_file)

        const post = await api.post('post/create', data, {
            headers: {
                authorization: `Bearer ${app_token}`
            }
        })

        if (post.data.message === 'Maximum file size of 20MB') {
            set_error_message('Maximum file size of 20MB')
            set_loading(false)
            return
        }

        set_loading(false)

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            })
        );

        navigation.navigate('Home', { screen: 'Feed' })
    }

    function render_error_message() {
        if (error_message) {
            return <Text style={styles.error_text}>{error_message}</Text>
        }
    }

    function render_loading() {
        if (loading) {
            return <Image source={loading_gif} style={{ width: 30, height: 30 }} />
        } else {
            return (
                <TouchableOpacity onPress={post}>
                    <Text style={styles.button_post_text}>Post</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.new_post_text}>New post</Text>
                {render_loading()}
            </View>
            <View style={styles.body}>
                <Image source={{ uri: uri }} style={{ width: 50, height: 50 }} />
                <TextInput
                    style={styles.description_input}
                    multiline={true}
                    numberOfLines={10}
                    placeholder='Description'
                    onChangeText={text => set_description(text)}
                    value={description} />
            </View>
            {render_error_message()}
        </View>
    )
}

export default Post