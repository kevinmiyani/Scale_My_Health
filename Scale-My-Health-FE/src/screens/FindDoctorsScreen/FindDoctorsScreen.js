import {
    ActivityIndicator,
    FlatList,
    StatusBar,
    Text,
    View,
} from 'react-native'
import React from 'react'
import useScreenHooks from './FindDoctorsScreen.Hooks';
import { styles } from './styles';
import SearchView from './components/SearchView';
import DoctorCard from './components/DoctorCard';
import BannerButton from '../../components/button/BannerButton';
import { SearchBanner } from '../../constants/Demo';
import HeaderText from './components/HeaderText';
import ShowAllButton from './components/ShowAllButton';
import { SearchSpecialties, SearchSymptoms } from '../../constants/helper';
import FilterButton from './components/FilterButton';
import { COLOR } from '../../constants/Colors';

const FindDoctorsScreen = (props) => {

    const {
        navigation,

        search,
        doctorData,
        loading,

        onDoctorFind,
        onDoctorPress,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <View style={styles.HeaderContainer}>
                <Text style={styles.TitleText}>Find Doctors</Text>
                <SearchView value={search} onChangeText={onDoctorFind} />
            </View>

            {
                search.length == 0 &&
                <View style={styles.ContentContainer}>
                    <HeaderText>Search By Speciality</HeaderText>

                    <View style={styles.FiltersContainer}>
                        {
                            SearchSpecialties.map((data, i) =>
                                <FilterButton
                                    key={i}
                                    icon={data?.icon}
                                    color={COLOR.BLUE}
                                    onPres={onDoctorFind}
                                >
                                    {data?.name}
                                </FilterButton>
                            )
                        }
                    </View>

                    <ShowAllButton>
                        Doctor's Types
                    </ShowAllButton>

                    <HeaderText>Search by Symptoms</HeaderText>

                    <View style={styles.FiltersContainer}>
                        {
                            SearchSymptoms.map((data, i) =>
                                <FilterButton
                                    key={i}
                                    icon={data?.icon}
                                    color={COLOR.ORANGE}
                                >
                                    {data?.name}
                                </FilterButton>
                            )
                        }
                    </View>

                    <ShowAllButton>
                        Symptoms
                    </ShowAllButton>

                    <BannerButton
                        doctorImg={SearchBanner.img}
                        title={SearchBanner.title}
                        buttonText={SearchBanner.buttonText}
                        gradient={SearchBanner.gradient}
                    />
                </View>
            }

            {
                search.length > 0 &&
                <>
                    {
                        loading ?
                            <View style={styles.ListContainer}>
                                <ActivityIndicator color={COLOR.PRIMARYCOLOR} style={styles.EmptyText} />
                            </View>
                            :
                            <FlatList
                                data={doctorData}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => <DoctorCard data={item} onPress={onDoctorPress} />}
                                style={styles.ListContainer}
                                contentContainerStyle={styles.ListContentContainer}
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={
                                    <Text style={styles.EmptyText}>
                                        Doctors not found
                                    </Text>
                                }
                            />
                    }
                </>
            }
        </View>
    )
}

export default FindDoctorsScreen