import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'
import { COLOR } from '../../../../constants/Colors'
import { FontFamily } from '../../../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { reducers } from '../../../../redux/helper'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ErrorToast, SuccessToast } from '../../../../constants/ToastMessage'
import { setUserDataInRedux } from '../../../../redux/UserData/UserDataAction'
import { UpdateDoctorDetailsAPI } from '../../../../api/utils'
import { elevation_2, elevation_5 } from '../../../../constants/styles'
import { useFilePermissions } from '../../../../hooks/files/useFilePermissions'
import ImagePicker from 'react-native-image-crop-picker';
import { useCloudinaryUpload } from '../../../../hooks/useCloudinaryUpload'

const EditDetails = ({
    onDismiss = () => { }
}) => {

    const defaultData = useSelector(state => state[reducers.UserDataReducer]);
    const doctorId = useSelector(state => state[reducers.AuthReducer]);
    const dispatch = useDispatch();
    const { requestFilePermission } = useFilePermissions();
    const { uploadImage } = useCloudinaryUpload();

    const [data, setData] = useState(defaultData);
    const [image, setImage] = useState({ path: defaultData?.image })
    const [loading, setLoading] = useState(false);

    const onPickerPress = async () => {
        try {
            const storagePermission = await requestFilePermission()
            if (storagePermission) {
                ImagePicker.openPicker({
                    width: 1080,
                    height: 1080,
                    compressImageQuality: 1,
                    mediaType: 'photo',
                    cropping: true,
                }).then(setImage);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onSaveChangesPress = async () => {
        try {
            if (!data?.firstName?.trim()) {
                ErrorToast('', 'First name required.');
                return;
            } else if (!data?.lastName?.trim()) {
                ErrorToast('', 'Last name required.');
                return;
            } else if (data?.mobileNo?.trim()?.length != 10) {
                ErrorToast('', 'Phone number required.');
                return;
            } else if (!data?.email?.trim()) {
                ErrorToast('', 'Email address required.');
                return;
            } else if (!data?.speciality?.trim()) {
                ErrorToast('', 'Specialization required.');
                return;
            } else if (!data?.designation?.trim()) {
                ErrorToast('', 'Short designation required.');
                return;
            } else if (!data?.longDesignation?.trim()) {
                ErrorToast('', 'Full designation required.');
                return;
            } else if (!data?.consultationCharge?.toString()?.trim()) {
                ErrorToast('', 'Consultation fee required.');
                return;
            } else if (parseInt(data?.consultationCharge?.toString()?.trim()) <= 0) {
                ErrorToast('', 'Consultation fee must be greater than 0.');
                return;
            } else if (!data?.averageConsultationTime?.toString()?.trim()) {
                ErrorToast('', 'Average duration required.');
                return;
            } else if (parseInt(data?.averageConsultationTime?.toString()?.trim()) <= 0) {
                ErrorToast('', 'Average duration must be greater than 0.');
                return;
            }

            setLoading(true);

            const imgUrl = image?.path?.startsWith('http') ? image?.path : await uploadImage(image);

            const res = await UpdateDoctorDetailsAPI(doctorId, imgUrl === '' ? data : { ...data, image: imgUrl });

            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data) dispatch(setUserDataInRedux(data));
                SuccessToast('', 'The details have been updated successfully.');
                onDismiss();
            } else ErrorToast('', 'Something went wrong');

            setLoading(false);
        } catch (error) {
            console.log(error);
            ErrorToast('', 'Something went wrong');
            setLoading(false);
        }
    }

    const handleChange = (key, value) => {
        setData(pre => ({ ...pre, [key]: value }));
    }

    return (
        <>
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
            >
                <View style={[styles.DetailContainer]}>
                    <View style={[styles.ProfileContainer, elevation_5]}>
                        <FastImage
                            source={{ uri: image?.path }}
                            style={styles.ProfileImage}
                            resizeMode='cover'
                        />
                        <TouchableOpacity style={[styles.CameraButton, elevation_2]} onPress={onPickerPress}>
                            <FontAwesome6
                                name={'camera'}
                                size={ResponsiveSizeWp(16)}
                                color={COLOR.WHITE}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.TitleText} numberOfLines={1}>Basic Information</Text>

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>First Name</Text>
                    <TextInput
                        value={data?.firstName}
                        onChangeText={(text) => { handleChange('firstName', text) }}
                        style={[styles.TextInput]}
                        placeholder={''}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='default'
                    />

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Last Name</Text>
                    <TextInput
                        value={data?.lastName}
                        onChangeText={(text) => { handleChange('lastName', text) }}
                        style={[styles.TextInput]}
                        placeholder={''}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='default'
                    />

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Specialization</Text>
                    <TextInput
                        value={data?.speciality}
                        onChangeText={(text) => { handleChange('speciality', text) }}
                        style={[styles.TextInput]}
                        placeholder={''}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='default'
                    />
                    <Text style={styles.NoteText} numberOfLines={1}>Specializations must be separated by a comma (",")</Text>
                </View>

                <View style={[styles.DetailContainer]}>
                    <Text style={styles.TitleText} numberOfLines={1}>Contact Information</Text>

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Phone Number</Text>
                    <TextInput
                        value={data?.mobileNo}
                        onChangeText={(text) => { handleChange('mobileNo', text) }}
                        style={[styles.TextInput]}
                        placeholder={'00000 00000'}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='phone-pad'
                        maxLength={10}
                    />

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Email Address</Text>
                    <TextInput
                        value={data?.email}
                        onChangeText={(text) => { handleChange('email', text) }}
                        style={[styles.TextInput]}
                        placeholder={'example@gmail.com'}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='email-address'
                    />
                </View>

                <View style={[styles.DetailContainer]}>
                    <Text style={styles.TitleText} numberOfLines={1}>Designation</Text>
                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Short</Text>
                    <TextInput
                        value={data?.designation}
                        onChangeText={(text) => { handleChange('designation', text) }}
                        style={[styles.TextInput]}
                        placeholder={'Write your short designation here....'}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='default'
                    />

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Full</Text>
                    <TextInput
                        value={data?.longDesignation}
                        onChangeText={(text) => { handleChange('longDesignation', text) }}
                        style={[styles.TextInput, styles.MultiLineTextInput]}
                        placeholder={'Write your full designation here....'}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='default'
                        multiline
                    />
                </View>

                <View style={[styles.DetailContainer]}>
                    <Text style={styles.TitleText} numberOfLines={1}>About Me</Text>
                    <TextInput
                        value={data?.intro}
                        onChangeText={(text) => { handleChange('intro', text) }}
                        style={[styles.TextInput, styles.MultiLineTextInput]}
                        placeholder={'Write your bio here....'}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        keyboardType='default'
                        multiline
                    />
                </View>

                <View style={[styles.DetailContainer]}>
                    <Text style={styles.TitleText} numberOfLines={1}>Consultation Details</Text>

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Consultation Fee</Text>
                    <TextInput
                        value={data?.consultationCharge?.toString()}
                        onChangeText={(text) => { handleChange('consultationCharge', text) }}
                        style={[styles.TextInput]}
                        placeholder={'0'}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        maxLength={6}
                        keyboardType='number-pad'
                    />

                    <Text style={styles.PlaceHolderText} numberOfLines={1}>Average Duration (Min)</Text>
                    <TextInput
                        value={data?.averageConsultationTime?.toString()}
                        onChangeText={(text) => { handleChange('averageConsultationTime', text) }}
                        style={[styles.TextInput]}
                        placeholder={'0'}
                        placeholderTextColor={COLOR.BLACK_40}
                        numberOfLines={1}
                        maxLength={6}
                        keyboardType='number-pad'
                    />
                </View>
            </ScrollView>

            <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    style={[styles.Button]}
                    onPress={onDismiss}
                    disabled={loading}
                >
                    <Text style={styles.ButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.Button, { backgroundColor: COLOR.PRIMARYCOLOR }]}
                    onPress={onSaveChangesPress}
                    disabled={loading}
                >
                    {
                        loading ?
                            <ActivityIndicator color={COLOR.WHITE} />
                            :
                            <Text style={styles.ButtonText}>Save Changes</Text>
                    }
                </TouchableOpacity>
            </View>
        </>
    )
}

