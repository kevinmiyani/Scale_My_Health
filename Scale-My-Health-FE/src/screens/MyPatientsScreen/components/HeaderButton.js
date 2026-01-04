import { StyleSheet, TouchableOpacity, } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors'

const HeaderButton = ({
    children,
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

export default memo(HeaderButton)

const styles = StyleSheet.create({
    Container: {
        width: ResponsiveSizeWp(42),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(40),
        backgroundColor: COLOR.LIGHTGRAY,
        justifyContent: 'center',
        alignItems: 'center',
    },
})