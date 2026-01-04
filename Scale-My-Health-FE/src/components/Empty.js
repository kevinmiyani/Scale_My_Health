import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../constants/Colors'
import { ResponsiveSizeWp } from '../constants/Responsive'
import { FontFamily } from '../constants/Fonts'

const Empty = ({
    title,
    isLoading,
}) => {
    return (
        <View style={styles.Empty}>
            {
                isLoading ?
                    <ActivityIndicator color={COLOR.PRIMARYCOLOR} />
                    :
                    <Text style={styles.EmptyText}>{title}</Text>
            }
        </View>
    )
}

export default memo(Empty)

const styles = StyleSheet.create({
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: ResponsiveSizeWp(70),
    },
    EmptyText: {
        textAlign: 'center',
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(13),
    },
})