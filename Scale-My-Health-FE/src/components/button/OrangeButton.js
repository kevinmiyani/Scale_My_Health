import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
import { elevation_5 } from '../../constants/styles'

const OrangeButton = ({
    text,
    icon,
    disabled,
    onPress = () => { },
}) => {
    return (
        <View style={styles.Container}>
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={22}
                reducedTransparencyFallbackColor="white"
            >
                <LinearGradient
                    colors={GRADIENTCOLOR.WHITE_30_TO_40}
                    style={{ width: '100%', height: '100%' }}
                    useAngle
                    angle={45}
                />
            </BlurView>
            <View style={[{
                width: '100%',
                padding: ResponsiveSizeWp(20),
            }]}>
                <TouchableOpacity
                    style={[styles.ButtonStyle, elevation_5, { shadowColor: COLOR.ORANGE }]}
                    onPress={onPress}
                    activeOpacity={1}
                    disabled={disabled}
                >
                    {icon}
                    <Text style={[styles.ButtonText, Platform.OS == 'android' && { top: ResponsiveSizeWp(2) }]}>{text}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(OrangeButton)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    ButtonStyle: {
        width: '100%',
        backgroundColor: COLOR.ORANGE,
        paddingVertical: ResponsiveSizeWp(15),
        paddingHorizontal: ResponsiveSizeWp(25),
        borderRadius: ResponsiveSizeWp(50),
        flexDirection: 'row',
        alignItems: 'center',
    },
    ButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(18),
        flex: 1,
        textAlign: 'right',
    },
})