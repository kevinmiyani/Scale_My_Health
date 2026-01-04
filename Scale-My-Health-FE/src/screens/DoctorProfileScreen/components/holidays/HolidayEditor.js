import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import HeaderText from './HeaderText';
import { ResponsiveSizeWp } from '../../../../constants/Responsive';
import { COLOR } from '../../../../constants/Colors';
import { FontFamily } from '../../../../constants/Fonts';
import { ErrorToast } from '../../../../constants/ToastMessage';
import { addDays, format } from 'date-fns';
import TimeSelectionButton from '../timelines/TimeSelectionButton';
import Radiogroup from '../../../../components/radiobutton/Radiogroup';
import { HolidayData } from '../../../../constants/helper';
import DatePicker from '../../../../components/modal/DatePicker';

const HolidayEditor = ({
    defaultData,
    onCancelPress = () => { },
    onSavePress = () => { },
}) => {

    const [date, setDate] = useState(defaultData?.date ?? format(new Date(), 'yyyy-MM-dd').toString());
    const [time, setTime] = useState(defaultData?.time ?? {});

    const formattedDate = (date) => { return date ? format(new Date(date), 'dd MMMM, yyyy').toString() : '' };
    const [selectedType, setSelectedType] = useState(defaultData?.time ? HolidayData[1].key : HolidayData[0].key);

    const handleChange = (key, value) => {
        setTime(pre => ({ ...pre, [key]: value }))
    }

    return (
        <View style={styles.Container}>
            <HeaderText onCancelPress={onCancelPress}>
                {defaultData?.date ? formattedDate(defaultData?.date) : 'Add Holiday'}
            </HeaderText>

            {
                !defaultData?.date &&
                <DatePicker
                    placeHolder={'Select Date'}
                    date={date ? format(new Date(date), 'yyyy-MM-dd').toString() : format(new Date(), 'yyyy-MM-dd').toString()}
                    minDate={format(new Date(), 'yyyy-MM-dd').toString()}
                    maxDate={format(addDays(new Date(), 30), 'yyyy-MM-dd').toString()}
                    setSelectedDate={(date) => { setDate(date) }}
                    style={styles.DatePickerStyle}
                    textStyle={styles.DatePickerTextStyle}
                />
            }

            <Radiogroup
                options={HolidayData}
                selected={selectedType}
                onSelect={(option) => { setSelectedType(option?.key); setTime({}) }}
                containerStyle={styles.RadioContainerStyle}
                buttonStyle={styles.RadioButtonStyle}
                fontStyle={styles.RedioButtonText}
            />

            {
                selectedType == HolidayData[1].key &&
                <>
                    <Text style={styles.TitleText} numberOfLines={1}>Working Hours</Text>

                    <View style={styles.ContentContainer}>
                        <TimeSelectionButton
                            placeholder={'From'}
                            value={time?.from}
                            onTimeSelect={(time) => { handleChange('from', time) }}
                        />

                        <Text style={styles.SeparetorText} numberOfLines={1}>-</Text>

                        <TimeSelectionButton
                            placeholder={'To'}
                            value={time?.to}
                            onTimeSelect={(time) => { handleChange('to', time) }}
                        />
                    </View>
                </>
            }

            <TouchableOpacity
                style={styles.SaveButton}
                onPress={() => {
                    if (!date || date?.trim() == '') {
                        ErrorToast('', 'Select Date');
                        return;
                    }
                    if (selectedType == HolidayData[1].key && (!time?.from || !time?.to)) {
                        ErrorToast('', 'Select Working Hours');
                        return;
                    }
                    let data = { date };
                    if (defaultData?._id) {
                        data['_id'] = defaultData?._id;
                    }
                    if (time?.from && time?.to && time != null) {
                        data['time'] = time;
                    }
                    onSavePress(data);
                }}
            >
                <Text style={styles.SaveText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(HolidayEditor)

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
    TitleText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(12),
        marginBottom: -ResponsiveSizeWp(5),
    },
    RadioContainerStyle: {
        justifyContent: 'flex-start',
        marginVertical: ResponsiveSizeWp(5),
    },
    RadioButtonStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
    },
    RedioButtonText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(13),
    },
    DatePickerStyle: {
        flex: 1,
        height: ResponsiveSizeWp(45),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(15),
        elevation: 0,
        shadowOpacity: 0,
    },
    DatePickerTextStyle: {
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
})