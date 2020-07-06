import React, { useState, useEffect } from 'react'

import { View, Text, TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native'

import api from '../services/api'

import AUTH_CONTEXT from '../contexts/auth_context'

import styles from '../styles/sign_in'

import loading_gif from '../assets/gifs/loading_background_blue.gif'

function Sign_in({ navigation }) {

    const [username, set_username] = useState('')
    const [password, set_password] = useState('')
    const [error_message, set_error_message] = useState('')
    const [ready_to_sign_in, set_ready_to_sign_in] = useState(false)
    const [loading, set_loading] = useState(false)

    const { sign_in } = React.useContext(AUTH_CONTEXT)

    useEffect(() => {

        if (password.length >= 8) {
            set_ready_to_sign_in(true)
        } else {
            set_ready_to_sign_in(false)
        }

    })

    async function handle_sign_in(e) {
        e.preventDefault()

        set_loading(true)

        set_error_message('')

        const get_user_token = await api.post('sign_in', {
            username: username.toLowerCase(),
            password
        })

        if (!get_user_token.data.user) {
            set_error_message(get_user_token.data.message)
            set_loading(false)
            return
        }

        await AsyncStorage.setItem('app_token', get_user_token.data.token)

        set_loading(false)

        sign_in(get_user_token.data.token)

    }

    function render_error_message() {
        if (error_message) {
            return <Text style={styles.error_text}>{error_message}</Text>
        }
    }

    function render_loading_gif() {
        if (loading) {
            return <Image source={loading_gif} style={{width: 35, height: 35}} />
        } else {
            return <Text style={styles.button_sign_in_text}>Sign In</Text>
        }
    }

    function render_button_sign_in() {
        if (ready_to_sign_in) {
            return (
                <TouchableOpacity style={styles.button_sign_in} onPress={handle_sign_in} disabled={loading}>
                    {render_loading_gif()}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.button_sign_in_no} disabled={true} onPress={handle_sign_in}>
                    <Text style={styles.button_sign_in_text}>Sign In</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image
                    style={styles.instagram_logo}
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png" }} />
                <TextInput
                    style={styles.text_input}
                    placeholder="Username"
                    placeholderTextColor="#808080"
                    onChangeText={text => set_username(text)}
                    value={username} />
                <TextInput
                    secureTextEntry={true}
                    style={styles.text_input}
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    onChangeText={text => set_password(text)}
                    value={password} />
                {render_error_message()}
                {render_button_sign_in()}
            </View>
            <View style={styles.footer}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Username')}>
                    <Text style={styles.sign_up_text}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Sign_in