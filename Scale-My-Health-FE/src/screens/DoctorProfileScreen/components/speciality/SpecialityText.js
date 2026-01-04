import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { FontFamily } from '../../../../constants/Fonts'
import { COLOR } from '../../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'

const SpecialityText = ({
    title,
    value,
}) => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.TitleText} numberOfLines={1}>{title}</Text>
            <Text style={styles.ValueText}>{value}</Text>
        </View>
    )
}

export default memo(SpecialityText)

const styles = StyleSheet.create({
    TitleText: {
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(12),
    },
    ValueText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(15),
        paddingRight: ResponsiveSizeWp(5),
    },
})