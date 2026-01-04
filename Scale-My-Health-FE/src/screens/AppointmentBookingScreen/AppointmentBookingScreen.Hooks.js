import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { COLOR } from '../../constants/Colors';
import { ErrorToast, SuccessToast } from '../../constants/ToastMessage';
import { useSelector } from 'react-redux';
import { reducers } from '../../redux/helper';
import { CreateAppointmentAPI, GetAppointmentTimeSlotForPatientAPI, RescheduleAppointmentAPI } from '../../api/utils';
import socketServices from '../../api/Socket';
import { appointmentModes } from '../../utils/helper';
import RazorpayCheckout from 'react-native-razorpay';
import { keyid } from '../../utils/razorpay-config';
import moment from 'moment';

const modes = appointmentModes;

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { firstName, lastName, image, designation, _id, consultationCharge } = props?.route?.params;
    const oldAppointment = props?.route?.params?.data;
    const oldAppointmentId = oldAppointment?._id;

    const name = `Dr ${firstName} ${lastName}`;
    const initial = `${firstName && firstName[0]}${lastName && lastName[0]}`;
    const authId = useSelector(state => state[reducers.AuthReducer]);
    const userData = useSelector(state => state[reducers.UserDataReducer]);
    const today = format(new Date(), 'yyyy-MM-dd').toString();

    // UseStates
    const [currentStep, setCurrentStep] = useState(1);
    const [date, setDate] = useState(oldAppointment?.date ?? today);
    const [time, setTime] = useState('');
    const [selectedMode, setSelectedMode] = useState(modes.find((mode) => mode?.id === oldAppointment?.appointmentType));
    const [color, setColor] = useState(COLOR.PRIMARYCOLOR);
    const [loading, setLoading] = useState(false);
    const [appointmentId, setAppointmentId] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [timeLoading, setTimeLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        date && getTimeSlots(date);
    }, [date])

    // Methods
    const getTimeSlots = async (date) => {
        try {
            setTimeLoading(true);
            if (date === oldAppointment?.date) setTime(oldAppointment?.time ?? '');
            else setTime('');

            const currentTime = fetchCurrentTime();

            const params = {
                doctor: _id,
                currentTime: date == today ? currentTime : null,
                date: date,
            }

            const res = await GetAppointmentTimeSlotForPatientAPI(params);

            if (res?.data?.status) {
                const data = res?.data?.data;
                setTimeSlots(data ?? []);
            } else {
                ErrorToast('Time Slots', 'Please change date and try again');
            }
            setTimeLoading(false);
        } catch (error) {
            setTimeLoading(false);
            console.log(error);
        }
    }

    const fetchCurrentTime = () => {
        var h = new Date().getHours();
        var m = new Date().getMinutes();

        if (m >= 30 && h < 22) {
            h = h + 1;
            m = '00';
        } else {
            m = 30;
        }
        const time = h + ':' + m;
        return moment(time, ['HH:mm']).format('h:mm A').toString();
    }

    const onButtonPress = () => {
        switch (currentStep) {
            case 1:
                if (checkPage1())
                    if (oldAppointmentId) onRescheduleAppointment();
                    else setCurrentStep(2);
                break;
            case 2:
                onPayNow();
                break;
            case 3:
                if (oldAppointmentId) navigation.pop(1);
                else navigation.pop(3);
                break;
            default:
                break;
        }
    }

    const checkPage1 = () => {
        if (!date) {
            ErrorToast('', 'Select Date');
            return false
        } else if (!time) {
            ErrorToast('', 'Select Time');
            return false
        } else if (!selectedMode?.id) {
            ErrorToast('', 'Select Mode');
            return false
        } else {
            return true;
        }
    }

    const onPayNow = () => {
        const charge = (consultationCharge ?? 1) * 100;
        const options = {
            key: keyid,
            amount: charge,
            name: 'Scale My Health',
            description: 'Payment for Appointment',
            prefill: {
                contact: userData?.mobileNo,
            },
            currency: 'INR',
            theme: { color: COLOR.PRIMARYCOLOR },
        };

        RazorpayCheckout.open({ ...options, hidden: true })
            .then((data) => {
                SuccessToast('Payment success', data?.razorpay_payment_id);
                onBookAppointment();
            })
            .catch((error) => {
                ErrorToast('Payment error', error?.description);
            });
    }

    const onBookAppointment = async () => {
        try {
            setLoading(true);
            const data = {
                doctor: _id,
                patient: authId,
                time: time,
                date: date,
                appointmentType: selectedMode.id,
                consultationCharge: consultationCharge ?? 1,
            }
            const res = await CreateAppointmentAPI(data);
            if (res?.data?.status) {
                const data = res?.data?.data;
                socketServices.emit('AppointmentBooked', data);
                setAppointmentId(data?._id);
                setCurrentStep(3);
                setColor(COLOR.SUCCESS);
            } else {
                ErrorToast('', 'Something went wrong');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const onRescheduleAppointment = async () => {
        try {
            setLoading(true);

            const data = {
                time: time,
                date: date,
                appointmentType: selectedMode.id,
            }

            const res = await RescheduleAppointmentAPI(oldAppointmentId, data, {
                doctor: _id,
                patient: authId,
            });

            if (res?.data?.status) {
                const data = res?.data?.data;
                setAppointmentId(data?._id);
                setCurrentStep(3);
                setColor(COLOR.SUCCESS);
            } else {
                ErrorToast('', 'Something went wrong');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return {
        navigation,
        name,
        initial,
        image,
        designation,
        consultationCharge,
        loading,
        timeSlots,
        timeLoading,
        oldAppointment,

        color, setColor,
        date, setDate,
        time, setTime,
        currentStep, setCurrentStep,

        modes,
        selectedMode, setSelectedMode,
        appointmentId, setAppointmentId,

        onButtonPress,
    };
}

export default useScreenHooks