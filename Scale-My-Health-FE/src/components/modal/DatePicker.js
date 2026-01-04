import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo, useState } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { format } from 'date-fns';
import { COLOR } from '../../constants/Colors';
import { elevation_5 } from '../../constants/styles';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { FontFamily } from '../../constants/Fonts';

const DatePicker = ({
    date,
    minDate,
    maxDate,
    setSelectedDate = () => { },
    style,
    textStyle,
    placeHolder = 'Select Birth Date',
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const showPicker = () => {
        setModalVisible(true);
    };

    const hidePicker = () => {
        setModalVisible(false);
    };

    const handleConfirm = (date) => {
        hidePicker();
        setSelectedDate(format(new Date(date), 'yyyy-MM-dd').toString());
    };
    return (
        <>
            <TouchableOpacity
                style={[styles.Button, elevation_5, style && style]}
                onPress={showPicker}
                activeOpacity={1}
            >

                <Text style={[styles.DateText, !date && { color: COLOR.BLACK_40 }, textStyle && textStyle]} numberOfLines={1}>
                    {date ? format(new Date(date), 'dd MMMM, yyyy') : placeHolder}
                </Text>
                <Image
                    source={require('../../assets/icons/calendar-days.png')}
                    style={styles.IconStyle}
                />
            </TouchableOpacity>

            <DateTimePicker
                date={date ? new Date(date) : new Date()}
                isVisible={modalVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                minimumDate={new Date(minDate)}
                maximumDate={new Date(maxDate)}
                buttonTextColorIOS={COLOR.PRIMARYCOLOR}
                display='inline'
            />
        </>
    )
}

export default memo(DatePicker)

const styles = StyleSheet.create({
    Button: {
        borderRadius: ResponsiveSizeWp(50),
        height: ResponsiveSizeWp(50),
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: COLOR.WHITE,
        width: '100%',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
        justifyContent: 'space-between',
        paddingHorizontal: ResponsiveSizeWp(20),
    },
    DateText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(16),
        fontFamily: FontFamily.Regular,
    },
    IconStyle: {
        width: ResponsiveSizeWp(26),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
        tintColor: COLOR.BLACK,
    },
})