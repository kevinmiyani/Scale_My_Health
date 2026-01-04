import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HeaderText = ({
    children,
    onCancelPress,
}) => {
    return (
        <View style={styles.Container}>
            <Text style={styles.TextStyle} numberOfLines={1}>{children}</Text>
            {
                onCancelPress &&
                <TouchableOpacity
                    onPress={onCancelPress}
                >
                    <Ionicons
                        name='close'
                        size={ResponsiveSizeWp(24)}
                        color={COLOR.BLACK}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

export default memo(HeaderText)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    TextStyle: {
        flex: 1,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(15),
        fontFamily: FontFamily.SemiBold,
    },
})