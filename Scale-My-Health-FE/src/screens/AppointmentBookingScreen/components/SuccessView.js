import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import FastImage from 'react-native-fast-image'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'
import { COLOR } from '../../../constants/Colors'

const SuccessView = () => {
    return (
        <View style={styles.Container}>
            <FastImage
                source={require('../../../assets/icons/success-icon.png')}
                style={styles.ImageContainer}
                resizeMode='contain'
            />
            <Text style={styles.TextStyle}>Booking Confirmed</Text>
        </View>
    )
}

export default memo(SuccessView)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: ResponsiveSizeWp(20),
        marginBottom: ResponsiveSizeWp(10),
    },
    ImageContainer: {
        height: ResponsiveSizeWp(70),
        aspectRatio: 1 / 1,
    },
    TextStyle: {
        fontSize: ResponsiveSizeWp(17),
        color: COLOR.BLACK,
        fontFamily: FontFamily.Bold,
        paddingHorizontal: ResponsiveSizeWp(15),
        marginTop: ResponsiveSizeWp(10),
    },
})