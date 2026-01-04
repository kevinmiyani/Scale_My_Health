import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { COLOR, GRADIENTCOLOR } from '../../../constants/Colors';
import { FontFamily } from '../../../constants/Fonts';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

const DurationView = ({
    name,
    status = '',
}) => {

    const [time, setTime] = useState('00:00');
    const _timer = useRef();

    useEffect(() => {
        status == '' && getTimeDuration();
    }, [status])

    const getTimeDuration = useCallback(() => {
        clearInterval(_timer.current);
        const startTime = Date.now();
        _timer.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            setTime(timeString);
        }, 1000);
    }, [status])

    return (
        <View style={styles.Wrapper}>
            {
                status == '' &&
                <View style={styles.Container}>
                    <View style={styles.Icon} />
                    <Text style={styles.TimeText}>{time}</Text>
                </View>
            }
            <View style={styles.NameWrapper}>
                <BlurView
                    blurType="light"
                    blurAmount={22}
                >
                    <LinearGradient
                        colors={GRADIENTCOLOR.BLACK_50_TO_60}
                        style={styles.GradientStyle}
                        useAngle
                        angle={45}
                    >
                        <Text style={styles.NameText} numberOfLines={1}>{status == '' ? name : status}</Text>
                    </LinearGradient>
                </BlurView>
            </View>
        </View>
    )
}

export default memo(DurationView)

const styles = StyleSheet.create({
    Wrapper: {
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center',
    },
    Container: {
        backgroundColor: COLOR.BLACK,
        borderRadius: ResponsiveSizeWp(40),
        paddingHorizontal: ResponsiveSizeWp(10),
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(5),
        height: ResponsiveSizeWp(26),
        top: ResponsiveSizeWp(13),
        zIndex: 10,
    },
    Icon: {
        width: ResponsiveSizeWp(7),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(5),
        backgroundColor: 'red',
    },
    TimeText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        top: Platform.OS == 'android' && ResponsiveSizeWp(2),
    },
    NameWrapper: {
        overflow: 'hidden',
        width: '77.5%',
        borderRadius: ResponsiveSizeWp(60),
        height: ResponsiveSizeWp(50),
    },
    NameText: {
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
    }
})