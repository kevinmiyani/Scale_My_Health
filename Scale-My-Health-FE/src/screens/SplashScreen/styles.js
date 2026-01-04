import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'

export const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.PRIMARYCOLOR,
        flex: 1,
        alignItems: 'center',
    },
    AppLogo: {
        height: ResponsiveSizeWp(45),
        width: '100%',
        marginTop: ResponsiveSizeWp(5),
        resizeMode: 'contain',
    },
    PoweredByText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(17),
        color: COLOR.WHITE,
    },
    HeaderContainer: {
        paddingBottom: ResponsiveSizeWp(120),
        flex: 1,
        backgroundColor: COLOR.WHITE,
        width: '100%',
        justifyContent: 'flex-end',
    },
    BottomContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ResponsiveSizeWp(40),
    },
    HospitalLogo: {
        height: ResponsiveSizeWp(120),
        width: '100%',
    }
})