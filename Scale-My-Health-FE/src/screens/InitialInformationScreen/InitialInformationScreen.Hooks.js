import { useState } from "react";
import { NavigationScreens, navigationToReset } from "../../navigation/helper";
import { GenderData } from "../../constants/helper";
import { PatientRegisterAPI } from "../../api/utils";
import { setUserDataInRedux } from "../../redux/UserData/UserDataAction";
import { setAuthIDInRedux } from "../../redux/Authentication/AuthAction";
import { storeAuthID, storeUserRole } from "../../constants/AsyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToast } from "../../constants/ToastMessage";
import { checkEmptyFields } from "../../utils/validator";
import { reducers } from "../../redux/helper";
import { currentDevice } from "../../utils/currentDevice";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { mobileNo } = props?.route?.params;
    const dispatch = useDispatch();
    const fcmToken = useSelector(state => state[reducers.FCMTokenReducer]);

    // UseStates
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        gender: GenderData[0].key,
        aadharNumber: '',
        birthDate: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // UseEffects


    // Methods
    const handleChanges = (key, value) => {
        setData(pre => ({ ...pre, [key]: value }));
    }

    const onCancelPress = () => {
        setData({
            firstName: '',
            lastName: '',
            gender: GenderData[0].key,
            aadharNumber: '',
            birthDate: '',
        })
    }

    const onConfirmPress = async () => {
        try {
            if (checkEmptyFields(data)) {
                ErrorToast('', 'Provide all information');
                return
            }

            setIsLoading(true);

            const lastLogin = await currentDevice();

            const params = {
                ...data,
                mobileNo: `${mobileNo}`,
                fcmToken: fcmToken,
                lastLogin: lastLogin,
            }

            const res = await PatientRegisterAPI(params);
            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data != null) {
                    await storeAuthID(data?._id);
                    await storeUserRole(data?.role);
                    dispatch(setAuthIDInRedux(data?._id));
                    dispatch(setUserDataInRedux(data));
                    navigationToReset(navigation, NavigationScreens.HomeScreen);
                }
            } else {
                ErrorToast('', 'Something went wrong');
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            ErrorToast('', 'Something went wrong');
            console.log(error);
        }
    }

    return {
        navigation,

        data,
        isLoading,

        handleChanges,
        onCancelPress,
        onConfirmPress,
    };
}

export default useScreenHooks