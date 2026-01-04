import { NavigationScreens } from './helper';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import FindDoctorsScreen from '../screens/FindDoctorsScreen/FindDoctorsScreen';
import DoctorInfoScreen from '../screens/DoctorInfoScreen/DoctorInfoScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen/AppointmentBookingScreen';
import InitialInformationScreen from '../screens/InitialInformationScreen/InitialInformationScreen';
import VideoCallScreen from '../screens/VideoCallScreen/VideoCallScreen';
import DoctorLoginScreen from '../screens/DoctorLoginScreen/DoctorLoginScreen';
import DoctorHomeScreen from '../screens/DoctorHomeScreen/DoctorHomeScreen';
import MyAppointmentScreen from '../screens/MyAppointmentScreen/MyAppointmentScreen';
import MyPrescriptionsScreen from '../screens/MyPrescriptionsScreen/MyPrescriptionsScreen';
import PrescriptionScreen from '../screens/PrescriptionScreen/PrescriptionScreen';
import MyPatientsScreen from '../screens/MyPatientsScreen/MyPatientsScreen';
import PatientInfoScreen from '../screens/PatientInfoScreen/PatientInfoScreen';
import CaseInfoScreen from '../screens/CaseInfoScreen/CaseInfoScreen';
import AddPrescriptionScreen from '../screens/AddPrescriptionScreen/AddPrescriptionScreen';
import MyCasesScreen from '../screens/MyCasesScreen/MyCasesScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen/DoctorProfileScreen';

const Stack = createStackNavigator();

export const NavigationHandler = () => {
    return (
        <Stack.Navigator
            initialRouteName={NavigationScreens.SplashScreen}
            screenOptions={{
                headerShown: false,
                autoHideHomeIndicator: true,
            }}
        >
            <Stack.Screen name={NavigationScreens.SplashScreen} component={SplashScreen} />
            <Stack.Screen name={NavigationScreens.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={NavigationScreens.DoctorLoginScreen} component={DoctorLoginScreen} />
            <Stack.Screen name={NavigationScreens.VideoCallScreen} component={VideoCallScreen} options={{ animation: 'none' }} />

            <Stack.Screen name={NavigationScreens.InitialInformationScreen} component={InitialInformationScreen} />
            <Stack.Screen name={NavigationScreens.HomeScreen} component={HomeScreen} />
            <Stack.Screen name={NavigationScreens.FindDoctorsScreen} component={FindDoctorsScreen} />
            <Stack.Screen name={NavigationScreens.DoctorInfoScreen} component={DoctorInfoScreen} />
            <Stack.Screen name={NavigationScreens.AppointmentBookingScreen} component={AppointmentBookingScreen} />
            <Stack.Screen name={NavigationScreens.MyAppointmentScreen} component={MyAppointmentScreen} />
            <Stack.Screen name={NavigationScreens.MyPrescriptionsScreen} component={MyPrescriptionsScreen} />
            <Stack.Screen name={NavigationScreens.PrescriptionScreen} component={PrescriptionScreen} />

            <Stack.Screen name={NavigationScreens.DoctorHomeScreen} component={DoctorHomeScreen} />
            <Stack.Screen name={NavigationScreens.MyPatientsScreen} component={MyPatientsScreen} />
            <Stack.Screen name={NavigationScreens.MyCasesScreen} component={MyCasesScreen} />
            <Stack.Screen name={NavigationScreens.PatientInfoScreen} component={PatientInfoScreen} />
            <Stack.Screen name={NavigationScreens.CaseInfoScreen} component={CaseInfoScreen} />
            <Stack.Screen name={NavigationScreens.AddPrescriptionScreen} component={AddPrescriptionScreen} />
            <Stack.Screen name={NavigationScreens.DoctorProfileScreen} component={DoctorProfileScreen} />
        </Stack.Navigator>
    );
}