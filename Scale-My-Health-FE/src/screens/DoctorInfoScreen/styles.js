import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    ContentContainer: {
        paddingBottom: ResponsiveSizeWp(120),
    },
    HeaderContainer: {
        paddingTop: ResponsiveSizeWp(70),
        padding: ResponsiveSizeWp(25),
        alignItems: 'center',
        backgroundColor: COLOR.PRIMARYCOLOR,
    },
    HeaderButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    ProfileImage: {
        width: ResponsiveSizeWp(110),
    },
    DoctorName: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.WHITE,
        textAlign: 'center',
        marginVertical: ResponsiveSizeWp(10),
    },
    DescText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(12),
        color: COLOR.WHITE,
        textAlign: 'center',
        width: '90%',
    },
    FooterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: ResponsiveSizeWp(15),
        paddingHorizontal: ResponsiveSizeWp(15),
    },
    TitleText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(15),
    },
    RatingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: ResponsiveSizeWp(7),
    },
    IconStyle: {
        width: ResponsiveSizeWp(15),
        aspectRatio: 1 / 1,
    }
})