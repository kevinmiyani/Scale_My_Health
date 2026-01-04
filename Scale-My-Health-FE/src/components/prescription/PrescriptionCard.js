import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { elevation_2 } from '../../constants/styles'
import LinearGradient from 'react-native-linear-gradient'
import { FontFamily } from '../../constants/Fonts'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileImage from '../ProfileImage'
import { format } from 'date-fns'

const PrescriptionCard = ({
    data,
    onPress = () => { },
}) => {
    const doctor = data?.doctor;
    return (
        <TouchableOpacity
            style={styles.ViewWrapper}
            activeOpacity={1}
            onPress={onPress}
        >
            <View style={[styles.Container, elevation_2]}>
                <LinearGradient
                    colors={GRADIENTCOLOR.LIGHTBLUE2}
                    style={styles.GradientContainer}
                >
                    <ProfileImage
                        img={doctor?.image}
                        initial={`${doctor?.firstName && doctor?.firstName[0]}${doctor?.lastName && doctor?.lastName[0]}`}
                        initialColor={COLOR.PRIMARYCOLOR}
                        gradientColor={GRADIENTCOLOR.WHITE_30_TO_40}
                        style={{ width: ResponsiveSizeWp(70) }}
                    />
                    <View style={styles.DetailsContainer}>
                        <Text style={styles.IDText} numberOfLines={1}>{data?._id}</Text>
                        <Text style={styles.NameText} numberOfLines={1}>{`Dr ${doctor?.firstName} ${doctor?.lastName}`}</Text>
                        <Text style={[styles.SpecialityText]} numberOfLines={3}>{doctor?.designation}</Text>
                    </View>
                </LinearGradient>

                <View style={styles.TimeContainer}>
                    <AntDesign name="clockcircleo" size={ResponsiveSizeWp(18)} color={COLOR.BLACK} />
                    <Text style={styles.FooterText}>{data?.updatedAt && `Written on ${format(new Date(data?.updatedAt), 'dd MMM yyyy').toString()}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default memo(PrescriptionCard)

const styles = StyleSheet.create({
    ViewWrapper: {
        width: '100%',
        marginTop: ResponsiveSizeWp(20),
        alignItems: 'center',
    },
    Container: {
        width: '100%',
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(20),
    },
    GradientContainer: {
        padding: ResponsiveSizeWp(25),
        borderTopRightRadius: ResponsiveSizeWp(20),
        borderTopLeftRadius: ResponsiveSizeWp(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: ResponsiveSizeWp(15),
        flex: 1,
    },
    DetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    IDText: {
        textAlign: 'right',
        color: COLOR.WHITE,
        fontFamily: FontFamily.Bold,
        fontSize: ResponsiveSizeWp(14),
    },
    NameText: {
        textAlign: 'right',
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(16),
    },
    SpecialityText: {
        textAlign: 'right',
        color: COLOR.WHITE,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(11),
        maxWidth: '85%',
    },
    TimeContainer: {
        paddingVertical: ResponsiveSizeWp(15),
        paddingHorizontal: ResponsiveSizeWp(20),
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
        width: '100%',
        alignItems: 'center',
    },
    FooterText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(12),
        fontFamily: FontFamily.Medium,
        textAlign: 'right',
    },
})