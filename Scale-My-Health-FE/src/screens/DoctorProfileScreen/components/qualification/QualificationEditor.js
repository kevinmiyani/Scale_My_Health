import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { ResponsiveSizeWp } from '../../../../constants/Responsive';
import { COLOR } from '../../../../constants/Colors';
import { FontFamily } from '../../../../constants/Fonts';
import { ErrorToast } from '../../../../constants/ToastMessage';
import HeaderText from './HeaderText';

const QualificationEditor = ({
    defaultData,
    onCancelPress = () => { },
    onSavePress = () => { },
}) => {

    const [data, setData] = useState(defaultData ? defaultData : {
        type: '',
        details: '',
    })

    const handleChange = (key, value) => {
        setData(pre => ({ ...pre, [key]: value }))
    }

    return (
        <View style={styles.Container}>
            <HeaderText onCancelPress={onCancelPress}>
                {defaultData ? 'Edit Qualification' : 'Add Qualification'}
            </HeaderText>

            <TextInput
                value={data?.type}
                onChangeText={(text) => { handleChange('type', text) }}
                style={[styles.TextInput]}
                placeholder={'Qualification'}
                placeholderTextColor={COLOR.BLACK_40}
                numberOfLines={1}
                keyboardType='default'
            />

            <TextInput
                value={data?.details}
                onChangeText={(text) => { handleChange('details', text) }}
                style={[styles.TextInput, { paddingVertical: ResponsiveSizeWp(12), height: ResponsiveSizeWp(100), textAlignVertical: 'top' }]}
                placeholder={'Description'}
                placeholderTextColor={COLOR.BLACK_40}
                numberOfLines={1}
                keyboardType='default'
                multiline
                maxLength={200}
            />

            <TouchableOpacity
                style={styles.SaveButton}
                onPress={() => {
                    if (!data?.type?.trim()) {
                        ErrorToast('', 'Enter Qualification');
                        return;
                    }
                    onSavePress(data);
                }}
            >
                <Text style={styles.SaveText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(QualificationEditor)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        backgroundColor: COLOR.LIGHTGRAY,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(20),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        gap: ResponsiveSizeWp(10),
    },
    ContentContainer: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
        alignItems: 'center',
    },
    SaveButton: {
        height: ResponsiveSizeWp(40),
        width: '100%',
        backgroundColor: COLOR.PRIMARYCOLOR,
        borderRadius: ResponsiveSizeWp(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(2),
        borderColor: COLOR.WHITE,
    },
    SaveText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(12),
    },
    TitleText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(12),
        marginBottom: -ResponsiveSizeWp(5),
    },
    TextInput: {
        flex: 1,
        height: ResponsiveSizeWp(45),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(15),
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
})