export default memo(EditDetails)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
    },
    ContentContainer: {
        width: '100%',
        gap: ResponsiveSizeWp(10),
        padding: ResponsiveSizeWp(10),
    },
    DetailContainer: {
        padding: ResponsiveSizeWp(15),
        gap: ResponsiveSizeWp(15),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(15),
        elevation: 1,
        shadowColor: COLOR.LIGHTGRAY,
        shadowOpacity: 0.15,
        shadowOffset: { height: 1, },
        shadowRadius: 1,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAY,
    },
    ProfileContainer: {
        width: ResponsiveSizeWp(100),
        aspectRatio: 1 / 1,
        alignSelf: 'center',
        borderRadius: ResponsiveSizeWp(100),
        backgroundColor: COLOR.WHITE,
        padding: ResponsiveSizeWp(3),
        marginBottom: ResponsiveSizeWp(10),
    },
    ProfileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: ResponsiveSizeWp(100),
    },
    CameraButton: {
        width: ResponsiveSizeWp(33),
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.PRIMARYCOLOR,
        position: 'absolute',
        zIndex: 100,
        right: 0,
        bottom: 0,
        borderRadius: ResponsiveSizeWp(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    PlaceHolderText: {
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(13),
        marginBottom: -ResponsiveSizeWp(12),
    },
    NoteText: {
        color: COLOR.GRAY,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(10),
        marginTop: -ResponsiveSizeWp(10),
        textAlign: 'right',
    },
    TextInput: {
        height: ResponsiveSizeWp(45),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(15),
        fontSize: ResponsiveSizeWp(14),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
    MultiLineTextInput: {
        paddingVertical: ResponsiveSizeWp(12),
        height: ResponsiveSizeWp(150),
        textAlignVertical: 'top',
    },
    TitleText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(18),
        marginBottom: -ResponsiveSizeWp(10),
    },
    ButtonContainer: {
        width: '100%',
        height: ResponsiveSizeWp(70),
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
        padding: ResponsiveSizeWp(15),
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
    },
    Button: {
        flex: 1,
        height: '100%',
        backgroundColor: COLOR.ORANGE,
        alignSelf: 'center',
        paddingHorizontal: ResponsiveSizeWp(18),
        borderRadius: ResponsiveSizeWp(14),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(13),
        top: Platform.OS == 'android' && ResponsiveSizeWp(1.5),
    },
})