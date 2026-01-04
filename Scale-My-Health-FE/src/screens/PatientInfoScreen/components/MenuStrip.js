import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import { elevation_2 } from '../../../constants/styles'

const MenuStrip = ({
    tabs = [],
    onTabPress,
    selected,
}) => {
    return (
        <View style={[styles.Container, elevation_2]}>
            {
                tabs.map((tab, i) => {
                    return (
                        <TouchableOpacity
                            style={[styles.Button, tab == selected && { borderColor: COLOR.PRIMARYCOLOR, }]}
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
                                        color: COLOR.PRIMARYCOLOR,
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
        backgroundColor: COLOR.WHITE,
        paddingTop: ResponsiveSizeWp(2),
        zIndex: 10,
    },
    Button: {
        flex: 1,
        paddingVertical: ResponsiveSizeWp(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: ResponsiveSizeWp(2),
        borderColor: COLOR.TRANSPARANT,
    },
    ButtonText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Medium,
    },
})