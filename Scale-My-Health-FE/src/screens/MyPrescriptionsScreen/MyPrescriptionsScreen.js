import React from 'react'
import useScreenHooks from './MyPrescriptionsScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { FlatList } from 'react-native';
import { styles } from './styles';
import Empty from '../../components/Empty';
import PrescriptionCard from '../../components/prescription/PrescriptionCard';
import { NavigationScreens, navigationToNavigate } from '../../navigation/helper';

const MyPrescriptionsScreen = (props) => {

    const {
        navigation,
        prescriptions,
        isLoading,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            title={'My Prescriptions'}
            navigation={navigation}
        >
            {
                prescriptions?.length > 0 ?
                    <FlatList
                        data={prescriptions}
                        renderItem={
                            ({ item }) =>
                                <PrescriptionCard
                                    data={item}
                                    onPress={() => { navigationToNavigate(navigation, NavigationScreens.PrescriptionScreen, { data: item }) }}
                                />
                        }
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={styles.ContentContainer}
                    />
                    :
                    <Empty title={`You don't have any prescription`} isLoading={isLoading} />
            }
        </ScreenHeader>
    )
}

export default MyPrescriptionsScreen