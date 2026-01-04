import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo, useState } from 'react'
import { FontFamily } from '../../../../constants/Fonts'
import { COLOR } from '../../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

const TimeSelectionButton = ({
    placeholder,
    value,
    onTimeSelect = () => { },
}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const showPicker = () => {
        setModalVisible(true);
    };

    const hidePicker = () => {
        setModalVisible(false);
    };

    const handleConfirm = (time) => {
        hidePicker();
        onTimeSelect(moment(new Date(time), ['HH:mm']).format('hh:mm A'));
    };

    return (
        <>
            <TouchableOpacity
                style={styles.Container}
                activeOpacity={1}
                onPress={showPicker}
            >
                <Text style={styles.ButtonText}>{value ? value : placeholder}</Text>
            </TouchableOpacity>

            <DateTimePicker
                date={value ? moment(value, 'hh:mm A').toDate() : new Date()}
                isVisible={modalVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                display='spinner'
                buttonTextColorIOS={COLOR.PRIMARYCOLOR}
                accentColor={COLOR.PRIMARYCOLOR}
            />
        </>
    )
}

export default memo(TimeSelectionButton)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        height: ResponsiveSizeWp(40),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
        top: Platform.OS == 'android' && ResponsiveSizeWp(1),
    }
})