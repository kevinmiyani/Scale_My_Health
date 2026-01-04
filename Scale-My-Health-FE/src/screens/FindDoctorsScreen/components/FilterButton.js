import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import FastImage from 'react-native-fast-image'
import { FontFamily } from '../../../constants/Fonts'

const FilterButton = ({
    children,
    icon,
    onPres = () => { },
    color,
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={() => { onPres(children) }}
        >
            <View style={[styles.IconContainer, color && { backgroundColor: color }]}>
                <FastImage
                    style={styles.Icon}
                    source={icon}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.TextStyle} numberOfLines={1}>{children}</Text>
        </TouchableOpacity>
    )
}

export default memo(FilterButton)

const styles = StyleSheet.create({
    Container: {
        width: '25%',
        gap: ResponsiveSizeWp(5),
        alignItems: 'center',
        marginBottom: ResponsiveSizeWp(15),
    },
    IconContainer: {
        backgroundColor: COLOR.BLACK,
        borderRadius: ResponsiveSizeWp(100),
        justifyContent: 'center',
        alignItems: 'center',
        width: ResponsiveSizeWp(50),
        padding: ResponsiveSizeWp(10),
        aspectRatio: 1 / 1,
    },
    Icon: {
        width: '100%',
        height: '100%',
    },
    TextStyle: {
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(11),
        fontFamily: FontFamily.SemiBold,
    },
})