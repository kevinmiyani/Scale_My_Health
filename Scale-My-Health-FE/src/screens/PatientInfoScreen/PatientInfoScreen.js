import {
    View,
    StatusBar,
    TouchableOpacity,
    Text
} from 'react-native'
import React from 'react'
import useScreenHooks from './PatientInfoScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuStrip from './components/MenuStrip';
import Empty from '../../components/Empty';
import { FlatList } from 'react-native-gesture-handler';
import DoctorPrescriptionCard from '../../components/prescription/DoctorPrescriptionCard';
import CaseCard from '../../components/case/CaseCard';

const PatientInfoScreen = (props) => {

    const {
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
                <View style={styles.ProfileImage}>
                    <Text style={styles.ProfileText} numberOfLines={1}>{name?.[0]?.[0] ?? ''}{name?.[1]?.[0] ?? ''}</Text>
                </View>
                <View style={styles.DetailsContainer}>
                    <Text style={styles.NameText} numberOfLines={1}>{data?.fullName ?? ''}</Text>
                    <Text style={[styles.GenderText]} numberOfLines={1}>
                        {data?.gender}, {years} Yrs.
                    </Text>
                </View>
            </View>

            <MenuStrip
                tabs={tabs}
                selected={tab}
                onTabPress={onTabPress}
            />

            {
                tab == tabs[0] &&
                <>
                    {
                        cases?.length > 0 ?
                            <FlatList
                                data={cases}
                                renderItem={({ item }) => <CaseCard data={item} onPress={onCasePress} />}
                                keyExtractor={(item, index) => index}
                                showsVerticalScrollIndicator={false}
                                style={styles.Container}
                                contentContainerStyle={styles.ContentContainer}
                            />
                            :
                            <Empty title={`You don't have\nany case for this patient`} isLoading={isLoading} />
                    }
                </>
            }

            {
                tab == tabs[1] &&
                <>
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
                            <Empty title={`You don't have\nany prescriptions for this patient`} isLoading={isLoading} />
                    }
                </>
            }

            {
                tab == tabs[2] &&
                <>
                    {
                        // labResults?.length > 0 ?
                        //     <FlatList
                        //         data={labResults}
                        //         renderItem={
                        //             ({ item }) =>
                        //                 <CaseCard
                        //                     data={item}
                        //                 />
                        //         }
                        //         keyExtractor={(item, index) => index}
                        //         showsVerticalScrollIndicator={false}
                        //         style={styles.Container}
                        //         contentContainerStyle={styles.ContentContainer}
                        //     />
                        //     :
                        <Empty title={`You don't have\nany lab results for this patient`} isLoading={isLoading} />
                    }
                </>
            }
        </View>
    )
}

export default PatientInfoScreen