import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'

export const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.PRIMARYCOLOR,
        flex: 1,
        alignItems: 'center',
        height: '100%',
        bottom: 0,
    },
    HeaderText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(18),
        marginTop: ResponsiveSizeWp(20),
        color: COLOR.WHITE_50,
    },
    HeaderContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingTop: ResponsiveSizeWp(50),
        borderBottomLeftRadius: ResponsiveSizeWp(50),
        borderBottomRightRadius: ResponsiveSizeWp(50),
        alignItems: 'center',
        position: 'relative',
    },
    BottomContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: ResponsiveSizeWp(40),
        paddingBottom: ResponsiveSizeWp(30),
    },
    HospitalLogo: {
        height: ResponsiveSizeWp(55),
        width: '100%',
        resizeMode: 'contain',
    },
    TitleText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(18),
        marginBottom: ResponsiveSizeWp(10),
        color: COLOR.WHITE,
    },
    ResendOtpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ResponsiveSizeWp(20),
    },
    ResendText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(14),
        color: COLOR.WHITE,
    },
    ResendButton: {
        marginLeft: ResponsiveSizeWp(5),
    },
    DoctorLoginButton: {
        alignSelf: 'center',
        marginVertical: ResponsiveSizeWp(10),
    },
    DoctorLoginText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(15),
        textDecorationLine: 'underline',
    },
})