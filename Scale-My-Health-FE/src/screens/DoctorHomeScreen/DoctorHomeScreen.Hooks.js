import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { useEffect, useState } from "react";
import { AppointmentDateByDoctorAPI } from "../../api/utils";
import socketServices from "../../api/Socket";
import { format } from "date-fns";
import { sockets } from "../../api/helper";
import { useSocketContext } from "../../components/socket/SocketContext";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authId = useSelector(state => state[reducers.AuthReducer]);
    const userData = useSelector(state => state[reducers.UserDataReducer]);
    const { socketConnected } = useSocketContext();

    // UseStates
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [logoutModalVisible, setLogoutModalVisibility] = useState(false);
    const [optionModalVisible, setOptionModalVisibility,] = useState(false);

    // UseEffects
    useEffect(() => {
        if (socketConnected) {
            socketServices.on('NewAppointmentForDoctor', () => { fetchAppointments(date) });
            socketServices.on(sockets.Appointment.complete.doctor, () => { fetchAppointments(date) });
            socketServices.on(sockets.Appointment.reschedule.doctor, () => { fetchAppointments(date) });
        }
        return () => {
            socketServices.removeListener('NewAppointmentForDoctor');
            socketServices.removeListener(sockets.Appointment.complete.doctor);
            socketServices.removeListener(sockets.Appointment.reschedule.doctor);
        }
    }, [socketConnected])

    useEffect(() => { fetchAppointments(date); }, [date])

    // Methods
    const onProfilePress = async () => {
        setOptionModalVisibility(true);
    }

    const fetchAppointments = async (date) => {
        try {
            const res = await AppointmentDateByDoctorAPI(authId, date);
            if (res?.data?.status) {
                const data = res?.data?.data;
                setAppointments(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        navigation,

        userData,
        appointments,

        date, setDate,
        logoutModalVisible, setLogoutModalVisibility,
        optionModalVisible, setOptionModalVisibility,

        onProfilePress,
    };
}

export default useScreenHooks