import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR, GRADIENTCOLOR } from '../../../constants/Colors';
import { FontFamily } from '../../../constants/Fonts';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

const CaseSelectionButton = ({
    caseId,
    onPress = () => { },
}) => {
    return (
        <View style={styles.Container}>
            <BlurView
                blurType="light"
                blurAmount={22}
                style={styles.Absolute}
            >
                <LinearGradient
                    colors={GRADIENTCOLOR.BLACK_50_TO_60}
                    style={styles.GradientStyle}
                    useAngle
                    angle={45}
                >

                </LinearGradient>
            </BlurView>
            <TouchableOpacity
                style={styles.Button}
                onPress={onPress}
            >
                <Text style={styles.TextStyle} numberOfLines={1}>{caseId ?? 'Select Case'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(CaseSelectionButton)

const styles = StyleSheet.create({
    Container: {
        overflow: 'hidden',
        width: '77.5%',
        borderRadius: ResponsiveSizeWp(60),
        height: ResponsiveSizeWp(50),
        marginTop: ResponsiveSizeWp(15),
    },
    Absolute: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: 0,
    },
    TextStyle: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(16),
        top: Platform.OS == 'android' && ResponsiveSizeWp(2),
    },
    GradientStyle: {
        width: '100%',
        height: '100%',
        paddingHorizontal: ResponsiveSizeWp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR.WHITE_20,
        borderWidth: ResponsiveSizeWp(1),
        borderRadius: ResponsiveSizeWp(60),
    },
    Button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})