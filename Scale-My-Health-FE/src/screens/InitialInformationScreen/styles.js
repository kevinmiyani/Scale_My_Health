import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.PRIMARYCOLOR,
    },
    ContentContainer: {
        paddingHorizontal: ResponsiveSizeWp(30),
        paddingTop: ResponsiveSizeWp(80),
        paddingBottom: ResponsiveSizeWp(20),
    },
    HospitalLogo: {
        height: ResponsiveSizeWp(55),
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    HeaderText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(25),
        alignSelf: 'center',
        marginVertical: ResponsiveSizeWp(10),
    },
    TitleText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(18),
        marginTop: ResponsiveSizeWp(17),
        marginBottom: ResponsiveSizeWp(7),
        color: COLOR.WHITE,
    },
    CancelButton: {
        alignSelf: 'center',
        marginTop: ResponsiveSizeWp(5),
    }
})