import { Text, Modal, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { elevation_5 } from '../../constants/styles';
import FloatingButton from '../button/FloatingButton';
import OptionButton from '../button/OptionButton';
import { DietaryOptionIcon, MRITestOptionIcon, NoteOptionIcon, PillIcon, XRayOptionIcon } from '../../constants/Assets';
import Entypo from 'react-native-vector-icons/Entypo';
import AddMedicine from '../../screens/AddPrescriptionScreen/components/AddMedicine';
import LabPrescriptionCard from '../prescription/LabPrescriptionCard';
import AddLabPrescription from '../../screens/AddPrescriptionScreen/components/AddLabPrescription';
import DietaryInstructions from '../prescription/DietaryInstructions';
import AddDietaryInstruction from '../../screens/AddPrescriptionScreen/components/AddDietaryInstruction';
import MedicineCard from '../prescription/MedicineCard';

const PrescribeModal = ({
    modalVisible = false,
    setModalVisible = () => { },
    onDonePress = () => { }
}) => {

    const [addMedicineOpen, setAddMedicineOpen] = useState(false);
    const [addDietOpen, setAddDietOpen] = useState(false);
    const [addXRayOpen, setAddXRayOpen] = useState(false);
    const [addMRIOpen, setAddMRIOpen] = useState(false);
    const [addBloodTestsOpen, setAddBloodTestsOpen] = useState(false);

    const [medicines, setMedicines] = useState([]);
    const [dietaryInstructions, setDietaryInstructions] = useState([]);
    const [bloodTests, setBloodTests] = useState({ title: 'Blood Tests', content: '' });
    const [xray, setXray] = useState({ title: 'X-Ray', content: '' });
    const [mri, setMri] = useState({ title: 'MRI-Test', content: '' });

    let labPrescriptions = [];

    bloodTests?.content && bloodTests?.content != '' && labPrescriptions.push(bloodTests);
    xray?.content && xray?.content != '' && labPrescriptions.push(xray);
    mri?.content && mri?.content != '' && labPrescriptions.push(mri);

    const onAddDietPress = (diet) => { setDietaryInstructions(pre => [...pre, diet]); }

    const onAddMedicinePress = (medicine) => { setMedicines(pre => [...pre, medicine]); }

    const onAddBloodTestsPress = (data) => { setBloodTests(pre => ({ ...pre, content: data })); setAddBloodTestsOpen(false) }

    const onAddXrayPress = (data) => { setXray(pre => ({ ...pre, content: data })); setAddXRayOpen(false) }

    const onAddMRIPress = (data) => { setMri(pre => ({ ...pre, content: data })); setAddMRIOpen(false) }

    const onSavePress = async () => {
        setModalVisible(false);
        onDonePress({
            medicine: medicines,
            dietaryInstructions: dietaryInstructions,
            labPrescriptions: labPrescriptions,
        });
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
        >
            <KeyboardAvoidingView
                style={styles.ListContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'android' && -ResponsiveSizeWp(30)}
            >
                <View style={styles.ViewWrapper}>
                    <TouchableOpacity
                        style={styles.BackButton}
                        onPress={onSavePress}
                        activeOpacity={1}
                    />
                    <View style={[styles.Container, elevation_5]}>
                        <View style={styles.HeaderContainer}>
                            <Text style={styles.TitleText}>
                                Prescriptions
                            </Text>

                            <TouchableOpacity
                                style={styles.Button}
                                onPress={onSavePress}
                            >
                                <Text style={styles.ButtonText}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.ListContainerStyle}
                            showsVerticalScrollIndicator={false}
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
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default PrescribeModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    BackButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
    },
    Container: {
        borderTopLeftRadius: ResponsiveSizeWp(20),
        borderTopRightRadius: ResponsiveSizeWp(20),
        width: '100%',
        paddingTop: ResponsiveSizeWp(25),
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(15),
        backgroundColor: COLOR.WHITE,
        minHeight: '60%',
        maxHeight: '80%',
        zIndex: 1,
    },
    ListContainer: {
        flex: 1,
    },
    ListContainerStyle: {
        paddingTop: ResponsiveSizeWp(5),
        paddingBottom: ResponsiveSizeWp(120),
    },
    TitleText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
        flex: 1,
    },
    HeaderContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    Button: {
        padding: ResponsiveSizeWp(10),
        marginLeft: ResponsiveSizeWp(10),
    },
    ButtonText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.ORANGE,
    },
})