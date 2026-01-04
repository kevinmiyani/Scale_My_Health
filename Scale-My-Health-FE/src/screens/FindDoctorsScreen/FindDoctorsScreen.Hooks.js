import { useState } from "react";
import { NavigationScreens, navigationToNavigate } from "../../navigation/helper";
import { DoctorSearchAPI } from "../../api/utils";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;

    // UseStates
    const [search, setSearch] = useState('');
    const [doctorData, setDoctorData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState('');

    // UseEffects


    // Methods
    const onDoctorFind = (text) => {
        setSearch(text);
        clearTimeout(searchTimeout);
        setLoading(true);
        const id = setTimeout(async () => findDoctor(text), 500);
        setSearchTimeout(id);
    }

    const findDoctor = async (text) => {
        try {
            const params = { search: text?.trim() }
            const res = await DoctorSearchAPI(params);
            setDoctorData(res?.data?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const onDoctorPress = (data) => {
        navigationToNavigate(navigation, NavigationScreens.DoctorInfoScreen, { data });
    }

    return {
        navigation,

        search,
        doctorData,
        loading,

        onDoctorFind,
        onDoctorPress,
    };
}

export default useScreenHooks