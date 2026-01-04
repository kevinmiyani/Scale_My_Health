import React, { memo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { useSelector } from 'react-redux';
import { reducers } from '../../redux/helper';
import LabPrescription from './LabPrescription';

const LabPrescriptionCard = ({
    data
}) => {
    const role = useSelector(state => state[reducers.UserDataReducer]).role;
    return (
        <View style={styles.ViewWraper}>
            <View style={styles.TitleTextContainer}>
                <Text style={styles.Title}>Lab Prescription</Text>
            </View>
            <View style={styles.Container}>
                {
                    data?.map((pre, i) =>
                        <LabPrescription
                            key={i}
                            data={pre}
                            rightButton={
                                role == 'patient' && i == 0 &&
                                <TouchableOpacity>
                                    <Text style={styles.BookText}>{'Book an\nAppointment'}</Text>
                                </TouchableOpacity>
                            }
                        />
                    )
                }
            </View>
        </View>
    );
};

export default memo(LabPrescriptionCard);

const styles = StyleSheet.create({
    ViewWraper: {
        marginTop: ResponsiveSizeWp(20),
    },
    Container: {
        borderRadius: ResponsiveSizeWp(15),
        padding: ResponsiveSizeWp(20),
        paddingTop: ResponsiveSizeWp(25),
        backgroundColor: COLOR.CREAM,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.CREAMBORDER,
        marginTop: ResponsiveSizeWp(14),
        gap: ResponsiveSizeWp(20),
    },
    TitleTextContainer: {
        alignSelf: 'center',
        borderRadius: ResponsiveSizeWp(50),
        backgroundColor: COLOR.WHITE,
        position: 'absolute',
        zIndex: 100,
        height: ResponsiveSizeWp(30),
        justifyContent: 'center',
        paddingHorizontal: ResponsiveSizeWp(15),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.CREAMBORDER,
    },
    Title: {
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
    },
    BookText: {
        textAlign: 'right',
        fontSize: ResponsiveSizeWp(12),
        fontFamily: FontFamily.Medium,
        color: COLOR.BLUE,
    },
});