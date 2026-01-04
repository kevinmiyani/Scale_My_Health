import { format } from "date-fns";
import { NavigationScreens, navigationToNavigate } from "../../navigation/helper";
import { useEffect, useState } from "react";
import { getPrescriptionByCaseAPI } from "../../api/utils";
import socketServices from "../../api/Socket";
import { useSocketContext } from "../../components/socket/SocketContext";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { data } = props.route.params;
    const formatedDate = data?.createdAt ? format(new Date(data?.createdAt), 'dd MMM yyyy').toString() : '';
    const formatedTime = data?.createdAt ? format(new Date(data?.createdAt), 'hh:mm a').toString() : '';
    const { socketConnected } = useSocketContext();

    // UseStates
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        if (socketConnected) {
            fetchPrescriptions();
            socketServices.on('PrescriptionAddedForCase', fetchPrescriptions);
        }
        return () => { socketServices.removeListener('PrescriptionAddedForCase'); }
    }, [socketConnected])

    // Methods
    const fetchPrescriptions = async () => {
        try {
            setIsLoading(true);
            const res = await getPrescriptionByCaseAPI(data?._id);
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

    const onPrescriptionPress = (data) => { navigationToNavigate(navigation, NavigationScreens.PrescriptionScreen, { data }) }

    return {
        navigation,
        data,
        formatedDate,
        formatedTime,

        prescriptions,
        isLoading,

        onPrescriptionPress,
    };
}

export default useScreenHooks