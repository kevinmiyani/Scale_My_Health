import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { differenceInYears } from 'date-fns'
import { COLOR } from '../../../constants/Colors';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { FontFamily } from '../../../constants/Fonts';
import { appointmentModes } from '../../../utils/helper';
import { NavigationScreens, navigationToNavigate } from '../../../navigation/helper';
import CaseSelectionModal from '../../../components/modal/CaseSelectionModal';
import { CompleteAppointmentStatusAPI } from '../../../api/utils';

const bg = '#E6F4FF';

const AppointmentCard = ({
    data,
    navigation,
}) => {
    const patient = data?.patient;
    const doctor = data?.doctor;

    const dateOfBirth = patient?.birthDate && new Date(patient?.birthDate);
    const currentDate = new Date();

    const years = differenceInYears(currentDate, dateOfBirth);
    const appointment = appointmentModes.find(mode => mode.id == data?.appointmentType);
    const appointmentStatus = appointment.status[data?.status];

    const [caseSelectionModalVisible, setCaseSelectionModalVisibility] = useState(false);

    const onCallPress = async () => {
        navigationToNavigate(navigation, NavigationScreens.VideoCallScreen, {
            appointment: data,
            localUserId: doctor?._id ?? '',
            remoteUserId: patient?._id ?? '',
            type: 'caller',
            caller: {
                name: `Dr ${doctor?.firstName} ${doctor?.lastName}`,
                profile: doctor?.image,
            },
            username: `${patient?.firstName} ${patient?.lastName}`,
        });
    }

    const onPersonalPress = () => { setCaseSelectionModalVisibility(true); }

    const onCaseSelect = async (info) => {
        setCaseSelectionModalVisibility(false);
        navigationToNavigate(navigation, NavigationScreens.CaseInfoScreen, { data: info });
        await CompleteAppointmentStatusAPI(data?._id, { doctor: doctor?._id, patient: patient?._id });
    }

    return (
        <>
            <View style={styles.ViewWrapper} >
                <View style={[styles.TimeContainer]}>
                    <Text style={styles.TimeText} numberOfLines={1}>{data?.time}</Text>
                </View>
                <View style={[styles.Container]}>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}>

                        <View style={styles.ProfileImage}>
                            <Text style={styles.ProfileText} numberOfLines={1}>{patient?.firstName && patient?.firstName[0]}{patient?.lastName && patient?.lastName[0]}</Text>
                        </View>
                        <View style={styles.DetailsContainer}>
                            <Text style={styles.NameText} numberOfLines={1}>{patient?.firstName} {patient?.lastName}</Text>
                            <Text style={[styles.GenderText]} numberOfLines={1}>
                                {patient?.gender}, {years} Yrs.
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.ButtonContainer, { backgroundColor: appointmentStatus?.background }]}
                        onPress={() => {
                            if (data?.appointmentType == 'video') onCallPress();
                            else onPersonalPress();
                        }}
                        disabled={data?.status != 'upcoming'}
                    >
                        <Image
                            style={[styles.ButtonIcon]}
                            source={appointment?.icon}
                        />
                        <Text style={styles.ButtonText}>{appointmentStatus?.text}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {
                caseSelectionModalVisible &&
                <CaseSelectionModal
                    fullScreen
                    appointment={data}
                    modalVisible={caseSelectionModalVisible}
                    setModalVisible={setCaseSelectionModalVisibility}
                    onCaseSelect={onCaseSelect}
                />
            }
        </>
    )
}

export default memo(AppointmentCard)

const styles = StyleSheet.create({
    ViewWrapper: {
        width: '100%',
        marginTop: ResponsiveSizeWp(20),
        alignItems: 'center',
    },
    TimeContainer: {
        backgroundColor: bg,
        paddingTop: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(15),
        zIndex: 1,
        borderTopRightRadius: ResponsiveSizeWp(10),
        borderTopLeftRadius: ResponsiveSizeWp(10),
        justifyContent: 'flex-end',
        bottom: -ResponsiveSizeWp(7)
    },
    TimeText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(13),
        textTransform: 'uppercase',
    },
    ProfileImage: {
        backgroundColor: COLOR.GRAY,
        width: ResponsiveSizeWp(60),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ProfileText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(25),
        textTransform: 'uppercase',
        top: Platform.OS == 'android' && ResponsiveSizeWp(2.5),
    },
    Container: {
        width: '100%',
        backgroundColor: bg,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(15),
    },
    DetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    NameText: {
        textAlign: 'right',
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(16),
    },
    GenderText: {
        textAlign: 'right',
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(13),
    },
    ButtonContainer: {
        paddingVertical: ResponsiveSizeWp(7),
        paddingHorizontal: ResponsiveSizeWp(15),
        borderRadius: ResponsiveSizeWp(30),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ResponsiveSizeWp(5),
    },
    ButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(15),
        top: Platform.OS == 'android' && ResponsiveSizeWp(1.5),
        marginRight: ResponsiveSizeWp(3),
    },
    ButtonIcon: {
        width: ResponsiveSizeWp(27),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
        tintColor: COLOR.WHITE,
    }
})