import {
    View,
    Text,
    StatusBar,
} from 'react-native'
import React from 'react'
import useScreenHooks from './SplashScreen.Hooks';
import { styles } from './styles';
import { HospitalLogo, ScaleMyHealthLogo } from '../../constants/Assets';
import FastImage from 'react-native-fast-image';
import { COLOR } from '../../constants/Colors';

const SplashScreen = (props) => {

    const {

    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />

            <View style={styles.HeaderContainer}>
                <FastImage
                    style={styles.HospitalLogo}
                    source={HospitalLogo}
                    resizeMode='contain'
                />
            </View>

            <View style={styles.BottomContainer}>
                <Text style={styles.PoweredByText}>
                    Powered By
                </Text>
                <FastImage
                    style={styles.AppLogo}
                    source={ScaleMyHealthLogo}
                    resizeMode='contain'
                />
            </View>
        </View>
    )
}

export default SplashScreen