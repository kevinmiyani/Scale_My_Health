import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { useDispatch, useSelector } from 'react-redux'
import { reducers } from '../../../redux/helper'
import TimeLineCard from '../components/timelines/TimeLineCard'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import TimeLineEditor from '../components/timelines/TimeLineEditor'
import { ErrorToast } from '../../../constants/ToastMessage'
import { AddTimeLineAPI } from '../../../api/utils'
import { setUserDataInRedux } from '../../../redux/UserData/UserDataAction'
import Entypo from 'react-native-vector-icons/Entypo';
import FloatingButton from '../../../components/button/FloatingButton'

const TimeLinesScreen = ({
    width,
}) => {

    const _scrollView = useRef();
    const data = useSelector(state => state[reducers.UserDataReducer])?.timeLines;
    const doctorId = useSelector(state => state[reducers.AuthReducer]);
    const dispatch = useDispatch();

    const [timeLineEditorMode, setTimeLineEditorMode] = useState(false);

    const onAddTimeLinePress = () => {
        setTimeLineEditorMode(true);
        _scrollView?.current?.scrollTo({ y: 0 });
    }

    const onAddPress = async (data) => {
        try {
            const res = await AddTimeLineAPI(doctorId, data);
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

    return (
        <View style={[styles.Container, width && { width: width }]}>
            <ScrollView
                ref={_scrollView}
                style={{ width: '100%' }}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
            >
                {
                    timeLineEditorMode &&
                    <TimeLineEditor
                        onSavePress={onAddPress}
                        onCancelPress={() => { setTimeLineEditorMode(false) }}
                    />
                }

                {data && data?.map((time, i) => <TimeLineCard key={i} data={time} />)}

            </ScrollView>
            {
                !timeLineEditorMode &&
                <FloatingButton
                    right
                    icon={
                        <Entypo
                            size={ResponsiveSizeWp(35)}
                            color={COLOR.WHITE}
                            name={'plus'}
                        />
                    }
                    onPress={onAddTimeLinePress}
                />
            }
        </View>
    )
}

export default memo(TimeLinesScreen)

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
    AddButton: {
        backgroundColor: COLOR.ORANGE,
        alignSelf: 'center',
        paddingHorizontal: ResponsiveSizeWp(30),
        paddingVertical: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(17),
        borderWidth: ResponsiveSizeWp(2),
        borderColor: COLOR.WHITE,
    },
    AddButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(14),
        top: Platform.OS == 'android' && ResponsiveSizeWp(1.5),
    },
})