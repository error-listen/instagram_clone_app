import React, { useContext, useState, Fragment, useEffect } from 'react'

import { View, Text, Image, AsyncStorage } from 'react-native'

import { BoxShadow } from 'react-native-shadow'

import HEADER_CONTEXT from '../contexts/header_context'

import styles from '../styles/header'

import api from '../services/api'

function Header() {

    const header = useContext(HEADER_CONTEXT)

    const [header_render] = useState(header)
    const [user_logged, set_user_logged] = useState([])

    const shadowOpt = {
        width: 400,
        height: 42,
        color: '#000',
        border: 2,
        radius: 3,
        opacity: 0.1,
        x: 0,
        y: 3,
        style: {
            marginVertical: 5,
            marginTop: 25,
        }
    }

    useEffect(() => {

        async function load_user() {
            const app_token = await AsyncStorage.getItem('app_token')

            const get_user_loged = await api.get('user', {
                headers: {
                    authorization: `Bearer ${app_token}`
                }
            })
            set_user_logged(get_user_loged.data.user)

        }

        load_user()

    }, [])

    return (
        <Fragment>
            {header_render === "feed" ?
                <BoxShadow setting={shadowOpt}>
                    <View style={styles.header_feed}>
                        <Image
                            style={{ width: 110, height: 40 }}
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png' }}
                        />
                    </View>
                </BoxShadow> : <View style={styles.header_profile}><Text style={styles.username}>{header_render.username === "" ? user_logged.username : header_render.username}</Text></View>}
        </Fragment>
    )
}

export default Header