import {
    View,
    StatusBar
} from 'react-native'
import React from 'react'
import useScreenHooks from './TempScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';

const TempScreen = (props) => {

    const {
        navigation,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>

        </View>
    )
}

export default TempScreen