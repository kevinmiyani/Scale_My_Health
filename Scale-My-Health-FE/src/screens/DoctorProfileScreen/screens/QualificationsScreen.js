import { ScrollView, StyleSheet, View } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from '../../../redux/helper';
import { AddQualificationAPI } from '../../../api/utils';
import { ErrorToast } from '../../../constants/ToastMessage';
import FloatingButton from '../../../components/button/FloatingButton';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR } from '../../../constants/Colors';
import { setUserDataInRedux } from '../../../redux/UserData/UserDataAction';
import QualificationEditor from '../components/qualification/QualificationEditor';
import QualificationCard from '../components/qualification/QualificationCard';

const QualificationsScreen = ({
    width,
}) => {

    const _scrollView = useRef();
    const data = useSelector(state => state[reducers.UserDataReducer])?.qualifications;
    const doctorId = useSelector(state => state[reducers.AuthReducer]);
    const dispatch = useDispatch();

    const [editorMode, setEditorMode] = useState(false);

    const onAddSpecialityPress = () => {
        setEditorMode(true);
        _scrollView?.current?.scrollTo({ y: 0 });
    }

    const onAddPress = async (data) => {
        try {
            const res = await AddQualificationAPI(doctorId, data);
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
                    <QualificationEditor
                        onSavePress={onAddPress}
                        onCancelPress={() => { setEditorMode(false) }}
                    />
                }

                {data && data?.map((speciality, i) => <QualificationCard key={i} data={speciality} />)}

            </ScrollView>

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
                    onPress={onAddSpecialityPress}
                />
            }
        </View>
    )
}

export default memo(QualificationsScreen)

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
})