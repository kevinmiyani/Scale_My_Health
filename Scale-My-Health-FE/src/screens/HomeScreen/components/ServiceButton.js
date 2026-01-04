import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'
import { elevation_2 } from '../../../constants/styles'

const ServiceButton = ({
    icon,
    text,
    color,
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            style={[styles.Container, color && { backgroundColor: color }, elevation_2]}
            activeOpacity={1}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={styles.IconStyle}
                resizeMode='contain'
            />
            <Text style={styles.TextStyle} numberOfLines={2}>{text}</Text>
        </TouchableOpacity>
    )
}

export default memo(ServiceButton)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        padding: ResponsiveSizeWp(15),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR.PRIMARYCOLOR,
        borderRadius: ResponsiveSizeWp(12.5),
        gap: ResponsiveSizeWp(10),
    },
    IconStyle: {
        width: ResponsiveSizeWp(27),
        aspectRatio: 1 / 1,
        tintColor: COLOR.WHITE,
        resizeMode: 'contain',
    },
    TextStyle: {
        flex: 1,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(11),
        fontFamily: FontFamily.SemiBold,
        textAlign: 'right',
    },
})