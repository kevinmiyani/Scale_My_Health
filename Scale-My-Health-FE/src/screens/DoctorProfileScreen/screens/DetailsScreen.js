import { StyleSheet, View } from 'react-native'
import React, { memo, } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { COLOR } from '../../../constants/Colors';
import Details from '../components/details/Details';
import EditDetails from '../components/details/EditDetails';

const DetailsScreen = ({
    width,
    editMode,
    onDismiss = () => { },
}) => {

    return (
        <View style={[styles.Container, width && { width: width }]}>
            {editMode ? <EditDetails onDismiss={onDismiss} /> : <Details />}
        </View>
    )
}

export default memo(DetailsScreen)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
    },
    ContentContainer: {
        width: '100%',
        gap: ResponsiveSizeWp(10),
        paddingVertical: ResponsiveSizeWp(10),
    },
})