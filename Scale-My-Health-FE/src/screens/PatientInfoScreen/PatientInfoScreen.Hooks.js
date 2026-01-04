import { differenceInYears } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { getAllCasesByPatientDoctorAPI, getAllPrescriptionByPatientDoctorAPI } from "../../api/utils";
import { NavigationScreens, navigationToNavigate } from "../../navigation/helper";
import socketServices from "../../api/Socket";
import { useSocketContext } from "../../components/socket/SocketContext";

const tabs = ['Cases', 'Prescriptions', 'Lab Results'];

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { data } = props.route.params;
    const authId = useSelector(state => state[reducers.AuthReducer]);
    const dateOfBirth = data?.birthDate && new Date(data?.birthDate);
    const currentDate = new Date();
    const years = differenceInYears(currentDate, dateOfBirth);
    const params = {
        doctor: authId,
        patient: data?._id,
        patientName: data?.fullName ?? '',
    }
    const { socketConnected } = useSocketContext();
    const name = data?.fullName?.toString()?.split(' ');

    // UseStates
    const [tab, setTab] = useState(tabs[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [cases, setCases] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [labResults, setLabResults] = useState([]);

    // UseEffects
    useEffect(() => {
        if (socketConnected) {
            fetchCases();
            fetchPrescriptions();
            socketServices.on('PrescriptionAddedForDoctor', fetchPrescriptions);
        }
        return () => { socketServices.removeListener('PrescriptionAddedForDoctor'); }
    }, [socketConnected])

    // Methods
    const onTabPress = (tab) => {
        setTab(tab);
    }

    const fetchCases = async () => {
        try {
            setIsLoading(true);
            const res = await getAllCasesByPatientDoctorAPI(params);
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

    const fetchPrescriptions = async () => {
        try {
            setIsLoading(true);
            const res = await getAllPrescriptionByPatientDoctorAPI(params);
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

    const onCasePress = (data) => { navigationToNavigate(navigation, NavigationScreens.CaseInfoScreen, { data }) }

    const onPrescriptionPress = (data) => { navigationToNavigate(navigation, NavigationScreens.PrescriptionScreen, { data }) }

    return {
        navigation,
        years,
        data,
        tabs,
        tab,
        name,
        isLoading,
        cases,
        prescriptions,
        labResults,

        onTabPress,
        onCasePress,
        onPrescriptionPress,
    };
}

export default useScreenHooks