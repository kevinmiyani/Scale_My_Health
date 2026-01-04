import { Text, Modal, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { elevation_5 } from '../../constants/styles';
import { CompleteAppointmentStatusAPI } from '../../api/utils';

const AppointmentCompletionModal = ({
    loading,
    data,
    modalVisible = false,
    onYesPress = () => { },
    onNoPress = () => { },
}) => {

    const appointmentId = data?._id;
    const doctor = data?.doctor?._id;
    const patient = data?.patient?._id;

    const onPress = async () => {
        try {
            await CompleteAppointmentStatusAPI(appointmentId, { doctor, patient });
            onYesPress();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
        >
            <View style={styles.ViewWrapper}>
                <View style={[styles.Container, elevation_5]}>
                    <Text style={styles.TItleText}>
                        Appointment
                    </Text>

                    <Text style={styles.DescText}>
                        {`Is this appointment completed?`}
                    </Text>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={onNoPress}
                            disabled={loading}
                        >
                            <Text style={styles.ButtonText}>
                                No
                            </Text>
                        </TouchableOpacity>

                        {
                            loading ?
                                <ActivityIndicator color={COLOR.BLUE} style={styles.Button} />
                                :
                                <TouchableOpacity
                                    style={styles.Button}
                                    onPress={onPress}
                                    disabled={loading}
                                >
                                    <Text style={[styles.ButtonText, { color: COLOR.BLUE }]}>
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AppointmentCompletionModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(30),
    },
    Container: {
        borderRadius: ResponsiveSizeWp(20),
        width: '100%',
        paddingTop: ResponsiveSizeWp(25),
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(15),
        backgroundColor: COLOR.WHITE,
    },
    TItleText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
    },
    DescText: {
        marginVertical: ResponsiveSizeWp(10),
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(16),
        color: COLOR.BLACK,
    },
    ButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Button: {
        padding: ResponsiveSizeWp(10),
        marginLeft: ResponsiveSizeWp(10),
    },
    ButtonText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.ORANGE,
    },
})