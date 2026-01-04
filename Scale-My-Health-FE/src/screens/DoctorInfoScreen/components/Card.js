import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, memo } from 'react'
import { FontFamily } from '../../../constants/Fonts'
import { COLOR } from '../../../constants/Colors'
import { elevation_2 } from '../../../constants/styles'
import { ResponsiveSizeWp } from '../../../constants/Responsive'

const Card = forwardRef(({ title, children }, ref) => {
    return (
        <View ref={ref} style={[styles.Container, elevation_2]}>
            <Text style={styles.TitleText}>{title}</Text>
            {children}
        </View>
    );
});

export default memo(Card);

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        padding: ResponsiveSizeWp(20),
        borderRadius: ResponsiveSizeWp(15),
        backgroundColor: COLOR.WHITE,
        marginTop: ResponsiveSizeWp(15),
    },
    TitleText: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.BLACK,
        marginBottom: ResponsiveSizeWp(5),
    }
})