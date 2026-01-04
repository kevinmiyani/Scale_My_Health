import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from '../../../redux/helper';
import { COLOR } from '../../../constants/Colors';
import { FontFamily } from '../../../constants/Fonts';
import { elevation_2 } from '../../../constants/styles';
import HolidaysCard from '../components/holidays/HolidaysCard';
import { setUserDataInRedux } from '../../../redux/UserData/UserDataAction';
import FloatingButton from '../../../components/button/FloatingButton';
import Entypo from 'react-native-vector-icons/Entypo';
import HolidayEditor from '../components/holidays/HolidayEditor';
import { ManageHolidaysAPI } from '../../../api/utils';
import { ErrorToast, SuccessToast } from '../../../constants/ToastMessage';

const HolidaysScreen = ({
    width,
}) => {

    const _scrollView = useRef();
    const data = useSelector(state => state[reducers.UserDataReducer])?.holidays;
    const doctorId = useSelector(state => state[reducers.AuthReducer]);
    const dispatch = useDispatch();

    const [editorMode, setEditorMode] = useState(false);
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(false);

    const isAnyChanges = JSON.stringify(data) !== JSON.stringify(holidays);

    useEffect(() => { setHolidays(data) }, [data])

    const onAddNewPress = () => {
        setEditorMode(true);
        _scrollView?.current?.scrollTo({ y: 0 });
    }

    const onRemoveHoliday = (id) => { setHolidays(pre => pre.filter((data) => data?._id != id)); }

    const onEditHoliday = (holidayData) => {
        const index = holidays.findIndex((holiday) => holiday._id === holidayData._id);
        if (index !== -1) {
            const updatedHolidays = [...holidays];
            updatedHolidays[index] = holidayData;
            setHolidays(updatedHolidays);
        }
    }

    const onAdd = (holidayData) => {
        setEditorMode(false);
        setHolidays(pre => [...pre, holidayData]);
    }

    const onSaveChangesPress = async () => {
        try {
            setLoading(true);
            const res = await ManageHolidaysAPI(doctorId, { holidays });
            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data != null) {
                    dispatch(setUserDataInRedux(data));
                    SuccessToast('', 'Upcoming Holidays Updated');
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            ErrorToast('', 'Something went wrong');
            console.log(error);
        }
    }

    const onDiscardChangesPress = () => { setHolidays(data); }

    return (
        <View style={[styles.Container, width && { width: width }]}>
            <ScrollView
                ref={_scrollView}
                style={{ width: '100%' }}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
            >
                {
                    editorMode &&
                    <HolidayEditor
                        onSavePress={onAdd}
                        onCancelPress={() => { setEditorMode(false) }}
                    />
                }

                {holidays && holidays?.sort((a, b) => new Date(a.date) - new Date(b.date))?.map((holiday, i) => <HolidaysCard key={i} data={holiday} onRemove={onRemoveHoliday} onEdit={onEditHoliday} />)}

            </ScrollView>
            {
                isAnyChanges &&
                <View style={styles.ButtonContainer}>
                    <TouchableOpacity
                        style={[styles.Button, elevation_2]}
                        onPress={onDiscardChangesPress}
                        disabled={loading}
                    >
                        <Text style={styles.ButtonText}>Discard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.Button, { backgroundColor: COLOR.PRIMARYCOLOR }, elevation_2]}
                        onPress={onSaveChangesPress}
                        disabled={loading}
                    >
                        {
                            loading ?
                                <ActivityIndicator color={COLOR.WHITE} />
                                :
                                <Text style={styles.ButtonText}>Save</Text>
                        }
                    </TouchableOpacity>
                </View>
            }
            {
                !editorMode &&
                <FloatingButton
                    right
                    icon={
                        <Entypo
                            size={ResponsiveSizeWp(35)}
                            color={COLOR.WHITE}
                            name={'plus'}
                        />
                    }
                    onPress={onAddNewPress}
                />
            }
        </View>
    )
}

export default memo(HolidaysScreen)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        width: '100%',
        padding: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(20),
        paddingBottom: ResponsiveSizeWp(120),
    },
    ButtonContainer: {
        height: ResponsiveSizeWp(65),
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(15),
        position: 'absolute',
        zIndex: 10,
        bottom: ResponsiveSizeWp(25),
        left: ResponsiveSizeWp(25),
        right: ResponsiveSizeWp(105),
    },
    Button: {
        flex: 1,
        backgroundColor: COLOR.ORANGE,
        alignSelf: 'center',
        paddingHorizontal: ResponsiveSizeWp(18),
        borderRadius: ResponsiveSizeWp(14),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.WHITE,
        height: ResponsiveSizeWp(35),
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