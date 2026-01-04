import { Animated, Platform, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'

const ConnectionIndicatior = ({
    connected
}) => {

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animation.resetAnimation();
        if (connected != true) Animated.loop(Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        })).start();
    }, [connected])

    const opacity = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1],
    })

    return (
        <Animated.View style={[styles.ViewStyle, { opacity: opacity }, connected == true && { backgroundColor: 'rgba(0,255,0,1)' }]} />
    )
}

export default memo(ConnectionIndicatior)

const styles = StyleSheet.create({
    ViewStyle: {
        backgroundColor: 'rgba(255,0,0,1)',
        width: 6,
        height: 6,
        aspectRatio: 1 / 1,
        zIndex: 10000,
        position: 'absolute',
        top: Platform.OS == 'android' ? 10 : 30,
        right: 15,
        borderRadius: 5,
    },
})