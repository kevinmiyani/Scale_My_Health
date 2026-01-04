import { StyleSheet, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors'

const DarkView = () => {
    return (
        <View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 10,
                backgroundColor: COLOR.BLACK_10,
            }}
        />
    )
}

export default DarkView

const styles = StyleSheet.create({})