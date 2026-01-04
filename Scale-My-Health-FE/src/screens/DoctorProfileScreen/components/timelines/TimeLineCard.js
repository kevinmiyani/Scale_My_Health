import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { COLOR } from '../../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'
import { FontFamily } from '../../../../constants/Fonts'
import Feather from 'react-native-vector-icons/Feather';
import ConfirmationModal from '../../../../components/modal/ConfirmationModal'
import TimeLineEditor from './TimeLineEditor'
import { useDispatch, useSelector } from 'react-redux'
import { reducers } from '../../../../redux/helper'
import { EditTimeLineAPI, RemoveTimeLineAPI } from '../../../../api/utils'
import { ErrorToast } from '../../../../constants/ToastMessage'
import { setUserDataInRedux } from '../../../../redux/UserData/UserDataAction'

const TimeLineCard = ({
    data,
}) => {

    const doctorId = useSelector(state => state[reducers.AuthReducer]);
    const dispatch = useDispatch();
    const [removeConfirmationModalVisible, setRemoveConfirmationModalVisible] = useState(false);
    const [timeLineEditorMode, setTimeLineEditorMode] = useState(false);

    const onSavePress = async (data) => {
        try {
            const res = await EditTimeLineAPI(doctorId, data);
            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data != null) {
                    dispatch(setUserDataInRedux(data));
                }
            }
            setTimeLineEditorMode(false);
        } catch (error) {
            ErrorToast('', 'Something went wrong');
            console.log(error);
        }
    }

    const onRemovePress = async (data) => {
        try {
            const res = await RemoveTimeLineAPI(doctorId, data);
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
                timeLineEditorMode ?
                    <TimeLineEditor
                        defaultData={data}
                        onSavePress={onSavePress}
                        onCancelPress={() => { setTimeLineEditorMode(false) }}
                    />
                    :
                    <View style={[styles.Container,]}>
                        <Text style={styles.TimeText}>{data?.from} - {data?.to}</Text>

                        <TouchableOpacity style={styles.Button} onPress={() => { setTimeLineEditorMode(true); }}>
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
            }

            <ConfirmationModal
                title={`${data?.from} - ${data?.to}`}
                desc={`Are you sure you want to remove this timeline?`}
                modalVisible={removeConfirmationModalVisible}
                setModalVisible={setRemoveConfirmationModalVisible}
                onYesPress={() => { onRemovePress(data); }}
            />
        </>
    )
}

export default memo(TimeLineCard)

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.LIGHTGRAY,
        padding: ResponsiveSizeWp(15),
        borderRadius: ResponsiveSizeWp(20),
        flexDirection: 'row',
        gap: ResponsiveSizeWp(15),
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
    },
    TimeText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(17),
        paddingHorizontal: ResponsiveSizeWp(5),
        flex: 1,
        textTransform: 'uppercase',
        top: Platform.OS == 'android' && ResponsiveSizeWp(2.5),
    },
    Button: {
        width: ResponsiveSizeWp(30),
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})