import { Text, Modal, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAuthID, removeUserRole } from '../../constants/AsyncStorage';
import { removeAuthIDFromRedux } from '../../redux/Authentication/AuthAction';
import { removeUserDataFromRedux } from '../../redux/UserData/UserDataAction';
import { NavigationScreens, navigationToReset } from '../../navigation/helper';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { elevation_5 } from '../../constants/styles';
import { UpdateDoctorFCMTokenAPI, UpdatePatientFCMTokenAPI } from '../../api/utils';

const LogoutModal = ({
    userData,
    modalVisible = false,
    setModalVisible = () => { },
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onLogoutPress = async () => {
        setModalVisible(false);
        userData?.role == 'doctor' ? await UpdateDoctorFCMTokenAPI(userData?._id, { fcmToken: '' }) : await UpdatePatientFCMTokenAPI(userData?._id, { fcmToken: '' });
        await removeAuthID();
        await removeUserRole();
        dispatch(removeAuthIDFromRedux());
        dispatch(removeUserDataFromRedux());
        navigationToReset(navigation, NavigationScreens.LoginScreen);
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={[styles.Container, elevation_5]}>
                    <Text style={styles.LogoutText}>
                        Logout
                    </Text>

                    <Text style={styles.LogoutDescText}>
                        {`Are you sure you want to logout?`}
                    </Text>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.ButtonText}>
                                No
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={onLogoutPress}
                        >
                            <Text style={[styles.ButtonText, { color: COLOR.BLUE }]}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LogoutModal

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
    LogoutText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
    },
    LogoutDescText: {
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