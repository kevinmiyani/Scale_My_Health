import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { elevation_2 } from '../../../constants/styles'

const QuickStartButton = ({
    text,
    icon,
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            style={[styles.Container, elevation_2]}
            onPress={onPress}
            activeOpacity={1}
        >
            <Image
                source={icon}
                style={styles.Icon}
            />
            <Text style={styles.ButtonText} numberOfLines={2}>{text}</Text>
        </TouchableOpacity>
    )
}

export default memo(QuickStartButton)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        aspectRatio: 1.1 / 1,
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(12.5),
        padding: ResponsiveSizeWp(10),
        justifyContent: 'space-between',
    },
    Icon: {
        height: ResponsiveSizeWp(30),
        aspectRatio: 1 / 1,
        tintColor: COLOR.ORANGE,
        resizeMode: 'contain',
    },
    ButtonText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(11),
        textAlign: 'right',
    },
})