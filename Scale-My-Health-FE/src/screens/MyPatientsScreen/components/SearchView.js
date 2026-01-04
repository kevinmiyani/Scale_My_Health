import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler';
import { FontFamily } from '../../../constants/Fonts';

const SearchView = ({
    value,
    onChangeText = () => { },
    onDismiss = () => { },
}) => {

    const [width, setWidth] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => { startAnimation(1) }, [])

    const startAnimation = (toValue, action = () => { }) => {
        Animated.timing(animation, {
            toValue: toValue,
            duration: 500,
            useNativeDriver: false,
        }).start(action);
    }

    const animatedWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [ResponsiveSizeWp(42), width],
    })

    const animatedPadding = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [ResponsiveSizeWp(8.5), ResponsiveSizeWp(12)],
    })

    return (
        <View
            style={styles.Wrapper}
            onLayout={(layout) => { width == 0 && setWidth(layout.nativeEvent.layout.width) }}
        >
            <Animated.View style={[styles.Container, { width: animatedWidth, paddingHorizontal: animatedPadding, }]}>

                <MaterialCommunityIcons
                    name='account-search-outline'
                    color={COLOR.BLACK}
                    size={ResponsiveSizeWp(25)}
                />

                <TextInput
                    style={styles.SearchInput}
                    placeholder={'Search For Patient'}
                    placeholderTextColor={COLOR.BLACK_50}
                    numberOfLines={1}
                    value={value}
                    onChangeText={onChangeText}
                    blurOnSubmit
                />

                <TouchableOpacity
                    style={styles.CloseButton}
                    onPress={() => { value ? onChangeText('') : startAnimation(0, onDismiss); }}
                >
                    <Ionicons
                        name='close'
                        size={ResponsiveSizeWp(22)}
                        color={COLOR.BLACK}
                    />
                </TouchableOpacity>

            </Animated.View>
        </View>
    )
}

export default memo(SearchView)

const styles = StyleSheet.create({
    Wrapper: {
        height: ResponsiveSizeWp(42),
        flex: 1,
        alignItems: 'flex-end',
    },
    Container: {
        height: ResponsiveSizeWp(42),
        width: ResponsiveSizeWp(42),
        borderRadius: ResponsiveSizeWp(40),
        backgroundColor: COLOR.LIGHTGRAY,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: ResponsiveSizeWp(8.5),
        overflow: 'hidden',
        gap: ResponsiveSizeWp(10),
        justifyContent: 'space-between',
    },
    SearchInput: {
        flex: 1,
        height: '100%',
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(13),
    },
    CloseButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})