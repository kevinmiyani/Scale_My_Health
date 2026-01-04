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
        paddingBottom: ResponsiveSizeWp(120),
        paddingHorizontal: ResponsiveSizeWp(25),
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(25),
        marginTop: Platform.OS == 'android' ? ResponsiveSizeWp(40) : ResponsiveSizeWp(50),
        paddingVertical: ResponsiveSizeWp(10),
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
    TitleText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(18),
        alignSelf: 'center',
        marginTop: ResponsiveSizeWp(20),
    },
})