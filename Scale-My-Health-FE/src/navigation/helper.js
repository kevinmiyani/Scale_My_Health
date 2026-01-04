export const NavigationScreens = {
    SplashScreen: 'Splash Screen',
    LoginScreen: 'Login Screen',
    DoctorLoginScreen: 'Doctor Login Screen',
    VideoCallScreen: 'Video Call Screen',

    InitialInformationScreen: 'Initial Information Screen',
    HomeScreen: 'Home Screen',
    FindDoctorsScreen: 'Find Doctors Screen',
    DoctorInfoScreen: 'Doctor Info Screen',
    AppointmentBookingScreen: 'Appointment Booking Screen',
    MyAppointmentScreen: 'My Appointment Screen',
    MyPrescriptionsScreen: 'My Prescriptions Screen',
    PrescriptionScreen: 'Prescription Screen',

    DoctorHomeScreen: 'Doctor Home Screen',
    MyPatientsScreen: 'My Patients Screen',
    MyCasesScreen: 'My Cases Screen',
    PatientInfoScreen: 'Patient Info Screen',
    CaseInfoScreen: 'Case Info Screen',
    AddPrescriptionScreen: 'Add Prescription Screen',
    DoctorProfileScreen: 'Doctor Profile Screen',
}

export const navigationToNavigate = (navigation, screen, params = {}) => {
    return navigation.navigate(screen, params);
}

export const navigationToReplace = (navigation, screen, params = {}) => {
    return navigation.replace(screen, params);
}

export const navigationToReset = (navigation, screen) => {
    return navigation.reset({
        index: 0,
        routes: [{ name: screen }],
    });
}