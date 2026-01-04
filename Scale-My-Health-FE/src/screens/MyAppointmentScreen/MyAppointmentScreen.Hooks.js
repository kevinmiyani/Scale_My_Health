import { useEffect, useState } from "react";
import { getAppointmentByPatientAPI } from "../../api/utils";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authId = useSelector(state => state[reducers.AuthReducer]);

    // UseStates
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => { fetchAppointments() }, [])


    // Methods
    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await getAppointmentByPatientAPI(authId);
            if (res?.data?.status) {
                const data = res?.data?.data;
                setAppointments(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return {
        navigation,
        appointments,
        loading,
    };
}

export default useScreenHooks