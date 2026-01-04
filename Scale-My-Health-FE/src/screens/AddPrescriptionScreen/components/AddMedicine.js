import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import HeaderText from './HeaderText'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import { ErrorToast } from '../../../constants/ToastMessage'
import { SelectList } from 'react-native-dropdown-select-list';
import { addMedicineList } from '../../../utils/helper'

const AddMedicine = ({
    onCancelPress = () => { },
    onAddPress = () => { },
}) => {

    const [data, setData] = useState({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        time: ''
    });

    const handleChange = (key, value) => {
        setData(pre => ({ ...pre, [key]: value }))
    }

    return (
        <View style={styles.Container}>
            <HeaderText onCancelPress={onCancelPress}>
                Add Medicine
            </HeaderText>

            <TextInput
                value={data.name}
                onChangeText={(text) => { handleChange('name', text) }}
                style={[styles.TextInput, { marginTop: ResponsiveSizeWp(10) }]}
                placeholder={'Medicine Name'}
                placeholderTextColor={COLOR.BLACK_40}
                numberOfLines={1}
                keyboardType='default'
                onBlur={() => { Keyboard.dismiss() }}
            />

            <SelectList
                data={addMedicineList.frequencyList}
                defaultOption={{ key: data.frequency, value: data.frequency, }}
                setSelected={(val) => { handleChange('frequency', val) }}
                search={false}
                placeholder={'Select frequency'}
                dropdownStyles={styles.dropdownStyles}
                boxStyles={[styles.boxStyles]}
                dropdownTextStyles={styles.dropdownTextStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                inputStyles={[styles.inputStyles, {
                    color: data?.frequency != '' ? COLOR.BLACK : COLOR.BLACK_40,
                }]}
            />

            <SelectList
                data={addMedicineList.durationList}
                defaultOption={{ key: data.duration, value: data.duration, }}
                setSelected={(val) => { handleChange('duration', val) }}
                search={false}
                placeholder={'Select duration'}
                dropdownStyles={styles.dropdownStyles}
                boxStyles={[styles.boxStyles]}
                dropdownTextStyles={styles.dropdownTextStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                inputStyles={[styles.inputStyles, {
                    color: data?.duration != '' ? COLOR.BLACK : COLOR.BLACK_40,
                }]}
            />

            <SelectList
                data={addMedicineList.timeList}
                defaultOption={{ key: data.time, value: data.time, }}
                setSelected={(val) => { handleChange('time', val) }}
                search={false}
                placeholder={'Select time'}
                dropdownStyles={styles.dropdownStyles}
                boxStyles={[styles.boxStyles]}
                dropdownTextStyles={styles.dropdownTextStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                inputStyles={[styles.inputStyles, {
                    color: data?.time != '' ? COLOR.BLACK : COLOR.BLACK_40,
                }]}
            />

            <TouchableOpacity
                style={styles.AddButton}
                onPress={() => {
                    if (!data?.name) {
                        ErrorToast('', 'Enter Medicine Name');
                        return;
                    }
                    onAddPress(data);
                    setData({
                        name: '',
                        frequency: '',
                        duration: '',
                        time: ''
                    });
                }}
            >
                <Text style={styles.AddText}>Add Medicine</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(AddMedicine)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginTop: ResponsiveSizeWp(20),
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
    AddButton: {
        height: ResponsiveSizeWp(45),
        width: '100%',
        backgroundColor: COLOR.PRIMARYCOLOR,
        borderRadius: ResponsiveSizeWp(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(2),
        borderColor: COLOR.WHITE,
        marginTop: ResponsiveSizeWp(10),
    },
    AddText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(12),
    },
    boxStyles: {
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
    dropdownStyles: {
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        backgroundColor: COLOR.WHITE,
    },
    dropdownTextStyles: {
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
    dropdownItemStyles: {
        marginHorizontal: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(5),
    },
    inputStyles: {
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
})