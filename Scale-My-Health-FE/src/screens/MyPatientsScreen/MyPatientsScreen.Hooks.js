import { useEffect, useState } from "react";
import { NavigationScreens, navigationToNavigate } from "../../navigation/helper";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { getPatientsForDoctorAPI } from "../../api/utils";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authId = useSelector(state => state[reducers.AuthReducer]);

    // UseStates
    const [allData, setAllData] = useState([]);
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // UseEffects
    useEffect(() => { fetchPatients() }, [])

    useEffect(() => {
        if (searchValue.trim() != '') setPatients(allData.filter((patient) => patient?.fullName?.toLowerCase()?.includes(searchValue?.toLowerCase())));
        else setPatients(allData);
    }, [searchValue])

    // Methods
    const fetchPatients = async () => {
        try {
            setIsLoading(true);
            const res = await getPatientsForDoctorAPI(authId);
            if (res?.data?.status) {
                const data = res?.data?.data;
                setAllData(data);
                setPatients(data);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const onPatientPress = (data) => { navigationToNavigate(navigation, NavigationScreens.PatientInfoScreen, { data }) }

    return {
        navigation,

        isLoading,
        patients,
        searchOpen, setSearchOpen,
        searchValue, setSearchValue,

        onPatientPress,
    };
}

export default useScreenHooks