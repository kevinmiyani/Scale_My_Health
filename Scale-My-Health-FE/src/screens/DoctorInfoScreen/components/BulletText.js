import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { FontFamily } from '../../../constants/Fonts'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'

const BulletText = ({
    children
}) => {
    return (
        <View style={styles.Container}>
            <View style={styles.Bullet} />
            <Text style={styles.TextStyle} numberOfLines={1}>{children}</Text>
        </View>
    )
}

export default memo(BulletText)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(10),
        marginVertical: ResponsiveSizeWp(7),
    },
    Bullet: {
        width: ResponsiveSizeWp(9),
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.BLUE,
        borderRadius: ResponsiveSizeWp(12),
    },
    TextStyle: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(11.5),
        color: COLOR.BLACK,
    },
})