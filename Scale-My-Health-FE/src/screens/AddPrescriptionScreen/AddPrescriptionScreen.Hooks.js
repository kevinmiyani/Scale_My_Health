import { useState } from "react";
import { AddPrescriptionAPI } from "../../api/utils";
import { ErrorToast, SuccessToast } from "../../constants/ToastMessage";
import socketServices from "../../api/Socket";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { title, data } = props.route.params;

    // UseStates
    const [addMedicineOpen, setAddMedicineOpen] = useState(false);
    const [addDietOpen, setAddDietOpen] = useState(title === 'Dietary Instructions');
    const [addXRayOpen, setAddXRayOpen] = useState(title === 'Recommend X-Ray');
    const [addMRIOpen, setAddMRIOpen] = useState(title === 'MRI-TEST');
    const [addBloodTestsOpen, setAddBloodTestsOpen] = useState(title === 'Blood Tests');

    const [medicines, setMedicines] = useState([]);
    const [dietaryInstructions, setDietaryInstructions] = useState([]);
    const [bloodTests, setBloodTests] = useState({ title: 'Blood Tests', content: '' });
    const [xray, setXray] = useState({ title: 'X-Ray', content: '' });
    const [mri, setMri] = useState({ title: 'MRI-Test', content: '' });

    let labPrescriptions = [];

    bloodTests?.content && bloodTests?.content != '' && labPrescriptions.push(bloodTests);
    xray?.content && xray?.content != '' && labPrescriptions.push(xray);
    mri?.content && mri?.content != '' && labPrescriptions.push(mri);

    const [isLoading, setIsLoading] = useState(false);

    // UseEffects

    // Methods
    const onAddDietPress = (diet) => { setDietaryInstructions(pre => [...pre, diet]); }

    const onAddMedicinePress = (medicine) => { setMedicines(pre => [...pre, medicine]); }

    const onAddBloodTestsPress = (data) => { setBloodTests(pre => ({ ...pre, content: data })); setAddBloodTestsOpen(false) }

    const onAddXrayPress = (data) => { setXray(pre => ({ ...pre, content: data })); setAddXRayOpen(false) }

    const onAddMRIPress = (data) => { setMri(pre => ({ ...pre, content: data })); setAddMRIOpen(false) }

    const onSavePress = async () => {
        try {
            setIsLoading(true);
            const params = {
                caseId: data?._id,
                patient: data?.patient?._id,
                doctor: data?.doctor?._id,
                medicine: medicines,
                dietaryInstructions: dietaryInstructions,
                labPrescriptions: labPrescriptions,
            }
            const res = await AddPrescriptionAPI(params);
            const msg = res?.data?.message;
            if (res?.data?.status) {
                const data = res?.data?.data;
                socketServices.emit('PrescriptionAdded', { patient: data?.patient, doctor: data?.doctor });
                SuccessToast('', `${msg}`);
                navigation.pop(1);
            } else {
                ErrorToast('', `${msg}`);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            ErrorToast('', 'Something went wrong');
            console.log(error);
        }
    }

    return {
        navigation,
        title,
        isLoading,

        addDietOpen, setAddDietOpen,
        addMedicineOpen, setAddMedicineOpen,
        addXRayOpen, setAddXRayOpen,
        addMRIOpen, setAddMRIOpen,
        addBloodTestsOpen, setAddBloodTestsOpen,

        dietaryInstructions,
        medicines,
        bloodTests,
        xray,
        mri,
        labPrescriptions,

        onAddDietPress,
        onAddMedicinePress,
        onAddBloodTestsPress,
        onAddXrayPress,
        onAddMRIPress,
        onSavePress,
    };
}

export default useScreenHooks