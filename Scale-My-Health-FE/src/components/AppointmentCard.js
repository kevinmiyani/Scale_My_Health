import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../constants/Responsive'
import { COLOR, GRADIENTCOLOR } from '../constants/Colors'
import { elevation_2 } from '../constants/styles'
import LinearGradient from 'react-native-linear-gradient'
import { FontFamily } from '../constants/Fonts'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileImage from './ProfileImage'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'
import { NavigationScreens, navigationToNavigate } from '../navigation/helper'

const AppointmentCard = ({
    data,
    onPress = () => { },
}) => {

    const navigation = useNavigation();
    const doctor = data?.doctor;
    const onReschedulePress = () => { navigationToNavigate(navigation, NavigationScreens.AppointmentBookingScreen, { ...doctor, data }); }

    return (
        <TouchableOpacity
            style={styles.ViewWrapper}
            activeOpacity={1}
            onPress={onPress}
        >
            {
                data?.status == 'upcoming' &&
                <View style={[styles.UpcomingContainer]}>
                    <Text style={styles.UpcomingText} numberOfLines={1}>UPCOMING APPOINTMENT</Text>
                </View>
            }

            <View style={[styles.Container, elevation_2]}>
                <LinearGradient
                    colors={data?.status == 'missed' ? GRADIENTCOLOR.ORANGE2 : GRADIENTCOLOR.LIGHTBLUE2}
                    style={styles.GradientContainer}
                >
                    <ProfileImage
                        img={doctor?.image}
                        initial={`${doctor?.firstName && doctor?.firstName[0]}${doctor?.lastName && doctor?.lastName[0]}`}
                        initialColor={COLOR.PRIMARYCOLOR}
                        gradientColor={GRADIENTCOLOR.WHITE_30_TO_40}
                    />
                    <View style={styles.DetailsContainer}>
                        <Text style={styles.NameText} numberOfLines={1}>{`Dr ${doctor?.firstName} ${doctor?.lastName}`}</Text>
                        <Text style={[styles.SpecialityText]} numberOfLines={3}>{doctor?.designation}</Text>
                    </View>
                </LinearGradient>

                <View style={styles.TimeContainer}>
                    <AntDesign name="clockcircleo" size={ResponsiveSizeWp(18)} color={COLOR.BLACK} />
                    <Text style={styles.FooterText}>{data?.date && format(new Date(data.date), 'EEE, MMM dd')}</Text>
                    <Text style={[styles.FooterText, { flex: 1, }]}>{data?.time}</Text>
                </View>
            </View>
            {
                data?.rescheduleAllowed === true &&
                <TouchableOpacity style={[styles.RescheduleButton, elevation_2, data?.mustReschedule && { backgroundColor: COLOR.ORANGE }]} activeOpacity={1} onPress={onReschedulePress}>
                    <Text style={styles.RescheduleButtonText}>{data?.mustReschedule ? `Doctor is unavailable. Would you like to reschedule?` : `Need to Reschedule?`}</Text>
                </TouchableOpacity>
            }
        </TouchableOpacity>
    )
}

export default memo(AppointmentCard)

const styles = StyleSheet.create({
    ViewWrapper: {
        width: '100%',
        marginTop: ResponsiveSizeWp(20),
        alignItems: 'center',
    },
    UpcomingContainer: {
        backgroundColor: GRADIENTCOLOR.LIGHTBLUE2[0],
        paddingTop: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(15),
        zIndex: 1,
        borderTopRightRadius: ResponsiveSizeWp(10),
        borderTopLeftRadius: ResponsiveSizeWp(10),
        justifyContent: 'flex-end',
    },
    UpcomingText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(11),
        textTransform: 'uppercase',
    },
    Container: {
        width: '100%',
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(20),
        aspectRatio: 2 / 1,
    },
    GradientContainer: {
        padding: ResponsiveSizeWp(25),
        borderTopRightRadius: ResponsiveSizeWp(20),
        borderTopLeftRadius: ResponsiveSizeWp(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: ResponsiveSizeWp(15),
        flex: 1,
    },
    DetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    NameText: {
        textAlign: 'right',
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(16),
    },
    SpecialityText: {
        textAlign: 'right',
        color: COLOR.WHITE,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(11),
        maxWidth: '85%',
    },
    TimeContainer: {
        paddingVertical: ResponsiveSizeWp(15),
        paddingHorizontal: ResponsiveSizeWp(20),
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
        width: '100%',
        alignItems: 'center',
    },
    FooterText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(12),
        fontFamily: FontFamily.Medium,
        textAlign: 'right',
    },
    RescheduleButton: {
        zIndex: -1,
        backgroundColor: COLOR.MOSSGREEN,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.WHITE,
        width: '100%',
        alignItems: 'center',
        paddingTop: ResponsiveSizeWp(20 + 8),
        paddingBottom: ResponsiveSizeWp(8),
        borderBottomRightRadius: ResponsiveSizeWp(20),
        borderBottomLeftRadius: ResponsiveSizeWp(20),
        marginTop: -ResponsiveSizeWp(20),
        paddingHorizontal: ResponsiveSizeWp(10),
    },
    RescheduleButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(12),
    },
})