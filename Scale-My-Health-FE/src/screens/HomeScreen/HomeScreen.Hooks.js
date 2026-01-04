import { useSelector } from "react-redux";
import { NavigationScreens, navigationToNavigate } from "../../navigation/helper";
import { reducers } from "../../redux/helper";
import { useEffect, useState } from "react";
import { AppointmentStatusByPatientAPI } from "../../api/utils";
import socketServices from "../../api/Socket";
import { SuccessToast } from "../../constants/ToastMessage";
import { useCurrentLocation } from "../../hooks/location/useCurrentLocation";
import { sockets } from "../../api/helper";
import { getLastCity, storeLastCity } from "../../constants/AsyncStorage";
import { useSocketContext } from "../../components/socket/SocketContext";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authId = useSelector(state => state[reducers.AuthReducer]);
    const userData = useSelector(state => state[reducers.UserDataReducer]);
    const { city } = useCurrentLocation();
    const { socketConnected } = useSocketContext();

    // UseStates
    const [appointments, setAppointments] = useState([]);
    const [logoutModalVisible, setLogoutModalVisibility] = useState(false);
    const [lastCity, setLastCity] = useState('');

    // UseEffects

    useEffect(() => { fetchLastCity() }, [])

    useEffect(() => {
        if (socketConnected) {
            fetchAppointments();

            socketServices.on('NewAppointmentForPatient', fetchAppointments);
            socketServices.on(sockets.Appointment.complete.patient, fetchAppointments);
            socketServices.on(sockets.Appointment.reschedule.patient, fetchAppointments);
            socketServices.on(sockets.Doctor.holiday, fetchAppointments);
        }

        return () => {
            socketServices.removeListener('NewAppointmentForPatient');
            socketServices.removeListener(sockets.Appointment.complete.patient);
            socketServices.removeListener(sockets.Appointment.reschedule.patient);
            socketServices.removeListener(sockets.Doctor.holiday);
        }
    }, [socketConnected])

    useEffect(() => { city != lastCity && manageCity(city) }, [city])

    // Methods
    const onFindDoctorsPress = () => navigationToNavigate(navigation, NavigationScreens.FindDoctorsScreen);

    const onProfilePress = async () => {
        setLogoutModalVisibility(true);
    }

    const fetchAppointments = async () => {
        try {
            const res = await AppointmentStatusByPatientAPI(authId);
            if (res?.data?.status) {
                const data = res?.data?.data;
                setAppointments(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const manageCity = async (city) => {
        setLastCity(city);
        await storeLastCity(city);
    }

    const fetchLastCity = async () => {
        const city = await getLastCity();
        setLastCity(city);
    }

    return {
        navigation,
        userData,
        appointments,
        lastCity,

        logoutModalVisible, setLogoutModalVisibility,

        onFindDoctorsPress,
        onProfilePress,
    };
}

export default useScreenHooks