import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'

const Button = ({
    children,
    onPress = () => { },
    color,
}) => {
    return (
        <View style={styles.Container}>
            {
                !color &&
                <BlurView
                    style={styles.absolute}
                    blurType="dark"
                    blurAmount={10}
                    blurRadius={10}
                >
                    <LinearGradient
                        colors={['rgba(0, 93, 234, 0.1)', 'rgba(0, 93, 234, 0.1)']}
                        style={{ width: '100%', height: '100%' }}
                        useAngle
                        angle={45}
                    />
                </BlurView>
            }
            <TouchableOpacity
                style={[styles.Button, color && { backgroundColor: color, borderWidth: 0, }]}
                onPress={onPress}
                activeOpacity={1}
            >
                {children}
            </TouchableOpacity>
        </View>
    )
}

export default memo(Button)

const styles = StyleSheet.create({
    Container: {
        width: ResponsiveSizeWp(55),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(40),
        overflow: 'hidden',
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -10,
    },
    Button: {
        height: '100%',
        width: '100%',
        aspectRatio: 1 / 1,
        borderColor: 'rgba(0, 93, 234, 0.1)',
        borderWidth: ResponsiveSizeWp(1),
        borderRadius: ResponsiveSizeWp(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
})