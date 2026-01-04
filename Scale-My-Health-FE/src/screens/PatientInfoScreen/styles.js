import { Platform, StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    ContentContainer: {
        padding: ResponsiveSizeWp(20),
        paddingTop: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(15),
    },
    HeaderContainer: {
        backgroundColor: COLOR.PRIMARYCOLOR,
        width: '100%',
        paddingTop: Platform.OS == 'android' ? ResponsiveSizeWp(55) : ResponsiveSizeWp(65),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ResponsiveSizeWp(20),
        paddingBottom: ResponsiveSizeWp(20),
        gap: ResponsiveSizeWp(10),
    },
    DetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: ResponsiveSizeWp(10),
    },
    NameText: {
        textAlign: 'right',
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
    },
    GenderText: {
        textAlign: 'right',
        color: COLOR.WHITE,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(14),
    },
    ProfileImage: {
        backgroundColor: COLOR.WHITE,
        width: ResponsiveSizeWp(50),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ProfileText: {
        color: COLOR.PRIMARYCOLOR,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(20),
        textTransform: 'uppercase',
        top: Platform.OS == 'android' && ResponsiveSizeWp(2),
    },
})