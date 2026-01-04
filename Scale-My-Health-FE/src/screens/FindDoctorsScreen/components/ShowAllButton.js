import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import FastImage from 'react-native-fast-image'
import { RightArrowInSquare } from '../../../constants/Assets'

const ShowAllButton = ({
    children,
    style,
    onPress = () => { }
}) => {
    return (
        <TouchableOpacity
            style={[styles.Container, style && style]}
            onPress={onPress}
            activeOpacity={1}
        >
            <FastImage
                source={RightArrowInSquare}
                style={styles.ArrowIcon}
                resizeMode='contain'
            />
            <Text style={styles.TextStyle}>Show All {children}</Text>
        </TouchableOpacity>
    )
}

export default memo(ShowAllButton)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(30),
        paddingVertical: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(12),
        backgroundColor: COLOR.BLACK_10,
        marginBottom: ResponsiveSizeWp(20),
    },
    TextStyle: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(12),
    },
    ArrowIcon: {
        height: ResponsiveSizeWp(22),
        aspectRatio: 1 / 1,
    },
})