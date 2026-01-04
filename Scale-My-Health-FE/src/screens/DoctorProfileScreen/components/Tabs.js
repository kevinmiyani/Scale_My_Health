import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR, GRADIENTCOLOR } from '../../../constants/Colors'
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

const Tabs = ({
    tabs = [],
    tabWidth,
    width,
    scrollX,
    onTabPress = () => { }
}) => {

    return (
        <View style={[styles.Container]}>
            <Animated.View style={[
                styles.ActiveSlider,
                tabWidth && { width: tabWidth },
                {
                    transform: [{
                        translateX: scrollX.interpolate({
                            inputRange: [0, width * tabs.length],
                            outputRange: [0, width],
                        })
                    }]
                }
            ]}>
                <View style={styles.Line} />
                <MaskedView
                    style={styles.MaskViewStyle}
                    maskElement={<View style={styles.Shape} />}
                >
                    <LinearGradient
                        colors={GRADIENTCOLOR.WHITE_100_TO_0}
                        style={styles.GradientStyle}
                    />
                </MaskedView>
            </Animated.View>
            {
                tabs.map((tab, i) =>
                    <TouchableOpacity
                        key={i}
                        style={[styles.Tab, tabWidth && { width: tabWidth }]}
                        onPress={() => { onTabPress(i) }}
                        activeOpacity={1}
                    >
                        {tab.icon}
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default memo(Tabs)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLOR.PRIMARYCOLOR,
        marginTop: -ResponsiveSizeWp(10),
        zIndex: 10,
    },
    ActiveSlider: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        zIndex: 11,
    },
    MaskViewStyle: {
        width: ResponsiveSizeWp(50),
        height: ResponsiveSizeWp(50),
    },
    Shape: {
        width: ResponsiveSizeWp(50),
        height: 0,
        borderBottomWidth: ResponsiveSizeWp(50),
        borderBottomColor: COLOR.WHITE,
        borderLeftWidth: ResponsiveSizeWp(12),
        borderLeftColor: 'transparent',
        borderRightWidth: ResponsiveSizeWp(12),
        borderRightColor: 'transparent',
        borderStyle: 'solid',
        opacity: 0.45,
    },
    GradientStyle: {
        width: '100%',
        height: '100%',
    },
    Line: {
        width: '50%',
        height: ResponsiveSizeWp(4),
        borderRadius: ResponsiveSizeWp(4),
        backgroundColor: COLOR.WHITE,
    },
    Tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ResponsiveSizeWp(15),
        paddingBottom: ResponsiveSizeWp(15),
        zIndex: 12,
    },
})