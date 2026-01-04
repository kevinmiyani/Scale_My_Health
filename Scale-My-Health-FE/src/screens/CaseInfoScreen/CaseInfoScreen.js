import {
    View,
    StatusBar,
    TouchableOpacity,
    Text
} from 'react-native'
import React from 'react'
import useScreenHooks from './CaseInfoScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import FloatingButton from '../../components/button/FloatingButton';
import OptionButton from '../../components/button/OptionButton';
import { DietaryOptionIcon, MRITestOptionIcon, NoteOptionIcon, PrescriptionOptionIcon, XRayOptionIcon } from '../../constants/Assets';
import { NavigationScreens, navigationToNavigate } from '../../navigation/helper';
import { FlatList } from 'react-native-gesture-handler';
import Empty from '../../components/Empty';
import DoctorPrescriptionCard from '../../components/prescription/DoctorPrescriptionCard';

const CaseInfoScreen = (props) => {

    const {
        navigation,
        data,
        formatedDate,
        formatedTime,

        prescriptions,
        isLoading,

        onPrescriptionPress,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons
                        size={ResponsiveSizeWp(30)}
                        color={COLOR.WHITE}
                        name={'arrow-back'}
                    />
                </TouchableOpacity>

                <View style={styles.CaseIdContainer}>
                    <Text style={styles.CaseIdTitleText}>Case ID</Text>
                    <Text style={styles.CaseIdValueText}>{`#${data?._id}`}</Text>
                </View>

                <View style={styles.DateTimeContainer}>
                    <Text style={styles.DateText}>{formatedDate}</Text>
                    <Text style={styles.TimeText}>{formatedTime}</Text>
                </View>
            </View>

            {
                prescriptions?.length > 0 ?
                    <FlatList
                        data={prescriptions}
                        renderItem={({ item }) => <DoctorPrescriptionCard data={item} onPress={onPrescriptionPress} />}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={styles.ContentContainer}
                    />
                    :
                    <Empty title={`Case data not found.`} isLoading={isLoading} />
            }

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
                    title={`Write a Prescription`}
                    icon={PrescriptionOptionIcon}
                    onPress={() => { navigationToNavigate(navigation, NavigationScreens.AddPrescriptionScreen, { title: 'Write a Prescription', data }) }}
                />

                <OptionButton
                    title={`Recommend X-Ray`}
                    icon={XRayOptionIcon}
                    onPress={() => { navigationToNavigate(navigation, NavigationScreens.AddPrescriptionScreen, { title: 'Recommend X-Ray', data }) }}
                />

                <OptionButton
                    title={`MRI-TEST`}
                    icon={MRITestOptionIcon}
                    onPress={() => { navigationToNavigate(navigation, NavigationScreens.AddPrescriptionScreen, { title: 'MRI-TEST', data }) }}
                />

                <OptionButton
                    title={`Dietary Instructions`}
                    icon={DietaryOptionIcon}
                    onPress={() => { navigationToNavigate(navigation, NavigationScreens.AddPrescriptionScreen, { title: 'Dietary Instructions', data }) }}
                />

                <OptionButton
                    title={`Add Notes`}
                    icon={NoteOptionIcon}
                />
            </FloatingButton>
        </View>
    )
}

export default CaseInfoScreen