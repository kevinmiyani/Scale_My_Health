import {
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import React from 'react'
import useScreenHooks from './AppointmentBookingScreen.Hooks';
import { styles } from './styles';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import DateController from './components/DateController';
import TimeController from './components/TimeController';
import OrangeButton from '../../components/button/OrangeButton';
import { FontFamily } from '../../constants/Fonts';
import ProfileImage from '../../components/ProfileImage';
import SuccessView from './components/SuccessView';
import SuccessDataView from './components/SuccessDataView';
import { format } from 'date-fns';

const AppointmentBookingScreen = (props) => {

    const {

        navigation,
        name,
        initial,
        image,
        designation,
        consultationCharge,
        loading,
        timeLoading,
        timeSlots,
        oldAppointment,

        color,
        date, setDate,
        time, setTime,
        currentStep,

        appointmentId,
        modes,
        selectedMode, setSelectedMode,
        onButtonPress,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <View style={[styles.HeaderContainer, { backgroundColor: color }]}>
                <View style={styles.HeaderContentContainer}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Ionicons
                            size={ResponsiveSizeWp(30)}
                            color={COLOR.WHITE}
                            name={'arrow-back'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText} numberOfLines={1}>
                        Book an Appointment With
                    </Text>
                </View>

                <View style={styles.DoctorContainer}>
                    <ProfileImage
                        img={image}
                        initial={initial}
                        gradientColor={GRADIENTCOLOR.LIGHTBLUE2}
                    />
                    <View style={styles.DoctorDetailsContainer}>
                        <Text style={styles.DoctorNameText} numberOfLines={1}>
                            {name}
                        </Text>
                        <Text style={styles.DoctorDesignationText} numberOfLines={2}>
                            {designation}
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                bounces={false}
            >
                {
                    currentStep != 4 &&
                    <View style={styles.StepContainer}>
                        <View style={styles.Step}>
                            <View style={[styles.StepCircle, currentStep == 1 && { backgroundColor: color }]}>
                                <Text style={[styles.StepText,]}>1</Text>
                            </View>
                            <Text style={[styles.StepDescText, currentStep == 1 && { color: COLOR.BLACK }]} numberOfLines={1}>Select Time</Text>
                        </View>

                        <View style={styles.StepLine} />

                        <View style={styles.Step}>
                            <View style={[styles.StepCircle, currentStep == 2 && { backgroundColor: color }]}>
                                <Text style={styles.StepText}>2</Text>
                            </View>
                            <Text style={[styles.StepDescText, currentStep == 2 && { color: COLOR.BLACK }]} numberOfLines={1}>Payment</Text>
                        </View>

                        <View style={styles.StepLine} />

                        <View style={styles.Step}>
                            <View style={[styles.StepCircle, currentStep == 3 && { backgroundColor: color }]}>
                                <Text style={styles.StepText}>3</Text>
                            </View>
                            <Text style={[styles.StepDescText, currentStep == 3 && { color: COLOR.BLACK }]} numberOfLines={1}>Summary</Text>
                        </View>
                    </View>
                }

                {
                    currentStep == 1 &&
                    <>
                        <DateController
                            value={date}
                            onChange={setDate}
                        />

                        <TimeController
                            time={time}
                            onSelectTime={setTime}
                            timeSlot={timeSlots}
                            loading={timeLoading}
                            oldTime={oldAppointment?.date === date && oldAppointment?.time}
                        />

                        <Text style={styles.TitleText}>Select Mode</Text>

                        <View style={[styles.ModeSelection]}>
                            {
                                modes.map((mode, i) => {
                                    return (
                                        <TouchableOpacity
                                            style={[styles.ModeButton, mode?.id == selectedMode?.id && { backgroundColor: COLOR.PRIMARYCOLOR }]}
                                            onPress={() => { setSelectedMode(mode) }}
                                            key={i}
                                            activeOpacity={1}
                                        >
                                            <Image
                                                style={[styles.ModeIcon, mode?.id == selectedMode?.id && { tintColor: COLOR.WHITE }]}
                                                source={mode.icon}
                                            />
                                            <Text style={[styles.ModeText, mode?.id == selectedMode?.id && { color: COLOR.WHITE }]}>
                                                {mode.title}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </>
                }

                {
                    currentStep == 2 &&
                    <>
                        {
                            loading ?
                                <View style={styles.LoaderContainer}>
                                    <ActivityIndicator color={color} />
                                </View>
                                :
                                <>
                                    <Text style={styles.TitleText}>Consultation Charges</Text>
                                    <Text style={[styles.TitleText, { fontFamily: FontFamily.Bold }]}>₹ {parseFloat(consultationCharge?.toString() ?? '1').toFixed(2).toString()}</Text>
                                </>
                        }
                    </>
                }

                {
                    currentStep == 3 &&
                    <>
                        <SuccessView />

                        <SuccessDataView
                            title={'Appointment Id'}
                            value={`${appointmentId}`}
                        />

                        <SuccessDataView
                            title={'Date & Time'}
                            value={`${date && format(new Date(date), 'dd MMM yyyy, ').toString()}${time}`}
                            rightButtonText={'Add to Reminder'}
                        />

                        <SuccessDataView
                            title={'Consultation Mode'}
                            value={selectedMode.title}
                            rightButtonText={'Get Direction'}
                            icon={selectedMode.icon}
                        />
                    </>
                }
            </ScrollView>

            {
                <OrangeButton
                    text={
                        currentStep == 1 ? oldAppointment?._id ? 'Reschedule Appointment' : 'Next' :
                            currentStep == 2 ? 'Pay Now' :
                                currentStep == 3 && 'Continue'
                    }
                    icon={
                        <Ionicons
                            size={ResponsiveSizeWp(30)}
                            color={COLOR.WHITE}
                            name={'arrow-forward'}
                        />
                    }
                    onPress={onButtonPress}
                    disabled={loading}
                />
            }
        </View>
    )
}

export default AppointmentBookingScreen