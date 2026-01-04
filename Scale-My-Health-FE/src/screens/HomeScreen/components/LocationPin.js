import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'
import Octicons from 'react-native-vector-icons/Octicons';

const LocationPin = ({
    location,
}) => {
    return (
        <View style={styles.Container}>
            {
                location &&
                < Octicons
                    name={'location'}
                    size={ResponsiveSizeWp(20)}
                    color={COLOR.BLACK}
                />
            }
            <Text style={styles.TextStyle} numberOfLines={1}>{location}</Text>
        </View>
    )
}

export default memo(LocationPin)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: ResponsiveSizeWp(7),
    },
    TextStyle: {
        flex: 1,
        fontSize: ResponsiveSizeWp(20),
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        textDecorationLine: 'underline',
        top: Platform.OS == 'android' && ResponsiveSizeWp(1),
    },
})