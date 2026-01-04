import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'
import { COLOR } from '../../../constants/Colors'

const OptionMenuButton = ({
    icon,
    text,
    children,
    onPress,
    disabled,
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            disabled={disabled}
            onPress={onPress}
        >
            {icon && icon}
            <Text style={styles.TextStyle}>{text}</Text>
            {children && children}
        </TouchableOpacity>
    )
}

export default OptionMenuButton

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: ResponsiveSizeWp(10),
        gap: ResponsiveSizeWp(10),
    },
    TextStyle: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
        flex: 1,
        color: COLOR.BLACK,
        top: Platform.OS == 'android' && ResponsiveSizeWp(2),
    },
})