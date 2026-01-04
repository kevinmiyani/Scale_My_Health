import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { FontFamily } from '../../../constants/Fonts'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors'

const SaveButton = ({
    loading,
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.Container}
            disabled={loading}
        >
            {
                loading ?
                    <ActivityIndicator color={COLOR.WHITE} size={'small'} />
                    :
                    <Text style={styles.Text}>Save</Text>
            }
        </TouchableOpacity>
    )
}

export default memo(SaveButton)

const styles = StyleSheet.create({
    Container: {
        width: ResponsiveSizeWp(50),
        alignItems: 'center',
    },
    Text: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(15),
        color: COLOR.WHITE,
    },
})