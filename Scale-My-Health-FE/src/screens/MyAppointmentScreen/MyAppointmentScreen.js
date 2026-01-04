import React from 'react'
import useScreenHooks from './MyAppointmentScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { FlatList } from 'react-native';
import AppointmentCard from '../../components/AppointmentCard';
import { styles } from './styles';
import Empty from '../../components/Empty';

const MyAppointmentScreen = (props) => {

    const {
        navigation,
        appointments,
        loading,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            title={'My Appointments'}
            navigation={navigation}
        >
            {
                appointments?.length > 0 ?
                    <FlatList
                        data={appointments}
                        renderItem={
                            ({ item }) =>
                                <AppointmentCard
                                    data={item}
                                />
                        }
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={styles.ContentContainer}
                    />
                    :
                    <Empty title={`You don't have any appointment`} isLoading={loading} />
            }
        </ScreenHeader>
    )
}

export default MyAppointmentScreen