import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { COLOR } from '../../../constants/Colors';
import { FontFamily } from '../../../constants/Fonts';

const MenuStrip = ({
    tabs = [],
    onTabPress,
    selected,
}) => {
    return (
        <View style={styles.Container}>
            {
                tabs.map((tab, i) => {
                    return (
                        <TouchableOpacity
                            style={[styles.Button, tab == selected && { borderBottomWidth: ResponsiveSizeWp(2), borderColor: COLOR.PRIMARYCOLOR, }]}
                            onPress={() => {
                                onTabPress(tab);
                            }}
                            key={i}
                            activeOpacity={1}
                        >
                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.ButtonText,
                                    tab == selected && {
                                        color: COLOR.BLACK,
                                        fontFamily: FontFamily.SemiBold,
                                    }]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default memo(MenuStrip)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: ResponsiveSizeWp(5),
        paddingVertical: ResponsiveSizeWp(10),
        backgroundColor: COLOR.WHITE,
    },
    Button: {
        flex: 1,
        paddingVertical: ResponsiveSizeWp(8),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: COLOR.GRAY,
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
    },
})