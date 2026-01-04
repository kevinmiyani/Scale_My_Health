import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../constants/Colors'
import LinearGradient from 'react-native-linear-gradient'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import FastImage from 'react-native-fast-image'
import { FontFamily } from '../../constants/Fonts'
import { RightArrowInSquare } from '../../constants/Assets'

const BannerButton = ({
    doctorImg,
    title,
    buttonText,
    gradient = [COLOR.WHITE],
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            activeOpacity={1}
            onPress={onPress}
        >
            <LinearGradient
                colors={gradient}
                style={styles.GradientContainer}
            >
                <View style={styles.RightContainer}>
                    <Text style={styles.TitleText} numberOfLines={2}>{title}</Text>
                    <View style={styles.Button}>
                        <FastImage
                            source={RightArrowInSquare}
                            style={styles.ArrowIcon}
                            resizeMode='contain'
                        />
                        <Text style={styles.ButtonText} numberOfLines={1}>
                            {buttonText}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.LeftContainer}>
                <FastImage
                    source={doctorImg}
                    style={styles.ImageStyle}
                    resizeMode='contain'
                />
            </View>
        </TouchableOpacity>
    )
}

export default memo(BannerButton)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: ResponsiveSizeWp(120),
        justifyContent: 'flex-end',
        marginTop: ResponsiveSizeWp(12),
    },
    GradientContainer: {
        height: '100%',
        width: '100%',
        borderRadius: ResponsiveSizeWp(20),
    },
    LeftContainer: {
        marginLeft: ResponsiveSizeWp(15),
        justifyContent: 'flex-end',
        position: 'absolute',
        height: '100%',
        zIndex: 1,
    },
    ImageStyle: {
        height: '110%',
        aspectRatio: 1 / 1,
        right: '7.5%',
    },
    RightContainer: {
        alignItems: 'flex-end',
        padding: ResponsiveSizeWp(15),
        width: '65%',
        height: '100%',
        alignSelf: 'flex-end',
        gap: ResponsiveSizeWp(5),
        justifyContent: 'center',
    },
    TitleText: {
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(20),
        fontFamily: FontFamily.SemiBold,
        textAlign: 'right',
    },
    Button: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(5),
        alignItems: 'center',
    },
    ArrowIcon: {
        height: ResponsiveSizeWp(21),
        aspectRatio: 1 / 1,
    },
    ButtonText: {
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(11),
        fontFamily: FontFamily.SemiBold,
        textAlign: 'right',
    },
})