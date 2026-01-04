import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { FontFamily } from '../../../../constants/Fonts'
import { COLOR } from '../../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'

const HolidayText = ({
    title,
    value,
}) => {
    return (
        <View>
            <Text style={styles.TitleText} numberOfLines={1}>{title}</Text>
            <Text style={styles.ValueText} numberOfLines={1}>{value}</Text>
        </View>
    )
}

export default memo(HolidayText)

const styles = StyleSheet.create({
    TitleText: {
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(12),
    },
    ValueText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(18),
        paddingRight: ResponsiveSizeWp(5),
    },
})