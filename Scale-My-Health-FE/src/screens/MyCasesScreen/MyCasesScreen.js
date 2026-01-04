import {
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native'
import React from 'react'
import useScreenHooks from './MyCasesScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Empty from '../../components/Empty';
import CaseCard from '../../components/case/CaseCard';

const MyCasesScreen = (props) => {

    const {
        navigation,

        isLoading,
        cases,

        onCasePress,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />

            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons
                        size={ResponsiveSizeWp(30)}
                        color={COLOR.BLACK}
                        name={'arrow-back'}
                    />
                </TouchableOpacity>
                <View style={styles.TitleContainer}>
                    <Text style={styles.HeaderText} numberOfLines={1}>
                        My Cases
                    </Text>
                </View>
            </View>

            {
                cases?.length > 0 ?
                    <FlatList
                        data={cases}
                        renderItem={({ item }) => <CaseCard data={item} onPress={onCasePress} />}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={styles.ContentContainer}
                    />
                    :
                    <Empty title={`You don't have any case`} isLoading={isLoading} />
            }
        </View>
    )
}

export default MyCasesScreen