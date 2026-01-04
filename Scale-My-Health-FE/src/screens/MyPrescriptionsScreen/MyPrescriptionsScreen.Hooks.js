import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { getPrescriptionByPatientAPI } from "../../api/utils";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authId = useSelector(state => state[reducers.AuthReducer]);

    // UseStates
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        fetchPrescriptions();
    }, [])

    // Methods
    const fetchPrescriptions = async () => {
        try {
            setIsLoading(true);
            const res = await getPrescriptionByPatientAPI(authId);
            if (res?.data?.status) {
                const data = res?.data?.data;
                setPrescriptions(data);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    return {
        navigation,
        prescriptions,
        isLoading,
    };
}

export default useScreenHooks