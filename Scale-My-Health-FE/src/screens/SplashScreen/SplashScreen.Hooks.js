import { useEffect } from "react";
import { NavigationScreens, navigationToReplace } from "../../navigation/helper";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authId = useSelector(state => state[reducers.AuthReducer]);
    const data = useSelector(state => state[reducers.UserDataReducer]);

    // UseStates


    // UseEffects
    useEffect(() => {
        if (authId != null && data != null) {
            setTimeout(() => {
                if (authId && authId != '' && data && data?.role) {
                    data?.role == 'doctor' ?
                        navigationToReplace(navigation, NavigationScreens.DoctorHomeScreen) :
                        navigationToReplace(navigation, NavigationScreens.HomeScreen);
                } else {
                    navigationToReplace(navigation, NavigationScreens.LoginScreen);
                }
            }, 1500);
        }
    }, [authId, data])

    // Methods

    return {

    };
}

export default useScreenHooks