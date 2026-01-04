import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { elevation_5 } from '../../constants/styles'

const RadioButton = ({
    data,
    isSelected,
    onPress = () => { },
    fontStyle,
    buttonStyle,
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={() => { onPress(data) }}
            activeOpacity={1}
        >
            <View style={[styles.ButtonCircle, elevation_5, buttonStyle && buttonStyle,]}>
                {isSelected && <View style={[styles.ActiveCircle, elevation_5]} />}
            </View>
            <Text style={[styles.ButtonText, isSelected && styles.ActiveText, fontStyle && fontStyle]}>{data?.title}</Text>
        </TouchableOpacity>
    )
}

export default memo(RadioButton)

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: ResponsiveSizeWp(6),
    },
    ButtonCircle: {
        width: ResponsiveSizeWp(25),
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(5),
    },
    ActiveCircle: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.STEELBLUE,
        borderRadius: ResponsiveSizeWp(20),
    },
    ButtonText: {
        color: COLOR.WHITE_80,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(17),
    },
    ActiveText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
    },
})