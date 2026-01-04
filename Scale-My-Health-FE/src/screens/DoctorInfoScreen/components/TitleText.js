import { StyleSheet, Text } from 'react-native'
import React, { memo } from 'react'
import { FontFamily } from '../../../constants/Fonts'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'

const TitleText = ({
    children
}) => {
    return (
        <Text style={styles.TextStyle} numberOfLines={1}>{children}</Text>
    )
}

export default memo(TitleText)

const styles = StyleSheet.create({
    TextStyle: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(11.5),
        color: COLOR.BLACK,
        marginTop: ResponsiveSizeWp(3),
        marginBottom: ResponsiveSizeWp(2),
    },
})