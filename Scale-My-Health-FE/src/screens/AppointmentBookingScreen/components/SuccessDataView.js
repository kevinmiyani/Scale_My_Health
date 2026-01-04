import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'

const SuccessDataView = ({
    title,
    value,
    icon,
    rightButtonText,
    onRightButtonPress = () => { },
}) => {
    return (
        <View style={styles.Container}>
            <View style={styles.TitleContainer}>
                <Text style={styles.TitleText} numberOfLines={1}>{title}</Text>

                {
                    rightButtonText &&
                    <TouchableOpacity onPress={onRightButtonPress}>
                        <Text style={[styles.TitleText, { color: COLOR.BLUE }]} numberOfLines={1}>{rightButtonText}</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.ContentContainer}>
                {
                    icon &&
                    <Image
                        style={styles.ModeIcon}
                        source={icon}
                    />
                }
                <Text style={styles.ValueText} numberOfLines={1}>{value}</Text>
            </View>
        </View>
    )
}

export default memo(SuccessDataView)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginBottom: ResponsiveSizeWp(20),
        paddingHorizontal: ResponsiveSizeWp(20),
    },
    TitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    TitleText: {
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(14),
    },
    ContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: ResponsiveSizeWp(7),
        gap: ResponsiveSizeWp(10),
    },
    ValueText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(17),
    },
    ModeIcon: {
        tintColor: COLOR.BLACK,
        width: ResponsiveSizeWp(30),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
    },
})