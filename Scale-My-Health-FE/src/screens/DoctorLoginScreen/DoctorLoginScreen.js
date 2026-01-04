import {
    View,
    StatusBar,
    Image,
    Platform,
    KeyboardAvoidingView,
    Text
} from 'react-native'
import React from 'react'
import useScreenHooks from './DoctorLoginScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import AuthTextInput from '../../components/input/AuthTextInput';
import { ScaleMyHealthLogo } from '../../constants/Assets';
import CustomButton from '../../components/button/CustomButton';

const DoctorLoginScreen = (props) => {

    const {
        navigation,

        loading,

        username, setUsername,
        password, setPassword,

        onContinuePress,

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
                    Login as Doctor
                </Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.BottomContainer}>
                    <Text style={styles.TitleText}>
                        Username
                    </Text>

                    <AuthTextInput
                        value={username}
                        onChangeText={setUsername}
                        maxLength={20}
                    />

                    <Text style={styles.TitleText}>
                        Password
                    </Text>

                    <AuthTextInput
                        value={password}
                        onChangeText={setPassword}
                        maxLength={20}
                        style={{ marginBottom: ResponsiveSizeWp(20) }}
                    />

                    <CustomButton
                        text={'Continue'}
                        onPress={onContinuePress}
                        loading={loading}
                        disabled={loading}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default DoctorLoginScreen