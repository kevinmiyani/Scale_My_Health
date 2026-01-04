import { StyleSheet, Text, } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import { ResponsiveSizeWp } from '../../../constants/Responsive'

const HeaderText = ({
    children
}) => {
    return (
        <Text style={styles.TextStyle}>{children}</Text>
    )
}

export default memo(HeaderText)

const styles = StyleSheet.create({
    TextStyle: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
        marginBottom: ResponsiveSizeWp(20),
    }
})