import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.PRIMARYCOLOR,
    },
    HeaderContainer: {
        marginTop: ResponsiveSizeWp(40),
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingVertical: ResponsiveSizeWp(20),
    },
    TitleText: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(25),
        color: COLOR.WHITE,
    },
    FiltersContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: ResponsiveSizeWp(10),
    },
    ListContainer: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    ListContentContainer: {
        padding: ResponsiveSizeWp(15),
    },
    EmptyText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(16),
        color: COLOR.GRAY,
        textAlign: "center",
        marginTop: ResponsiveSizeWp(30)
    },
    ContentContainer: {
        flex: 1,
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(25),
    },
})