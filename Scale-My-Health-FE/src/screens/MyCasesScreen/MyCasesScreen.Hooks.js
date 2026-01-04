import { useEffect, useState } from "react";
import { NavigationScreens, navigationToNavigate } from "../../navigation/helper";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { getCasesByDoctorAPI } from "../../api/utils";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authId = useSelector(state => state[reducers.AuthReducer]);

    // UseStates
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // UseEffects
    useEffect(() => { fetchCases() }, [])

    // Methods
    const fetchCases = async () => {
        try {
            setIsLoading(true);
            const res = await getCasesByDoctorAPI(authId);
            if (res?.data?.status) {
                const data = res?.data?.data;
                setCases(data);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const onCasePress = (data) => { navigationToNavigate(navigation, NavigationScreens.CaseInfoScreen, { data }) }

    return {
        navigation,

        isLoading,
        cases,

        onCasePress,
    };
}

export default useScreenHooks