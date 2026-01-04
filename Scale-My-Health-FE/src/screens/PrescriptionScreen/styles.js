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
        padding: ResponsiveSizeWp(25),
        backgroundColor: COLOR.WHITE,
    },
    DoctorContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(15),
    },
    DoctorDetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    DoctorNameText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(18),
        textAlign: 'right',
    },
    DoctorDesignationText: {
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(12),
        textAlign: 'right',
    }
})