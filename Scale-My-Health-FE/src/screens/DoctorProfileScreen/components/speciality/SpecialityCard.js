import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { COLOR } from '../../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'
import { FontFamily } from '../../../../constants/Fonts'
import ConfirmationModal from '../../../../components/modal/ConfirmationModal'
import Feather from 'react-native-vector-icons/Feather';
import SpecialityEditor from './SpecialityEditor'
import SpecialityText from './SpecialityText'
import { ErrorToast } from '../../../../constants/ToastMessage'
import { setUserDataInRedux } from '../../../../redux/UserData/UserDataAction'
import { EditSpecialityAPI, RemoveSpecialityAPI } from '../../../../api/utils'
import { useDispatch, useSelector } from 'react-redux'
import { reducers } from '../../../../redux/helper'

const SpecialityCard = ({
    data,
}) => {

    const doctorId = useSelector(state => state[reducers.AuthReducer]);
    const dispatch = useDispatch();
    const [removeConfirmationModalVisible, setRemoveConfirmationModalVisible] = useState(false);
    const [editorMode, setEditorMode] = useState(false);

    const onSavePress = async (data) => {
        try {
            const res = await EditSpecialityAPI(doctorId, data);
            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data != null) {
                    dispatch(setUserDataInRedux(data));
                }
            }
            setEditorMode(false);
        } catch (error) {
            ErrorToast('', 'Something went wrong');
            console.log(error);
        }
    }

    const onRemovePress = async (data) => {
        try {
            const res = await RemoveSpecialityAPI(doctorId, data);
            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data != null) {
                    dispatch(setUserDataInRedux(data));
                }
            }
            setRemoveConfirmationModalVisible(false);
        } catch (error) {
            ErrorToast('', 'Something went wrong');
            console.log(error);
        }
    }


    return (
        <>
            {

                editorMode ?
                    <SpecialityEditor
                        defaultData={data}
                        onSavePress={onSavePress}
                        onCancelPress={() => { setEditorMode(false) }}
                    />
                    :
                    <View style={[styles.Container,]}>
                        <View style={[styles.ContentContainer, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                            <SpecialityText
                                title={'Speciality'}
                                value={data?.type}
                            />
                            <TouchableOpacity style={styles.Button} onPress={() => { setEditorMode(true); }}>
                                <Feather
                                    name={'edit'}
                                    color={COLOR.ORANGE}
                                    size={ResponsiveSizeWp(22)}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.Button} onPress={() => { setRemoveConfirmationModalVisible(true); }}>
                                <Feather
                                    name={'trash-2'}
                                    color={COLOR.RED}
                                    size={ResponsiveSizeWp(22)}
                                />
                            </TouchableOpacity>
                        </View>

                        {
                            data?.details &&
                            <SpecialityText
                                title={'Description'}
                                value={data?.details}
                            />
                        }
                    </View>
            }

            <ConfirmationModal
                title={data?.type}
                desc={`Are you sure you want to remove this speciality?`}
                modalVisible={removeConfirmationModalVisible}
                setModalVisible={setRemoveConfirmationModalVisible}
                onYesPress={() => { onRemovePress(data); }}
            />
        </>
    )
}

export default memo(SpecialityCard)

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.LIGHTGRAY,
        padding: ResponsiveSizeWp(15),
        borderRadius: ResponsiveSizeWp(20),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
        paddingLeft: ResponsiveSizeWp(20),
        gap: ResponsiveSizeWp(10),
    },
    ContentContainer: {
        gap: ResponsiveSizeWp(15),
    },
    DateText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(17),
        flex: 1,
        top: Platform.OS == 'android' && ResponsiveSizeWp(2.5),
    },
    Button: {
        width: ResponsiveSizeWp(30),
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})