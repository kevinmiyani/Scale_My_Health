import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import Button from './Button'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { COLOR } from '../../../constants/Colors';
import { FontFamily } from '../../../constants/Fonts';

const width = Dimensions.get('window').width;

const AudioDevices = {
    SPEAKER: {
        icon: 'volume-high',
        title: 'Speaker',
    },
    WIRED_HEADSET: {
        icon: 'headset',
        title: 'Wired Headset',
    },
    BLUETOOTH: {
        icon: 'bluetooth',
        title: 'Bluetooth',
    }
}

const AudioDeviceButton = ({
    audioOutput,
    availableDevices,
    switchAudioOutput = () => { }
}) => {

    const animation = useRef(new Animated.Value(0)).current;

    const [viewHeight, setViewHeight] = useState(0);
    const [viewVisible, setViewVisible] = useState(false);

    const startAnimation = (toValue) => {
        if (toValue == 1) setViewVisible(true);
        Animated.timing(animation, {
            toValue: toValue,
            useNativeDriver: true,
            duration: 200,
        }).start(() => { if (toValue == 0) setViewVisible(false); })
    }

    useEffect(() => { startAnimation(0); }, [audioOutput])

    return (
        <View style={{ zIndex: 1000, }}>
            {
                viewVisible &&
                <Animated.View
                    style={[styles.DeviceListContainer, viewHeight != 0 && {
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [viewHeight / 2, 0],
                                })
                            },
                            {
                                scale: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                })
                            }
                        ]
                    }]}
                    onLayout={(layout) => { setViewHeight(layout.nativeEvent.layout.height) }}
                >
                    {
                        availableDevices?.map((device, index) =>
                            <TouchableOpacity
                                key={index}
                                style={styles.DeviceButton}
                                onPress={() => { switchAudioOutput(device); }}
                                activeOpacity={1}
                            >
                                <Ionicons name={AudioDevices[device]?.icon} size={ResponsiveSizeWp(24)} color={COLOR.WHITE} />
                                <Text style={styles.DeviceTitle} numberOfLines={1}>{AudioDevices[device]?.title}</Text>
                                {device === audioOutput && <Feather name={'check'} size={ResponsiveSizeWp(24)} color={COLOR.WHITE} />}
                            </TouchableOpacity>
                        )
                    }
                </Animated.View>
            }
            <Button onPress={() => { if (Platform.OS == 'android') { animation.__getValue() == 0 ? startAnimation(1) : startAnimation(0); } }}>
                <Ionicons name={AudioDevices[audioOutput]?.icon} size={ResponsiveSizeWp(27.5)} color={COLOR.WHITE} />
            </Button>
        </View>
    )
}

export default memo(AudioDeviceButton)

const styles = StyleSheet.create({
    DeviceListContainer: {
        width: width * 0.8,
        position: 'absolute',
        backgroundColor: 'rgba(0, 20, 50, 1)',
        padding: ResponsiveSizeWp(10),
        alignSelf: 'center',
        borderRadius: ResponsiveSizeWp(15),
        zIndex: 100,
        gap: ResponsiveSizeWp(5),
        bottom: ResponsiveSizeWp(65),
    },
    DeviceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(13),
        padding: ResponsiveSizeWp(10),
    },
    DeviceTitle: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(14),
        color: COLOR.WHITE,
        flex: 1,
    },
})