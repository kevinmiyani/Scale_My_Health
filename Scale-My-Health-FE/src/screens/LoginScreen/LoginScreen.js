import {
    View,
    StatusBar,
    Image,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import useScreenHooks from './LoginScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { ScaleMyHealthLogo } from '../../constants/Assets';
import AuthTextInput from '../../components/input/AuthTextInput';
import { keyboardType } from '../../constants/Strings';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import CustomButton from '../../components/button/CustomButton';
import { FontFamily } from '../../constants/Fonts';

const LoginScreen = (props) => {

    const {
        isOTPScreen,
        loading,

        mobileNo, setMobileNo,
        otp, setOtp,
        countryCode, setCountryCode,

        onContinuePress,
        onVerifyPress,
        onDoctorPress,
        onOTPSend,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <View style={[styles.HeaderContainer,]}>
                <Image
                    style={styles.HospitalLogo}
                    source={ScaleMyHealthLogo}
                    resizeMode='contain'
                />
                <Text style={styles.HeaderText}>
                    Let's Get Started !
                </Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.BottomContainer}>
                    {
                        isOTPScreen ?
                            <>
                                <Text style={styles.TitleText}>
                                    Enter OTP
                                </Text>
                                <AuthTextInput
                                    value={otp}
                                    onChangeText={setOtp}
                                    keyboardType={keyboardType.number_pad}
                                    maxLength={6}
                                    style={{ marginVertical: ResponsiveSizeWp(10) }}
                                    inputStyle={{ textAlign: 'center', fontFamily: FontFamily.SemiBold, }}
                                />
                                <CustomButton
                                    text={'Verify'}
                                    onPress={onVerifyPress}
                                    loading={loading}
                                    disabled={loading}
                                />
                                <View style={styles.ResendOtpContainer}>
                                    <Text style={styles.ResendText}>
                                        Didn't get OTP ?
                                    </Text>
                                    <TouchableOpacity style={styles.ResendButton} onPress={onOTPSend}>
                                        <Text style={[styles.ResendText, { fontFamily: FontFamily.Medium }]}>
                                            Resend it now!
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            <>

                                <Text style={styles.TitleText}>
                                    Enter your Mobile No.
                                </Text>
                                <AuthTextInput
                                    value={mobileNo}
                                    onChangeText={setMobileNo}
                                    keyboardType={keyboardType.phone_pad}
                                    maxLength={15}
                                    isMobileField
                                    style={{ marginVertical: ResponsiveSizeWp(10) }}
                                    inputStyle={{ fontFamily: FontFamily.SemiBold }}
                                    defaultCounryCode={countryCode}
                                    onCountryCodeSelect={(country) => {
                                        setCountryCode({
                                            code: country.cca2,
                                            country: country.name,
                                            callingCode: country.callingCode[0] ? "+" + country.callingCode[0] : '',
                                        })
                                    }}
                                />

                                <TouchableOpacity
                                    style={styles.DoctorLoginButton}
                                    onPress={onDoctorPress}
                                >
                                    <Text style={[styles.DoctorLoginText]}>
                                        Login as a doctor
                                    </Text>
                                </TouchableOpacity>

                                <CustomButton
                                    text={'Continue'}
                                    onPress={onContinuePress}
                                    loading={loading}
                                    disabled={loading}
                                />
                            </>
                    }
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen