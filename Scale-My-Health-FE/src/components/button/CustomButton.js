import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import LinearGradient from 'react-native-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CustomButton = ({
    onPress = () => { },
    text,
    disabled,
    style,
    fontStyle,
    loading,
}) => {

    const gradientAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loading && loading == true && startGradientAnimation();
    }, [gradientAnimation, loading]);

    const startGradientAnimation = () => {
        gradientAnimation.resetAnimation();
        Animated.loop(
            Animated.timing(gradientAnimation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    };

    const angle = gradientAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-90, 270],
    });

    return (
        <View style={[styles.Container, style && style]}>
            {
                loading == true &&
                <Animated.View style={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    position: 'absolute',
                    zIndex: -100,
                    borderRadius: ResponsiveSizeWp(60),
                }}>
                    <AnimatedLinearGradient
                        colors={['#F9B0FF', '#4CABEC', '#FF7A00',]}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: ResponsiveSizeWp(60),
                        }}
                        useAngle
                        angle={angle}
                    />
                </Animated.View>
            }
            <TouchableOpacity
                onPress={onPress}
                style={[styles.ButtonStyle,]}
                disabled={disabled}
                activeOpacity={1}
            >
                <Text style={[styles.ButtonText, Platform.OS == 'android' && { top: ResponsiveSizeWp(2.75) }, fontStyle && fontStyle]}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(CustomButton)


const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginTop: ResponsiveSizeWp(10),
        backgroundColor: COLOR.BLACK,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderRadius: ResponsiveSizeWp(50),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 2,
    },
    ButtonStyle: {
        width: '100%',
        backgroundColor: COLOR.BLACK,
        paddingVertical: ResponsiveSizeWp(13),
        paddingHorizontal: ResponsiveSizeWp(20),
        borderRadius: ResponsiveSizeWp(50),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ButtonText: {
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(17),
        fontFamily: FontFamily.SemiBold,
    },
})