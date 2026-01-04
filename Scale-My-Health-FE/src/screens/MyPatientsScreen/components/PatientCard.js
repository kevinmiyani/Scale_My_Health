import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { differenceInYears } from 'date-fns'
import { COLOR } from '../../../constants/Colors';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { FontFamily } from '../../../constants/Fonts';


const PatientCard = ({
    data,
    onPress = () => { },
}) => {
    const patient = data;

    const name = patient?.fullName?.toString()?.split(' ');

    const dateOfBirth = patient?.birthDate && new Date(patient?.birthDate);
    const currentDate = new Date();

    const years = differenceInYears(currentDate, dateOfBirth);

    return (
        <TouchableOpacity
            style={styles.Container}
            activeOpacity={1}
            onPress={() => { onPress(data) }}
        >
            <View style={styles.ProfileImage}>
                <Text style={styles.ProfileText} numberOfLines={1}>{name?.[0]?.[0] ?? ''}{name?.[1]?.[0] ?? ''}</Text>
            </View>
            <View style={styles.DetailsContainer}>
                <Text style={styles.NameText} numberOfLines={1}>{patient?.fullName}</Text>
                <Text style={[styles.GenderText]} numberOfLines={1}>
                    {patient?.gender}, {years} Yrs.
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default memo(PatientCard)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginVertical: ResponsiveSizeWp(7),
        alignItems: 'center',
        backgroundColor: COLOR.LIGHTGRAY,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(15),
        flexDirection: 'row',
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
    },
    ProfileImage: {
        backgroundColor: 'rgba(121,170,244,1)',
        width: ResponsiveSizeWp(55),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ProfileText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(20),
        textTransform: 'uppercase',
        top: Platform.OS == 'android' && ResponsiveSizeWp(2.5),
    },
    DetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
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
})