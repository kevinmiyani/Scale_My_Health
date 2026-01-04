import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import HeaderText from '../../screens/AddPrescriptionScreen/components/HeaderText';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { ErrorToast } from '../../constants/ToastMessage';
import { FontFamily } from '../../constants/Fonts';
import { CreateCaseAPI } from '../../api/utils';
import Radiogroup from '../radiobutton/Radiogroup';
import { GenderData } from '../../constants/helper';
import DatePicker from '../modal/DatePicker';
import { format } from 'date-fns';

const AddCase = ({
    appointment,
    onCancelPress = () => { },
    onAdded = () => { },
}) => {

    const appointmentId = appointment?._id;

    const patient = appointment?.patient;
    const patientId = patient?._id;
    const doctor = appointment?.doctor;
    const doctorId = doctor?._id;

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        disease: '',
        symptoms: '',
    });

    const [patientData, setPatientdata] = useState({
        _id: patientId,
        fullName: `${patient?.firstName} ${patient?.lastName}`,
        gender: patient?.gender,
        birthDate: patient?.birthDate,
        height: '',
        weight: '',
    })

    const handleChange = (key, value) => {
        setData(pre => ({ ...pre, [key]: value }))
    }

    const handlePatientDataChange = (key, value) => {
        setPatientdata(pre => ({ ...pre, [key]: value }))
    }

    const onAddCasePress = async () => {
        try {

            if (!patientData?.fullName?.trim()) {
                ErrorToast('', 'Add Pateint Name');
                return;
            }

            if (!patientData?.height?.trim()) {
                ErrorToast('', 'Add Pateint Height');
                return;
            }

            if (!patientData?.weight?.trim()) {
                ErrorToast('', 'Add Pateint Weight');
                return;
            }

            if (!data?.disease?.trim()) {
                ErrorToast('', 'Add disease');
                return;
            }

            setLoading(true);

            const params = {
                doctor: doctorId,
                lastAppointment: appointmentId,
                patient: patientData,
                ...data,
            }

            const res = await CreateCaseAPI(params);

            if (res?.data?.status) {
                const data = res?.data?.data;
                onAdded(data);
            } else {
                ErrorToast('', 'Something went wrong');
            }

            setLoading(false);
        } catch (error) {
            ErrorToast('', 'Something went wrong');
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <View style={styles.Container}>
            <HeaderText onCancelPress={!loading && onCancelPress}>
                Add New Case
            </HeaderText>

            <Text style={[styles.InputTitle, { marginTop: ResponsiveSizeWp(5) }]}>
                Patient Name
            </Text>

            <TextInput
                value={patientData.fullName}
                onChangeText={(text) => { handlePatientDataChange('fullName', text) }}
                style={[styles.TextInput,]}
                placeholder={'Patient Name'}
                placeholderTextColor={COLOR.BLACK_40}
                numberOfLines={1}
                keyboardType='default'
            />

            <Text style={styles.InputTitle}>
                Birth Date
            </Text>

            <DatePicker
                date={patientData?.birthDate ? format(new Date(patientData.birthDate), 'yyyy-MM-dd').toString() : ''}
                minDate={format(new Date('1950-01-01'), 'yyyy-MM-dd').toString()}
                maxDate={format(new Date(), 'yyyy-MM-dd').toString()}
                setSelectedDate={(date) => { handlePatientDataChange('birthDate', date) }}
                style={styles.DatePickerStyle}
                textStyle={styles.DatePickerTextStyle}
            />

            <Text style={styles.InputTitle}>
                Gender
            </Text>

            <Radiogroup
                options={GenderData}
                selected={patientData?.gender}
                onSelect={(option) => { handlePatientDataChange('gender', option?.key) }}
                containerStyle={styles.RadioContainerStyle}
                buttonStyle={styles.RadioButtonStyle}
                fontStyle={styles.RedioButtonText}
            />

            <View style={styles.RowContainer}>
                <TextInput
                    value={patientData.height}
                    onChangeText={(text) => { handlePatientDataChange('height', text) }}
                    style={styles.TextInput}
                    placeholder={'Height (cm.)'}
                    placeholderTextColor={COLOR.BLACK_40}
                    numberOfLines={1}
                    keyboardType='number-pad'
                    maxLength={3}
                />

                <TextInput
                    value={patientData.weight}
                    onChangeText={(text) => { handlePatientDataChange('weight', text) }}
                    style={styles.TextInput}
                    placeholder={'Weight (kg)'}
                    placeholderTextColor={COLOR.BLACK_40}
                    numberOfLines={1}
                    keyboardType='number-pad'
                    maxLength={3}
                />
            </View>

            <TextInput
                value={data.disease}
                onChangeText={(text) => { handleChange('disease', text) }}
                style={styles.TextInput}
                placeholder={'Write Disease Here'}
                placeholderTextColor={COLOR.BLACK_40}
                numberOfLines={1}
                keyboardType='default'
            />

            <TextInput
                value={data.symptoms}
                onChangeText={(text) => { handleChange('symptoms', text) }}
                style={styles.TextInput}
                placeholder={'Write Symptoms Here'}
                placeholderTextColor={COLOR.BLACK_40}
                numberOfLines={1}
                keyboardType='default'
            />

            <TouchableOpacity
                style={styles.AddButton}
                onPress={onAddCasePress}
                disabled={loading}
            >
                {
                    loading ?
                        <ActivityIndicator
                            color={COLOR.WHITE}
                        />
                        :
                        <Text style={styles.AddText}>Add New Case</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default memo(AddCase)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        backgroundColor: COLOR.LIGHTGRAY,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(20),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        gap: ResponsiveSizeWp(10),
    },
    ContentContainer: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
    },
    TextInput: {
        flex: 1,
        height: ResponsiveSizeWp(45),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(15),
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
    AddButton: {
        height: ResponsiveSizeWp(45),
        width: '100%',
        backgroundColor: COLOR.PRIMARYCOLOR,
        borderRadius: ResponsiveSizeWp(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(2),
        borderColor: COLOR.WHITE,
        marginTop: ResponsiveSizeWp(10),
    },
    AddText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(12),
    },
    RowContainer: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
    },
    RadioContainerStyle: {
        paddingHorizontal: ResponsiveSizeWp(7),
    },
    InputTitle: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(12),
        marginBottom: -ResponsiveSizeWp(5),
    },
    RadioButtonStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
    },
    RedioButtonText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(13),
    },
    DatePickerStyle: {
        flex: 1,
        height: ResponsiveSizeWp(45),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(15),
        elevation: 0,
        shadowOpacity: 0,
    },
    DatePickerTextStyle: {
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
})