import React from 'react'
import useScreenHooks from './PrescriptionScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { format } from 'date-fns';
import ProfileImage from '../../components/ProfileImage';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import MedicineCard from '../../components/prescription/MedicineCard';
import DietaryInstructions from '../../components/prescription/DietaryInstructions';
import PrescribeText from './components/PrescribeText';
import LabPrescriptionCard from '../../components/prescription/LabPrescriptionCard';
import Feather from 'react-native-vector-icons/Feather';
import { COLOR } from '../../constants/Colors';

const PrescriptionScreen = (props) => {

    const {
        navigation,
        data,
        userRole,

        onSavePress,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            title={`${data?._id}`}
            subTitle={userRole != 'doctor' && data?.updatedAt && `Written on ${format(new Date(data?.updatedAt), 'dd MMM yyyy').toString()}`}
            navigation={navigation}
            rightButton={
                <TouchableOpacity
                    onPress={onSavePress}
                    style={{ padding: ResponsiveSizeWp(10), }}
                >
                    <Feather
                        name={'download'}
                        color={COLOR.WHITE}
                        size={ResponsiveSizeWp(25)}
                    />
                </TouchableOpacity>
            }
        >
            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={styles.DoctorContainer}>
                    <ProfileImage
                        img={data?.doctor?.image}
                        initial={`${data?.doctor?.firstName && data?.doctor?.firstName[0]}${data?.doctor?.lastName && data?.doctor?.lastName[0]}`}
                        style={{ width: ResponsiveSizeWp(75) }}
                    />
                    <View style={styles.DoctorDetailsContainer}>
                        <Text style={styles.DoctorNameText} numberOfLines={1}>
                            {`Dr ${data?.doctor?.firstName} ${data?.doctor?.lastName}`}
                        </Text>
                        <Text style={styles.DoctorDesignationText} numberOfLines={2}>
                            {data?.doctor?.designation}
                        </Text>
                    </View>
                </View>

                <PrescribeText
                    prescribedFor={data?.prescribeFor ?? ''}
                    prescribedOn={userRole == 'doctor' && `${format(new Date(data?.updatedAt), 'dd MMM yyyy').toString()}`}
                />

                {data?.medicine?.map((medicine, i) => <MedicineCard key={i} data={medicine} />)}

                {data?.labPrescriptions?.length > 0 && <LabPrescriptionCard data={data?.labPrescriptions} />}

                {data?.dietaryInstructions && data?.dietaryInstructions?.length > 0 && <DietaryInstructions data={data?.dietaryInstructions} />}
            </ScrollView>
        </ScreenHeader>
    )
}

export default PrescriptionScreen