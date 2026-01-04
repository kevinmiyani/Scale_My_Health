import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { FontFamily } from '../../../constants/Fonts'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import ProfileImage from '../../../components/ProfileImage'

const DoctorCard = ({
    data,
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={() => { onPress(data) }}
            style={styles.Container}
            activeOpacity={1}
        >
            <ProfileImage
                img={data?.image}
                initial={`${data?.firstName && data?.firstName[0]}${data?.lastName && data?.lastName[0]}`}
                style={{ width: ResponsiveSizeWp(60) }}
                initialSize={20}
            />
            <View style={{ flex: 1, }}>
                <Text style={styles.DoctorName} numberOfLines={1}>{`Dr ${data?.firstName} ${data?.lastName}`}</Text>
                <Text style={styles.SpecialityText} numberOfLines={3}>{data?.designation}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default memo(DoctorCard)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(1),
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        padding: ResponsiveSizeWp(12),
        borderRadius: ResponsiveSizeWp(12),
        borderColor: COLOR.LIGHTGRAY,
        marginBottom: ResponsiveSizeWp(15),
        gap: ResponsiveSizeWp(20),
    },
    DoctorName: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
        color: COLOR.BLACK,
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
    SpecialityText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(11),
        color: COLOR.GRAY,
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
})