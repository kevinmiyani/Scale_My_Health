import { Image, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React, { memo, useState } from 'react'
import { FontFamily } from '../../../constants/Fonts'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors'
import { format, differenceInCalendarDays, addDays } from 'date-fns'
import DateTimePicker from 'react-native-modal-datetime-picker'

const Timestamp = ({
    value,
    onSelect = () => { },
}) => {
    const date = value ? new Date(value) : new Date();
    const formattedDate = format(date, 'dd MMM').toString();

    const [modalVisible, setModalVisible] = useState(false);

    const calculateDayLabel = () => {
        const now = new Date();
        const diffInDays = differenceInCalendarDays(date, now);

        if (diffInDays === 0) return `Today, ${formattedDate}`;
        if (diffInDays === 1) return `Tomorrow, ${formattedDate}`;
        if (diffInDays === -1) return `Yesterday, ${formattedDate}`;

        return formattedDate;
    };

    const showPicker = () => {
        setModalVisible(true);
    };

    const hidePicker = () => {
        setModalVisible(false);
    };

    const handleConfirm = (date) => {
        hidePicker();
        onSelect(format(new Date(date), 'yyyy-MM-dd').toString());
    };

    return (
        <>
            <TouchableOpacity
                style={styles.Container}
                activeOpacity={1}
                onPress={showPicker}
            >
                <Image
                    source={require('../../../assets/icons/calendar-days.png')}
                    style={styles.IconStyle}
                />
                <Text style={styles.TextStyle} numberOfLines={1}>{calculateDayLabel()}</Text>
            </TouchableOpacity>

            <DateTimePicker
                date={date}
                isVisible={modalVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                minimumDate={new Date('2025-01-01')}
                maximumDate={addDays(new Date(), 4)}
                buttonTextColorIOS={COLOR.PRIMARYCOLOR}
                display='inline'
            />
        </>
    )
}

export default memo(Timestamp)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: ResponsiveSizeWp(7),
    },
    IconStyle: {
        width: ResponsiveSizeWp(28),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
        tintColor: COLOR.BLACK,
    },
    TextStyle: {
        flex: 1,
        fontSize: ResponsiveSizeWp(18),
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        textDecorationLine: 'underline',
    },
})