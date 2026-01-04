import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'

const PrescribeText = ({
    prescribedFor,
    prescribedOn,
}) => {
    return (
        <View style={styles.Container}>
            <View style={styles.RowContainer}>
                <Text style={styles.TitleText} numberOfLines={1}>Prescribed For</Text>
                {prescribedOn && <Text style={styles.TitleText} numberOfLines={1}>Prescribed On</Text>}
            </View>

            <View style={styles.RowContainer}>
                <Text style={styles.ValueText} numberOfLines={1}>{prescribedFor}</Text>
                {prescribedOn && <Text style={styles.ValueText} numberOfLines={1}>{prescribedOn}</Text>}
            </View>
        </View>
    )
}

export default memo(PrescribeText)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginTop: ResponsiveSizeWp(15),
        gap: ResponsiveSizeWp(5),
    },
    RowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: ResponsiveSizeWp(5),
    },
    TitleText: {
        backgroundColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(12),
        paddingVertical: ResponsiveSizeWp(4),
        borderRadius: ResponsiveSizeWp(6),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK_80,
        fontSize: ResponsiveSizeWp(12),
        overflow: 'hidden',
    },
    ValueText: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(17),
    },
})