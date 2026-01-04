import { useEffect, useState } from "react";
import { NavigationScreens, navigationToNavigate, navigationToReplace, navigationToReset } from "../../navigation/helper";
import { Keyboard, Platform } from "react-native";
import { PatientLoginAPI, SendPatientOTPAPI } from "../../api/utils";
import { ErrorToast, SuccessToast } from "../../constants/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataInRedux } from "../../redux/UserData/UserDataAction";
import { storeAuthID, storeUserRole } from "../../constants/AsyncStorage";
import { setAuthIDInRedux } from "../../redux/Authentication/AuthAction";
import OTPVerify from 'react-native-otp-verify';
import { DefaultCountryForPhone } from "../../utils/helper";
import { isValidPhoneNumber, } from 'react-phone-number-input'
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
    const [mobileNo, setMobileNo] = useState('');
    const [countryCode, setCountryCode] = useState(DefaultCountryForPhone);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOTPScreen, setIsOTPScreen] = useState(false);
    const [hash, setHash] = useState('');

    // UseEffects
    useEffect(() => {
        if (Platform.OS == 'android') {
            OTPVerify.getHash()
                .then((hashArray) => {
                    setHash(hashArray[0]);
                })
                .catch((error) => console.log(error));

            OTPVerify.getOtp()
                .then((p) => {
                    OTPVerify.addListener((message) => {
                        extractOtpFromMessage(message);
                    });
                })
                .catch((error) => console.log(error));

            return () => OTPVerify.removeListener();
        }
    }, []);


    // Methods
    const extractOtpFromMessage = (message) => {
        const otpRegex = /(\d{6})/;
        const match = message?.match(otpRegex);
        match && match[0] && setOtp(match[0]);
    };

    const onContinuePress = async () => {
        if (!isValidPhoneNumber(`${countryCode?.callingCode}${mobileNo}`)) {
            ErrorToast('', 'Enter valid mobile number')
            return;
        }
        Keyboard.dismiss();
        setLoading(true);
        onOTPSend();
    }

    const onOTPSend = async () => {
        try {
            const data = {
                mobileNo: `${countryCode?.callingCode}${mobileNo}`,
                hash: hash,
            }
            const res = await SendPatientOTPAPI(data);
            const msg = res?.data?.message;

            if (res?.data?.status) {
                setIsOTPScreen(true);
                msg && SuccessToast('OTP', `${msg}`);
            } else {
                msg && ErrorToast('OTP', `${msg}`);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const onVerifyPress = async () => {
        try {
            if (otp.length != 6) {
                ErrorToast('OTP', 'Enter valid otp')
                return;
            }
            Keyboard.dismiss();
            setLoading(true);
            const lastLogin = await currentDevice();
            const data = {
                mobileNo: `${countryCode?.callingCode}${mobileNo}`,
                otp: otp,
                fcmToken: fcmToken,
                lastLogin: lastLogin,
            }
            const res = await PatientLoginAPI(data);
            if (res?.data?.status) {
                const data = res?.data?.data;
                if (data == null) {
                    navigationToReplace(navigation, NavigationScreens.InitialInformationScreen, { mobileNo: `${countryCode?.callingCode}${mobileNo}` });
                } else {
                    socketServices.emit(sockets.LoginExpire, data?._id); // For only one device login
                    await storeAuthID(data?._id);
                    await storeUserRole(data?.role);
                    dispatch(setAuthIDInRedux(data?._id));
                    dispatch(setUserDataInRedux(data));
                    navigationToReset(navigation, NavigationScreens.HomeScreen);
                }
            } else {
                const msg = res?.data?.message;
                msg && ErrorToast('OTP', `${msg}`)
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const onDoctorPress = () => navigationToNavigate(navigation, NavigationScreens.DoctorLoginScreen);

    return {
        navigation,

        mobileNo, setMobileNo,
        otp, setOtp,
        isOTPScreen, setIsOTPScreen,
        loading, setLoading,
        countryCode, setCountryCode,

        onContinuePress,
        onVerifyPress,
        onDoctorPress,
        onOTPSend,
    };
}

export default useScreenHooks