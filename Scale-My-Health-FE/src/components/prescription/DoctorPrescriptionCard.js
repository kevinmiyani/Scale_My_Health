import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { format } from 'date-fns'
import { elevation_2 } from '../../constants/styles';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { FontFamily } from '../../constants/Fonts';

const DoctorPrescriptionCard = ({
    data,
    onPress = () => { },
}) => {

    const name = data?.prescribeFor?.toString()?.split(' ');

    return (
        <TouchableOpacity
            style={styles.Container}
            activeOpacity={1}
            onPress={() => { onPress(data) }}
        >
            <View style={[styles.ProfileImage, elevation_2, { shadowColor: COLOR.WHITE, }]}>
                <Text style={styles.ProfileText} numberOfLines={1}>{name?.[0]?.[0] ?? ''}{name?.[1]?.[0] ?? ''}</Text>
            </View>
            <View style={styles.DetailsContainer}>
                <Text style={styles.IDText} numberOfLines={1}>{data?._id}</Text>
                <Text style={styles.NameText} numberOfLines={1}>{data?.prescribeFor}</Text>
                <Text style={[styles.SpecialityText]} numberOfLines={3}>{`#${data?.caseId}`}</Text>
                <View style={styles.TimeContainer}>
                    <AntDesign name="clockcircleo" size={ResponsiveSizeWp(18)} color={COLOR.GRAY} />
                    <Text style={styles.FooterText}>{data?.updatedAt && `Written on ${format(new Date(data?.updatedAt), 'dd MMM yyyy').toString()}`}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default memo(DoctorPrescriptionCard)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        borderRadius: ResponsiveSizeWp(20),
        backgroundColor: COLOR.LIGHTGRAY,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        padding: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(15),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    DetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
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
    IDText: {
        textAlign: 'right',
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(14),
    },
    NameText: {
        textAlign: 'right',
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(18),
    },
    SpecialityText: {
        textAlign: 'right',
        color: COLOR.GRAY,
        fontFamily: FontFamily.Italic,
        fontSize: ResponsiveSizeWp(11),
        maxWidth: '85%',
    },
    TimeContainer: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: ResponsiveSizeWp(5),
    },
    FooterText: {
        color: COLOR.GRAY,
        fontSize: ResponsiveSizeWp(12),
        fontFamily: FontFamily.Medium,
        top: Platform.OS == 'android' && ResponsiveSizeWp(1.5),
    },
})