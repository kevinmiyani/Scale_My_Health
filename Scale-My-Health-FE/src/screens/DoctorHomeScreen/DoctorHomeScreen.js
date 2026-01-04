import {
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import { styles } from './styles';
import useScreenHooks from './DoctorHomeScreen.Hooks';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Timestamp from './components/Timestamp';
import AppointmentCard from './components/AppointmentCard';
import DoctorBottomTab from '../../navigation/bottom-tab/DoctorBottomTab';
import LogoutModal from '../../components/modal/LogoutModal';
import OptionMenuModal from './components/OptionMenuModal';
import OptionMenuButton from './components/OptionMenuButton';
import DarkView from '../../components/DarkView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationScreens, navigationToNavigate } from '../../navigation/helper';

const DoctorHomeScreen = (props) => {

    const {
        navigation,

        userData,
        appointments,
        date, setDate,
        logoutModalVisible, setLogoutModalVisibility,
        optionModalVisible, setOptionModalVisibility,

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
                    <Timestamp
                        value={date}
                        onSelect={setDate}
                    />
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
                            {userData?.firstName && userData?.lastName && <Text style={styles.ProfileName}>{`${userData?.firstName && userData?.firstName[0]}${userData?.lastName && userData?.lastName[0]}`}</Text>}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={appointments}
                    style={styles.Container}
                    contentContainerStyle={styles.ContentContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <AppointmentCard
                            data={item}
                            navigation={navigation}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <Text style={styles.TitleText}>
                            My Patient Appointments
                        </Text>
                    }
                />
            </View>

            <DoctorBottomTab />

            <LogoutModal
                userData={userData}
                modalVisible={logoutModalVisible}
                setModalVisible={setLogoutModalVisibility}
            />

            <OptionMenuModal
                modalVisible={optionModalVisible}
                setModalVisible={setOptionModalVisibility}
            >
                <OptionMenuButton
                    icon={
                        <Feather
                            name={'user'}
                            size={ResponsiveSizeWp(25)}
                            color={COLOR.PRIMARYCOLOR}
                        />
                    }
                    onPress={() => {
                        setOptionModalVisibility(false);
                        navigationToNavigate(navigation, NavigationScreens.DoctorProfileScreen);
                    }}
                    text={'Profile'}
                />

                <OptionMenuButton
                    icon={
                        <MaterialIcons
                            name={'logout'}
                            size={ResponsiveSizeWp(25)}
                            color={COLOR.PRIMARYCOLOR}
                        />
                    }
                    onPress={() => {
                        setOptionModalVisibility(false);
                        setLogoutModalVisibility(true);
                    }}
                    text={'Logout'}
                />
            </OptionMenuModal>

            {(optionModalVisible) && <DarkView />}
        </>
    )
}

export default DoctorHomeScreen