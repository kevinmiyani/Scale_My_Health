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
        padding: ResponsiveSizeWp(25),
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
    CaseIdContainer: {
        flex: 1,
    },
    CaseIdTitleText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(13),
    },
    CaseIdValueText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(18),
    },
    DateTimeContainer: {
        alignItems: 'flex-end',
    },
    DateText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(15),
    },
    TimeText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(11),
    },
})