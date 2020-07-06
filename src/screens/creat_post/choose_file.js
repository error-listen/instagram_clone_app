import React, { useState, useEffect, useRef } from 'react'

import { Text, View, Image, FlatList, TouchableOpacity, Dimensions, Button } from 'react-native'

import { Video } from 'expo-av'

import * as MediaLibrary from 'expo-media-library'

import styles from '../../styles/create_post/choose_file'

import play_image from '../../assets/images/play.png'

function Choose_file({ navigation }) {

    const [files, set_files] = useState([])
    const [files_render, set_files_render] = useState(4)
    const [file_render, set_file_render] = useState('waiting...')
    const [file_uri, set_file_uri] = useState('')
    const [file_type, set_file_type] = useState('')
    const [file_filename, set_file_filename] = useState('')
    const [file_type_render, set_file_type_render] = useState('')
    const [permission_status, set_permission_status] = useState(null)

    const win = Dimensions.get('window')

    const button_play = useRef(null)
    const video = useRef(null)

    async function load_images() {
        const asset = await MediaLibrary.getAssetsAsync({ first: files_render, mediaType: ['photo', 'video'], sortBy: 'creationTime' })
        set_files(asset.assets)
        set_files_render(files_render + 4)
    }

    async function load_first_file_render() {

        const value = await (await MediaLibrary.requestPermissionsAsync()).status

        if (value === 'granted') {
            set_permission_status(true)
        } else {
            set_permission_status(false)
        }

        const asset = await MediaLibrary.getAssetsAsync({ first: files_render })
        set_file_render(asset.assets[0].uri)
        set_file_uri(asset.assets[0].uri)
        set_file_filename(asset.assets[0].filename)

        let allowed_extensions_image = /(\.jpg|\.jpeg|\.png|\.gif)$/i
        let allowed_extensions_video = /(\.mp4)$/i
        let file_extension = asset.assets[0].filename.split('.').pop()

        if (allowed_extensions_image.exec(asset.assets[0].uri)) {
            set_file_type(`image/${file_extension}`)
            set_file_type_render('image')
        } else if (allowed_extensions_video.exec(uri)) {
            set_file_type(`video/${file_extension}`)
            set_file_type_render('video')
        }
    }

    useEffect(() => {

        load_first_file_render()
        load_images()

    }, [])

    useEffect(() => {
        if(permission_status){
            load_first_file_render()
            load_images()
        }
    }, [permission_status])

    async function allow_permission() {
        const value = await (await MediaLibrary.requestPermissionsAsync()).status

        if (value === 'granted') {
            load_first_file_render()
            load_images()
            set_permission_status(true)
        } else {
            set_permission_status(false)
        }

    }

    function advance() {

        navigation.navigate('Post', {
            uri: file_uri,
            type: file_type,
            filename: file_filename,
            type_file: file_type_render,
        })

    }

    function image_chosen(uri, filename) {

        let allowed_extensions_image = /(\.jpg|\.jpeg|\.png|\.gif)$/i
        let allowed_extensions_video = /(\.mp4)$/i
        let file_extension = filename.split('.').pop()

        if (allowed_extensions_image.exec(uri)) {
            set_file_type(`image/${file_extension}`)
            set_file_type_render('image')
        } else if (allowed_extensions_video.exec(uri)) {
            set_file_type(`video/${file_extension}`)
            set_file_type_render('video')
        }

        set_file_uri(uri)
        set_file_filename(filename)
        set_file_render(uri)
    }

    function play_video() {
        if (video.current !== undefined) {
            video.current.playAsync()
            button_play.current.setNativeProps({ display: 'none' })
        }
    }

    function pause_video() {
        if (video.current !== undefined) {
            video.current.pauseAsync()
            button_play.current.setNativeProps({ display: 'flex' })
        }
    }

    navigation.addListener('blur', () => {
        if (video.current !== undefined && video.current !== null) {
            video.current.pauseAsync()
            button_play.current.setNativeProps({ display: 'flex' })
        }
    })

    const render_image = ({ item }) => (
        <TouchableOpacity onPress={() => image_chosen(item.uri, item.filename)}>
            {item.mediaType === "photo" ? <Image source={{ uri: item.uri }} style={styles.images} /> :
                <Video usePoster={true}
                    source={{ uri: item.uri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    shouldPlay={false}
                    isLooping
                    style={{ width: 90, height: 90, margin: 1 }} />
            }
        </TouchableOpacity>
    )

    function render_button_permission() {
        if (!permission_status) {
            return <Button title="Give permission" onPress={allow_permission} />
        } else {
            return null
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.gallery_text}>Gallery</Text>
                <TouchableOpacity style={styles.button_advance} onPress={advance}>
                    <Text style={styles.button_advance_text}>Advance</Text>
                </TouchableOpacity>
            </View>
            {render_button_permission()}
            {file_type_render === "image" ?
                <Image source={{ uri: file_render }} style={{ width: win.width, height: 200, marginBottom: 1 }} resizeMode='center' />
                :
                <View style={styles.container_video}>
                    <TouchableOpacity onPress={pause_video}>
                        <Video ref={video}
                            source={{ uri: file_render }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            shouldPlay
                            isLooping
                            resizeMode="cover"
                            style={{ width: "100%", height: 200, marginBottom: 1 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button_play} onPress={play_video}>
                        <Image style={styles.button_play_image} source={play_image} ref={button_play} />
                    </TouchableOpacity>
                </View>
            }
            <FlatList
                data={files}
                numColumns={4}
                removeClippedSubviews={true}
                maxToRenderPerBatch={4}
                renderItem={render_image}
                keyExtractor={item => item.id}
                onEndReached={load_images}
                onEndReachedThreshold={0.1}
            />
        </View>
    )
}

export default Choose_file