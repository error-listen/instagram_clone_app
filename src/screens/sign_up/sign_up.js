import React, { useState, useEffect } from 'react'

import { Text, View, TouchableOpacity, TextInput, AsyncStorage, Image } from 'react-native'

import api from '../../services/api'

import AUTH_CONTEXT from '../../contexts/auth_context'

import styles from '../../styles/sign_up/sign_up'

import loading_gif from '../../assets/gifs/loading_background_blue.gif'

function Sign_up({ route }) {

    const [full_name, set_full_name] = useState('')
    const [password, set_password] = useState('')
    const [ready_to_sign_up, set_ready_to_sign_up] = useState(false)
    const [loading, set_loading] = useState(false)

    const { username } = route.params

    const { sign_up } = React.useContext(AUTH_CONTEXT)

    useEffect(() => {
        if (password.length >= 8) {
            set_ready_to_sign_up(true)
        } else {
            set_ready_to_sign_up(false)
        }
    })

    async function handle_sign_up() {

        set_loading(true)

        const get_user_token = await api.post('sign_up', {
            username,
            full_name,
            password
        })

        await AsyncStorage.setItem('app_token', get_user_token.data.token)

        set_loading(false)

        sign_up(get_user_token.data.token)

    }

    function render_loading_gif() {
        if (loading) {
            return <Image source={loading_gif} style={{width: 35, height: 35}} />
        } else {
            return <Text style={styles.button_sign_up_text}>Sign Up</Text>
        }
    }

    function render_button_sign_up() {
        if (ready_to_sign_up) {
            return (
                <TouchableOpacity style={styles.button_sign_up} onPress={handle_sign_up} disabled={loading}>
                    {render_loading_gif()}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.button_sign_up_no} disabled={true}>
                    <Text style={styles.button_sign_up_text}>Sign Up</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text_instrution}>NAME AND PASSWORD</Text>
            <TextInput
                style={styles.text_input}
                placeholder="Full Name"
                placeholderTextColor="#808080"
                onChangeText={text => set_full_name(text)}
                value={full_name} />
            <TextInput
                style={styles.text_input}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#808080"
                onChangeText={text => set_password(text)}
                value={password} />
            {render_button_sign_up()}
        </View>
    )
}

export default Sign_up