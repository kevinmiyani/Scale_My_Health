import React from 'react'
import useScreenHooks from './AddPrescriptionScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import ScreenHeader from '../../components/ScreenHeader';
import FloatingButton from '../../components/button/FloatingButton';
import Entypo from 'react-native-vector-icons/Entypo';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { DietaryOptionIcon, MRITestOptionIcon, NoteOptionIcon, PillIcon, XRayOptionIcon } from '../../constants/Assets';
import OptionButton from '../../components/button/OptionButton';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import MedicineCard from '../../components/prescription/MedicineCard';
import DietaryInstructions from '../../components/prescription/DietaryInstructions';
import AddDietaryInstruction from './components/AddDietaryInstruction';
import AddMedicine from './components/AddMedicine';
import SaveButton from './components/SaveButton';
import LabPrescriptionCard from '../../components/prescription/LabPrescriptionCard';
import AddLabPrescription from './components/AddLabPrescription';

const AddPrescriptionScreen = (props) => {

    const {
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

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            title={title}
            navigation={navigation}
            rightButton={(
                medicines?.length > 0 ||
                dietaryInstructions?.length > 0 ||
                bloodTests?.content?.length > 0 ||
                mri?.content?.length > 0 ||
                xray?.content?.length > 0
            ) && <SaveButton onPress={onSavePress} loading={isLoading} />}
        >
            <KeyboardAvoidingView
                style={styles.Container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.Container}
                    contentContainerStyle={[styles.ContainerStyle, !addDietOpen && !addMedicineOpen && { paddingBottom: ResponsiveSizeWp(120), }]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {medicines?.length > 0 && medicines.map((medicine, i) => <MedicineCard key={i} data={medicine} />)}

                    {
                        addMedicineOpen &&
                        <AddMedicine
                            onAddPress={onAddMedicinePress}
                            onCancelPress={() => { setAddMedicineOpen(false) }}
                        />
                    }

                    {labPrescriptions.length > 0 && <LabPrescriptionCard data={labPrescriptions} />}

                    {
                        addBloodTestsOpen &&
                        <AddLabPrescription
                            title={bloodTests.title}
                            defaultData={bloodTests.content}
                            onAddPress={onAddBloodTestsPress}
                            onCancelPress={() => { setAddBloodTestsOpen(false) }}
                        />
                    }

                    {
                        addXRayOpen &&
                        <AddLabPrescription
                            title={xray.title}
                            defaultData={xray.content}
                            onAddPress={onAddXrayPress}
                            onCancelPress={() => { setAddXRayOpen(false) }}
                        />
                    }

                    {
                        addMRIOpen &&
                        <AddLabPrescription
                            title={mri.title}
                            defaultData={mri.content}
                            onAddPress={onAddMRIPress}
                            onCancelPress={() => { setAddMRIOpen(false) }}
                        />
                    }

                    {dietaryInstructions.length > 0 && <DietaryInstructions data={dietaryInstructions} />}

                    {
                        addDietOpen &&
                        <AddDietaryInstruction
                            onAddPress={onAddDietPress}
                            onCancelPress={() => { setAddDietOpen(false) }}
                        />
                    }
                </ScrollView>
            </KeyboardAvoidingView>

            {
                !addDietOpen && !addMedicineOpen && !addXRayOpen && !addMRIOpen && !addBloodTestsOpen &&
                <FloatingButton
                    right
                    animated
                    icon={
                        <Entypo
                            size={ResponsiveSizeWp(35)}
                            color={COLOR.WHITE}
                            name={'plus'}
                        />
                    }
                >
                    <OptionButton
                        title={`Add Medicine`}
                        icon={PillIcon}
                        onPress={() => { setAddMedicineOpen(true) }}
                    />

                    <OptionButton
                        title={`${bloodTests?.content ? 'Edit' : 'Add'} Blood Tests`}
                        icon={NoteOptionIcon}
                        onPress={() => { setAddBloodTestsOpen(true) }}
                    />

                    <OptionButton
                        title={`${xray?.content ? 'Edit' : 'Add'} X-Ray`}
                        icon={XRayOptionIcon}
                        onPress={() => { setAddXRayOpen(true) }}
                    />

                    <OptionButton
                        title={`${mri?.content ? 'Edit' : 'Add'} MRI-Test`}
                        icon={MRITestOptionIcon}
                        onPress={() => { setAddMRIOpen(true) }}
                    />

                    <OptionButton
                        title={`Add Dietary Instructions`}
                        icon={DietaryOptionIcon}
                        onPress={() => { setAddDietOpen(true) }}
                    />
                </FloatingButton>
            }
        </ScreenHeader>
    )
}

export default AddPrescriptionScreen