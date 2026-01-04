import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import HeaderText from './HeaderText';
import { ResponsiveSizeWp } from '../../../../constants/Responsive';
import { COLOR } from '../../../../constants/Colors';
import { FontFamily } from '../../../../constants/Fonts';
import TimeSelectionButton from './TimeSelectionButton';
import { ErrorToast } from '../../../../constants/ToastMessage';

const TimeLineEditor = ({
    defaultData,
    onCancelPress = () => { },
    onSavePress = () => { },
}) => {

    const [data, setData] = useState({
        from: '',
        to: '',
    });

    useEffect(() => { defaultData?.from && defaultData?.to && setData(defaultData) }, [defaultData])

    const handleChange = (key, value) => {
        setData(pre => ({ ...pre, [key]: value }))
    }

    return (
        <View style={styles.Container}>
            <HeaderText onCancelPress={onCancelPress}>
                {(defaultData?.from && defaultData?.to) ? `${defaultData?.from} - ${defaultData?.to}` : 'Add New Time Line'}
            </HeaderText>

            <View style={styles.ContentContainer}>
                <TimeSelectionButton
                    placeholder={'From'}
                    value={data?.from}
                    onTimeSelect={(time) => { handleChange('from', time) }}
                />

                <Text style={styles.SeparetorText} numberOfLines={1}>-</Text>

                <TimeSelectionButton
                    placeholder={'To'}
                    value={data?.to}
                    onTimeSelect={(time) => { handleChange('to', time) }}
                />
            </View>

            <TouchableOpacity
                style={styles.SaveButton}
                onPress={() => {
                    if (data?.from == '' || data?.to == '') {
                        ErrorToast('', 'Select Time Line');
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

export default memo(TimeLineEditor)

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
    SeparetorText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(17),
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
})