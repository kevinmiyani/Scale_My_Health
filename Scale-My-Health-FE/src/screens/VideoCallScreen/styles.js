import { Platform, StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    RTCViewStyle: {
        width: '100%',
        height: '100%',
    },
    MyViewContainer: {
        marginTop: ResponsiveSizeWp(35),
        position: 'absolute',
        zIndex: 10,
        padding: ResponsiveSizeWp(25),
    },
    MyPreview: {
        width: ResponsiveSizeWp(100),
        aspectRatio: 1 / 1.5,
        overflow: 'hidden',
        // borderRadius: Platform.OS == 'ios' && ResponsiveSizeWp(20),
        zIndex: 100,
    },
    VideoDisableView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.BLACK,
        position: 'absolute',
        zIndex: 100,
    },
    FullScreenPreview: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    InfoContainer: {
        position: 'absolute',
        zIndex: 100,
        bottom: ResponsiveSizeWp(30),
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: ResponsiveSizeWp(30),
    },
    PrescribeButton: {
        position: 'absolute',
        top: ResponsiveSizeWp(70),
        right: ResponsiveSizeWp(25),
        zIndex: 101,
    },
})