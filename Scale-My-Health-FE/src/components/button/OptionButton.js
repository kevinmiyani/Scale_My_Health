import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'

const OptionButton = ({
    icon,
    title,
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={styles.IconStyle}
                resizeMode='contain'
            />
            <Text style={styles.Text} numberOfLines={1}>{title}</Text>
        </TouchableOpacity>
    )
}

export default memo(OptionButton)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ResponsiveSizeWp(5),
        gap: ResponsiveSizeWp(15),
        justifyContent: 'space-between',
    },
    Text: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(11.5),
        textAlign: 'right',
    },
    IconStyle: {
        tintColor: COLOR.BLACK,
        width: ResponsiveSizeWp(22),
        aspectRatio: 1 / 1,
    },
})