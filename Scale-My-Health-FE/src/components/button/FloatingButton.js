import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR } from '../../constants/Colors'
import { elevation_2, elevation_5 } from '../../constants/styles'
import { useIsFocused } from '@react-navigation/native'

const width = Dimensions.get('window').width;

const FloatingButton = ({
    left,
    right,
    animated,
    icon,
    children,
    onPress = () => { },
}) => {

    const _animation = useRef(new Animated.Value(0)).current;
    const focused = useIsFocused();

    const [layout, setLayout] = useState({});

    const onButtonPress = () => {
        Animated.timing(_animation, {
            toValue: _animation.__getValue() == 1 ? 0 : 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }

    const translateXOutput = right ? [layout?.width / 3, 0] : left ? [-layout?.width / 3, 0] : [0, 0];

    useEffect(() => {
        animated && !focused && _animation.__getValue() == 1 &&
            Animated.timing(_animation, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
    }, [focused])

    return (
        <View style={[
            styles.ViewWraper,
            left && { left: ResponsiveSizeWp(25), alignItems: 'flex-start' },
            right && { right: ResponsiveSizeWp(25), alignItems: 'flex-end' },
        ]}>
            {
                animated &&
                <Animated.View
                    style={[
                        styles.OptionContainer,
                        elevation_2,
                        layout?.height > 0 && {
                            transform: [
                                {
                                    translateY: _animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layout?.height / 2, 0],
                                    })
                                },
                                {
                                    translateX: _animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: translateXOutput,
                                    })
                                },
                                {
                                    scale: _animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    })
                                }
                            ]
                        }
                    ]}
                    onLayout={(layout) => { setLayout(layout.nativeEvent.layout) }}
                >
                    {children}
                </Animated.View>
            }
            <TouchableOpacity
                style={[
                    styles.Container,
                    elevation_5,
                    { shadowColor: COLOR.ORANGE },
                    {
                        transform: [{
                            rotate: _animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '-45deg']
                            })
                        }]
                    }
                ]}
                activeOpacity={1}
                onPress={() => { animated ? onButtonPress() : onPress() }}
            >
                {icon}
            </TouchableOpacity>
        </View>
    )
}

export default memo(FloatingButton)

const styles = StyleSheet.create({
    ViewWraper: {
        position: 'absolute',
        bottom: ResponsiveSizeWp(25),
        alignSelf: 'center',
        gap: ResponsiveSizeWp(10),
        zIndex: 10,
        alignItems: 'center',
    },
    Container: {
        width: ResponsiveSizeWp(65),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(65),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.ORANGE,
        zIndex: 100,
    },
    OptionContainer: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(12),
        paddingVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(15),
        gap: ResponsiveSizeWp(5),
        minWidth: width / 2,
        maxWidth: width / 1.5,
        position: 'absolute',
        bottom: ResponsiveSizeWp(75),
    },
})