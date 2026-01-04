import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import FastImage from 'react-native-fast-image'
import { elevation_2 } from '../constants/styles'
import { COLOR, GRADIENTCOLOR } from '../constants/Colors'
import { ResponsiveSizeWp } from '../constants/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { FontFamily } from '../constants/Fonts'

const ProfileImage = ({
    img,
    style,
    initial = '',
    initialSize = 25,
    initialColor = COLOR.WHITE,
    gradientColor = GRADIENTCOLOR.LIGHTBLUE2,
}) => {
    return (
        <View style={[styles.Container, elevation_2, style && style]}>
            {
                (img && img != '') ?
                    <FastImage
                        source={{ uri: img }}
                        style={styles.ProfileImage}
                        resizeMode='cover'
                    /> :
                    <View style={styles.InitialContainer}>
                        <LinearGradient
                            colors={gradientColor}
                            style={styles.GradientContainer}
                        >
                            <Text style={[styles.InitialText, {
                                fontSize: ResponsiveSizeWp(initialSize),
                                color: initialColor,
                                top: Platform.OS == 'android' && ResponsiveSizeWp(initialSize * 0.1)
                            }]}>
                                {initial}
                            </Text>
                        </LinearGradient>
                    </View>
            }
        </View>
    )
}

export default memo(ProfileImage)

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(100),
        height: ResponsiveSizeWp(65),
        aspectRatio: 1 / 1,
        padding: ResponsiveSizeWp(2),
    },
    ProfileImage: {
        width: '100%',
        height: '100%',
        borderRadius: ResponsiveSizeWp(100),
    },
    InitialContainer: {
        width: '100%',
        height: '100%',
        borderRadius: ResponsiveSizeWp(100),
        overflow: 'hidden',
    },
    GradientContainer: {
        width: '100%',
        height: '100%',
        borderRadius: ResponsiveSizeWp(100),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    InitialText: {
        fontFamily: FontFamily.SemiBold,
        textTransform: 'uppercase',
    },
})