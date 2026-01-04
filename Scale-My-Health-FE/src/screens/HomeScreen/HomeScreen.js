import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import { styles } from './styles';
import useScreenHooks from './HomeScreen.Hooks';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LocationPin from './components/LocationPin';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BannerButton from '../../components/button/BannerButton';
import { HomeBanner } from '../../constants/Demo';
import QuickStartButton from './components/QuickStartButton';
import ServiceButton from './components/ServiceButton';
import AppointmentCard from '../../components/AppointmentCard';
import { NavigationScreens, navigationToNavigate } from '../../navigation/helper';
import LogoutModal from '../../components/modal/LogoutModal';

const HomeScreen = (props) => {

    const {
        navigation,

        userData,
        appointments,
        lastCity,

        logoutModalVisible, setLogoutModalVisibility,

        onFindDoctorsPress,
        onProfilePress,
    } = useScreenHooks(props);

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />

            <View style={styles.Container}>
                <View style={styles.HeaderContainer}>
                    <LocationPin location={lastCity} />
                    <TouchableOpacity
                        style={styles.NotificationButton}
                    >
                        <Fontisto name="bell" size={ResponsiveSizeWp(20)} color={COLOR.BLUE} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ProfileButton} onPress={onProfilePress}>
                        <LinearGradient
                            colors={GRADIENTCOLOR.GREENPROFILE}
                            style={styles.ProfileContainer}
                        >
                            {userData?.firstName && userData?.lastName && < Text style={styles.ProfileName}>{`${userData?.firstName && userData?.firstName[0]}${userData?.lastName && userData?.lastName[0]}`}</Text>}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.SearchButton}
                    activeOpacity={1}
                    onPress={onFindDoctorsPress}
                >
                    <Text style={styles.SearchPlaceholderText}>Find Doctors</Text>
                    <AntDesign name="search1" size={ResponsiveSizeWp(20)} color={COLOR.BLACK} />
                </TouchableOpacity>

                <ScrollView
                    style={styles.Container}
                    contentContainerStyle={styles.ContentContainer}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <BannerButton
                        doctorImg={HomeBanner.img}
                        title={HomeBanner.title}
                        buttonText={HomeBanner.buttonText}
                        gradient={HomeBanner.gradient}
                    />

                    <LinearGradient
                        colors={GRADIENTCOLOR.LIGHTBLUE}
                        style={styles.QuickStartContainer}
                    >
                        <Text style={styles.QuickStartText}>Quick Start</Text>

                        <View style={styles.QuickStartGrid}>
                            <QuickStartButton
                                text={"My\nAppointments"}
                                icon={require(`../../assets/icons/calendar-days.png`)}
                                onPress={() => { navigationToNavigate(navigation, NavigationScreens.MyAppointmentScreen) }}
                            />
                            <QuickStartButton
                                text={"My Lab\nReports"}
                                icon={require(`../../assets/icons/Lab.png`)}
                            />
                            <QuickStartButton
                                text={"My\nPrescriptions"}
                                icon={require(`../../assets/icons/Desc.png`)}
                                onPress={() => { navigationToNavigate(navigation, NavigationScreens.MyPrescriptionsScreen) }}
                            />
                        </View>

                        <View style={styles.QuickStartGrid}>
                            <QuickStartButton
                                text={"Medication\nReminder"}
                                icon={require(`../../assets/icons/Reminder.png`)}
                            />
                            <QuickStartButton
                                text={"Online\nCheck-in"}
                                icon={require(`../../assets/icons/Check.png`)}
                            />
                            <QuickStartButton
                                text={"Virtual\nConsultation"}
                                icon={require(`../../assets/icons/VC.png`)}
                            />
                        </View>

                        <View style={styles.ServicesContainer}>
                            <ServiceButton
                                icon={require(`../../assets/icons/ES.png`)}
                                text={'Emergency\nServices'}
                                color={'#CA0C0C'}
                            />

                            <ServiceButton
                                icon={require(`../../assets/icons/PHC.png`)}
                                text={'Preventive\nHealth Checkup'}
                                color={'#5FCBFE'}
                            />
                        </View>
                    </LinearGradient>

                    {
                        appointments.map((data, i) =>
                            <AppointmentCard
                                key={i}
                                data={data}
                            />
                        )
                    }
                </ScrollView>
            </View>

            <LogoutModal
                userData={userData}
                modalVisible={logoutModalVisible}
                setModalVisible={setLogoutModalVisibility}
            />
        </>
    )
}

export default HomeScreen