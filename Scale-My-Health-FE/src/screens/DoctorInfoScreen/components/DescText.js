import { StyleSheet, Text } from 'react-native'
import React, { memo } from 'react'
import { FontFamily } from '../../../constants/Fonts'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'

const DescText = ({
    children
}) => {
    return (
        <Text style={styles.TextStyle}>{children}</Text>
    )
}

export default memo(DescText)

const styles = StyleSheet.create({
    TextStyle: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(11),
        color: COLOR.GRAY,
    },
})