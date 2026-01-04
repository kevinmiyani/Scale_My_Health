import {
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native'
import React from 'react'
import useScreenHooks from './MyPatientsScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Empty from '../../components/Empty';
import PatientCard from './components/PatientCard';
import HeaderButton from './components/HeaderButton';
import SearchView from './components/SearchView';

const MyPatientsScreen = (props) => {

    const {
        navigation,

        isLoading,
        patients,
        searchOpen, setSearchOpen,
        searchValue, setSearchValue,

        onPatientPress,
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
                {
                    !searchOpen &&
                    <>
                        <View style={styles.TitleContainer}>
                            <Text style={styles.HeaderText} numberOfLines={1}>
                                My Patients
                            </Text>
                        </View>

                        <HeaderButton>
                            <Ionicons
                                name='filter'
                                color={COLOR.BLACK}
                                size={ResponsiveSizeWp(25)}
                            />
                        </HeaderButton>

                        <HeaderButton onPress={() => { setSearchOpen(true) }}>
                            <MaterialCommunityIcons
                                name='account-search-outline'
                                color={COLOR.BLACK}
                                size={ResponsiveSizeWp(25)}
                            />
                        </HeaderButton>
                    </>
                }

                {
                    searchOpen &&
                    <SearchView
                        value={searchValue}
                        onChangeText={setSearchValue}
                        onDismiss={() => { setSearchOpen(false) }}
                    />
                }
            </View>

            {
                patients?.length > 0 ?
                    <FlatList
                        data={patients}
                        renderItem={
                            ({ item }) =>
                                <PatientCard
                                    data={item}
                                    onPress={onPatientPress}
                                />
                        }
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={styles.ContentContainer}
                    />
                    :
                    <Empty title={`You don't have any patient`} isLoading={isLoading} />
            }
        </View>
    )
}

export default MyPatientsScreen