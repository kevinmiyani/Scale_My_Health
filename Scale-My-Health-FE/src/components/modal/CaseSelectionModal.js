import { Text, Modal, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { elevation_5 } from '../../constants/styles';
import FloatingButton from '../button/FloatingButton';
import Entypo from 'react-native-vector-icons/Entypo';
import CaseCard from '../case/CaseCard';
import { getAllCasesByPatientDoctorAPI } from '../../api/utils';
import { useSelector } from 'react-redux';
import { reducers } from '../../redux/helper';
import AddCase from '../case/AddCase';
import Ionicons from 'react-native-vector-icons/Ionicons'

const CaseSelectionModal = ({
    modalVisible = false,
    appointment,
    fullScreen,
    setModalVisible = () => { },
    onCaseSelect = () => { },
}) => {

    const _scrollView = useRef();

    const patientId = appointment?.patient?._id;
    const patientName = `${appointment?.patient?.firstName} ${appointment?.patient?.lastName}`;

    const authId = useSelector(state => state[reducers.AuthReducer]);

    const [addCaseOpen, setAddCaseOpen] = useState(false);

    const [cases, setCases] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchCases() }, [])

    const onAddCasePress = (data) => {
        setCases(pre => [data, ...pre]);
        setAddCaseOpen(false);
    }

    const onSavePress = async (data) => {
        setModalVisible(false);
        onCaseSelect(data);
    }

    const fetchCases = async () => {
        try {
            setLoading(true);
            const params = {
                doctor: authId,
                patient: patientId,
            }
            const res = await getAllCasesByPatientDoctorAPI(params);
            if (res?.data?.status) {
                const data = res?.data?.data;
                setCases(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <KeyboardAvoidingView
                style={styles.ListContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'android' && -ResponsiveSizeWp(30)}
            >
                <View style={styles.ViewWrapper}>
                    <TouchableOpacity
                        style={styles.BackButton}
                        onPress={() => setModalVisible(false)}
                        activeOpacity={1}
                    />
                    <View style={[styles.Container, elevation_5, fullScreen && {
                        height: '85%',
                        maxHeight: '85%',
                    }]}>

                        <View style={styles.HeaderContainer}>
                            <Text style={styles.TitleText}>
                                {patientName}'s Cases
                            </Text>
                            {
                                fullScreen &&
                                <TouchableOpacity onPress={() => { setModalVisible(false) }}>
                                    <Ionicons
                                        name='close'
                                        size={ResponsiveSizeWp(24)}
                                        color={COLOR.BLACK}
                                    />
                                </TouchableOpacity>
                            }
                        </View>

                        {
                            loading ?
                                <View style={{ height: '85%', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                    <ActivityIndicator color={COLOR.BLUE} />
                                </View>
                                :
                                <ScrollView
                                    ref={_scrollView}
                                    contentContainerStyle={styles.ListContainerStyle}
                                    showsVerticalScrollIndicator={false}
                                >
                                    {
                                        addCaseOpen &&
                                        <AddCase
                                            appointment={appointment}
                                            onAdded={onAddCasePress}
                                            onCancelPress={() => { setAddCaseOpen(false) }}
                                        />
                                    }

                                    {cases?.length > 0 && cases.map((data, i) => <CaseCard key={i} data={data} onPress={onSavePress} patientNameShown={false} />)}
                                </ScrollView>
                        }
                        {
                            !addCaseOpen &&
                            <FloatingButton
                                right
                                icon={
                                    <Entypo
                                        size={ResponsiveSizeWp(35)}
                                        color={COLOR.WHITE}
                                        name={'plus'}
                                    />
                                }
                                onPress={() => {
                                    setAddCaseOpen(true);
                                    _scrollView?.current?.scrollTo({ y: 0, animate: true })
                                }}
                            />
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default CaseSelectionModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    BackButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
    },
    Container: {
        borderTopLeftRadius: ResponsiveSizeWp(20),
        borderTopRightRadius: ResponsiveSizeWp(20),
        width: '100%',
        paddingTop: ResponsiveSizeWp(25),
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(15),
        backgroundColor: COLOR.WHITE,
        minHeight: '60%',
        maxHeight: '80%',
        zIndex: 1,
    },
    ListContainer: {
        height: '100%',
        width: '100%',
    },
    ListContainerStyle: {
        paddingTop: ResponsiveSizeWp(10),
        paddingBottom: ResponsiveSizeWp(100),
        gap: ResponsiveSizeWp(15),
    },
    TitleText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
        flex: 1,
    },
    HeaderContainer: {
        flexDirection: 'row',
        marginBottom: ResponsiveSizeWp(10),
        alignItems: 'center',
        gap: ResponsiveSizeWp(10),
    }
})