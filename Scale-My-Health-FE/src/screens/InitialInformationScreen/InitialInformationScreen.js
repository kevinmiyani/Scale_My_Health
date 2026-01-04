import {
    View,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import useScreenHooks from './InitialInformationScreen.Hooks';
import { styles } from './styles';
import { ScaleMyHealthLogo } from '../../constants/Assets';
import AuthTextInput from '../../components/input/AuthTextInput';
import { keyboardType } from '../../constants/Strings';
import CustomButton from '../../components/button/CustomButton';
import Radiogroup from '../../components/radiobutton/Radiogroup';
import { GenderData } from '../../constants/helper';
import { COLOR } from '../../constants/Colors';
import AdharInput from './components/AdharInput';
import DatePicker from '../../components/modal/DatePicker';
import { format } from 'date-fns';
import { ResponsiveSizeWp } from '../../constants/Responsive';

const InitialInformationScreen = (props) => {

    const {
        navigation,

        data,
        isLoading,

        handleChanges,
        onCancelPress,
        onConfirmPress,
    } = useScreenHooks(props);

    return (
        <KeyboardAvoidingView
            style={styles.Container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <Image
                    style={styles.HospitalLogo}
                    source={ScaleMyHealthLogo}
                    resizeMode='contain'
                />

                <Text style={styles.HeaderText}>Initial Information</Text>

                <Text style={styles.TitleText}>
                    First Name
                </Text>

                <AuthTextInput
                    value={data.firstName}
                    onChangeText={(text) => { handleChanges('firstName', text) }}
                    keyboardType={keyboardType.default}
                    placeholder={'Enter First Name'}
                />

                <Text style={styles.TitleText}>
                    Last Name
                </Text>

                <AuthTextInput
                    value={data.lastName}
                    onChangeText={(text) => { handleChanges('lastName', text) }}
                    keyboardType={keyboardType.default}
                    placeholder={'Enter Last Name'}
                />

                <Text style={styles.TitleText}>
                    Gender
                </Text>

                <Radiogroup
                    options={GenderData}
                    selected={data?.gender}
                    onSelect={(option) => { handleChanges('gender', option?.key) }}
                />

                <AdharInput
                    value={data?.aadharNumber}
                    onChangeText={(text) => { handleChanges('aadharNumber', text) }}
                />

                <Text style={styles.TitleText}>
                    Birth Date
                </Text>

                <DatePicker
                    date={data?.birthDate ? format(new Date(data.birthDate), 'yyyy-MM-dd').toString() : ''}
                    minDate={format(new Date('1950-01-01'), 'yyyy-MM-dd').toString()}
                    maxDate={format(new Date(), 'yyyy-MM-dd').toString()}
                    setSelectedDate={(date) => { handleChanges('birthDate', date) }}
                />

                <CustomButton
                    text={'Confirm'}
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={onConfirmPress}
                    style={{ marginTop: ResponsiveSizeWp(30) }}
                />

                <TouchableOpacity
                    style={styles.CancelButton}
                    onPress={onCancelPress}
                >
                    <Text style={[styles.TitleText, { textDecorationLine: 'underline', }]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default InitialInformationScreen