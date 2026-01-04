import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { format } from 'date-fns'
import CaseText from './CaseText';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';

const CaseCard = ({
    data,
    onPress = () => { },
}) => {

    const formatedDate = data?.createdAt ? format(new Date(data?.createdAt), 'dd MMM yyyy').toString() : '';
    const formatedTime = data?.createdAt ? format(new Date(data?.createdAt), 'hh:mm a').toString() : '';

    return (
        <TouchableOpacity
            style={styles.Container}
            activeOpacity={1}
            onPress={() => { onPress(data) }}
        >
            <View style={styles.DetailCOntainer}>
                <CaseText
                    title={`Case ID`}
                    value={`#${data?._id}`}
                />

                <View style={styles.DateTimeContainer}>
                    <Text style={styles.DateText}>{formatedDate}</Text>
                    <Text style={styles.TimeText}>{formatedTime}</Text>
                </View>
            </View>

            <CaseText
                title={`Patient Name`}
                value={data?.patient?.fullName ?? 'Unknown'}
            />

            <CaseText
                title={`Disease`}
                value={data?.disease ?? 'Not Mention'}
            />
        </TouchableOpacity>
    )
}

export default memo(CaseCard)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(12),
        backgroundColor: COLOR.LIGHTGRAY,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
    },
    DetailCOntainer: {
        width: '100%',
        gap: ResponsiveSizeWp(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    NameText: {
        textAlign: 'right',
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
    },
    GenderText: {
        textAlign: 'right',
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(14),
    },
    DateTimeContainer: {
        alignItems: 'flex-end',
    },
    DateText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(16),
    },
    TimeText: {
        color: COLOR.BLACK_70,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(12),
    },
})