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

        paddingBottom: ResponsiveSizeWp(25),
        paddingHorizontal: ResponsiveSizeWp(25),
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(25),
        marginTop: Platform.OS == 'android' ? ResponsiveSizeWp(45) : ResponsiveSizeWp(60),
    },
    NotificationButton: {
        width: ResponsiveSizeWp(50),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.LIGHTBLUE,
    },
    ProfileButton: {
        width: ResponsiveSizeWp(44),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(44),
        overflow: 'hidden',
    },
    ProfileContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfileName: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Bold,
        fontSize: ResponsiveSizeWp(17),
        textTransform: 'uppercase',
        top: Platform.OS == 'android' && ResponsiveSizeWp(1.5),
    },
    SearchButton: {
        flexDirection: 'row',
        borderRadius: ResponsiveSizeWp(50),
        paddingHorizontal: ResponsiveSizeWp(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: ResponsiveSizeWp(10),
        borderColor: COLOR.PRIMARYCOLOR,
        paddingVertical: ResponsiveSizeWp(10),
        marginTop: ResponsiveSizeWp(20),
        marginBottom: ResponsiveSizeWp(10),
        marginHorizontal: ResponsiveSizeWp(25),
    },
    SearchPlaceholderText: {
        color: COLOR.BLACK_50,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(16),
    },
    QuickStartContainer: {
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(12),
        marginTop: ResponsiveSizeWp(20),
    },
    QuickStartText: {
        fontSize: ResponsiveSizeWp(18),
        fontFamily: FontFamily.SemiBold,
        color: COLOR.WHITE,
        marginBottom: ResponsiveSizeWp(10),
    },
    QuickStartGrid: {
        flexDirection: 'row',
        marginBottom: ResponsiveSizeWp(8),
        gap: ResponsiveSizeWp(8),
    },
    ServicesContainer: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(8),
    },
})