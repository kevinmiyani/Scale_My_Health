import { useState } from "react";
import { NavigationScreens, navigationToReset } from "../../navigation/helper";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard } from "react-native";
import { ErrorToast } from "../../constants/ToastMessage";
import { DoctorLoginAPI } from "../../api/utils";
import { storeAuthID, storeUserRole } from "../../constants/AsyncStorage";
import { setAuthIDInRedux } from "../../redux/Authentication/AuthAction";
import { setUserDataInRedux } from "../../redux/UserData/UserDataAction";
import { reducers } from "../../redux/helper";
import { currentDevice } from "../../utils/currentDevice";
import socketServices from "../../api/Socket";
import { sockets } from "../../api/helper";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const dispatch = useDispatch();
    const fcmToken = useSelector(state => state[reducers.FCMTokenReducer]);

    // UseStates
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // UseEffects


    // Methods
    const onContinuePress = async () => {
        try {
            if (!username?.trim()) {
                ErrorToast('', 'Enter username');
                return;
            }

            if (!password?.trim()) {
                ErrorToast('', 'Enter password');
                return;
            }

            Keyboard.dismiss();
            setLoading(true);

            const lastLogin = await currentDevice();

            const data = {
                username: username?.trim(),
                password: password?.trim(),
                fcmToken: fcmToken,
                lastLogin: lastLogin
            }

            const res = await DoctorLoginAPI(data);
            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data == null) {
                    ErrorToast('', 'Incorrect username or password');
                } else {
                    socketServices.emit(sockets.LoginExpire, data?._id); // For only one device login
                    await storeAuthID(data?._id);
                    await storeUserRole(data?.role);
                    dispatch(setAuthIDInRedux(data?._id));
                    dispatch(setUserDataInRedux(data));
                    navigationToReset(navigation, NavigationScreens.DoctorHomeScreen);
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return {
        navigation,

        loading,

        username, setUsername,
        password, setPassword,

        onContinuePress,
    };
}

export default useScreenHooks