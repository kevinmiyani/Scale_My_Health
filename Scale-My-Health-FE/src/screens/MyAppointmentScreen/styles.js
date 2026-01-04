import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    ContentContainer: {
        paddingTop: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(25),
    },
})