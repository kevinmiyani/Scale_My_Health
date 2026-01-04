import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'

const SearchView = ({
    value,
    onChangeText = () => { },
}) => {

    const onClear = () => onChangeText('');
    const ref = useRef();

    useEffect(() => { ref?.current?.focus() }, [])

    return (
        <View style={styles.Container}>
            <TextInput
                ref={ref}
                style={styles.SearchInput}
                placeholder={'Find Doctors'}
                placeholderTextColor={COLOR.BLACK_50}
                numberOfLines={1}
                value={value}
                onChangeText={onChangeText}
                blurOnSubmit
                focusable
            />

            {
                value &&
                <TouchableOpacity
                    style={styles.ClearButton}
                    onPress={onClear}
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

export default memo(SearchView)

const styles = StyleSheet.create({
    Container: {
        borderRadius: ResponsiveSizeWp(50),
        height: ResponsiveSizeWp(45),
        flexDirection: 'row',
        backgroundColor: COLOR.WHITE,
        width: '100%',
        alignItems: 'center',
        marginTop: ResponsiveSizeWp(15),
        paddingHorizontal: ResponsiveSizeWp(10),
    },
    SearchInput: {
        flex: 1,
        paddingHorizontal: ResponsiveSizeWp(10),
        height: '100%',
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(14),
    },
    ClearButton: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})