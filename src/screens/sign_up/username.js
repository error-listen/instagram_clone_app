import React, { useState, useEffect } from 'react'

import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'

import api from '../../services/api'

import styles from '../../styles/sign_up/username'

function Username({ navigation }) {

    const [username, set_username] = useState('')
    const [advance, set_advance] = useState(false)
    const [error_message, set_error_message] = useState('')
    const [digit, set_digit] = useState(false)

    useEffect(() => {
        if (username.length >= 4) {
            set_advance(true)
        } else {
            set_advance(false)
        }
    })

    async function handle_username() {

        set_error_message('')

        const user = await api.post('verify/user', {
            username: username.toLowerCase()
        })

        if (user.data.message === 'User already exists') {
            set_error_message(user.data.message)
            return
        }

        navigation.navigate('Sign_up', {
            username: username.toLowerCase()
        })
    }

    function digiting(){
        set_digit(true)
    }

    function no_digiting(){
        set_digit(false)
    }

    function render_error_message() {
        if (error_message) {
            return (
                <Text style={styles.error_text}>{error_message}</Text>
            )
        }
    }

    function render_button_advance() {
        if (advance) {
            return (
                <TouchableOpacity style={styles.button_advance} onPress={handle_username}>
                    <Text style={styles.button_advance_text}>Advance</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.button_advance_no} disabled={true}>
                    <Text style={styles.button_advance_text}>Advance</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {digit ? null : <Image style={styles.icon_user} source={require("../../assets/images/user.png")} />}
                <TextInput style={styles.text_input}
                    placeholder="Username"
                    placeholderTextColor="#808080"
                    onFocus={digiting}
                    onBlur={no_digiting}
                    onChangeText={text => set_username(text)}
                    value={username} />
                {render_error_message()}
                {render_button_advance()}
            </View>
            <View style={styles.footer}>
                <Text>Do you have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign_in")}>
                    <Text style={styles.sign_in_text}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Username