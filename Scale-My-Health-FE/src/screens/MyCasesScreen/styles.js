import { Platform, StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    ContentContainer: {
        paddingTop: ResponsiveSizeWp(7),
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(15),
    },
    HeaderContainer: {
        backgroundColor: COLOR.WHITE,
        width: '100%',
        paddingTop: Platform.OS == 'android' ? ResponsiveSizeWp(55) : ResponsiveSizeWp(65),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(20),
        gap: ResponsiveSizeWp(10),
    },
    TitleContainer: {
        flex: 1,
    },
    HeaderText: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
    },
})