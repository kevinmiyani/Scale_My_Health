import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'

const CaseText = ({
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

export default memo(CaseText)

const styles = StyleSheet.create({
    TitleText: {
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(13),
    },
    ValueText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(20),
    },
})