import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { PillIcon } from '../../constants/Assets';
import { COLOR, MedicineInfoColor } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';

const MedicineCard = ({
    data
}) => {
    return (
        <View style={styles.Container}>
            <View style={styles.IconContainer}>
                <Image
                    style={styles.Icon}
                    source={PillIcon}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.DetailsContainer}>
                <Text style={styles.Name} numberOfLines={2}>{data?.name}</Text>
                {data?.dosage && <Text style={styles.Dosage} numberOfLines={1}>{data?.dosage}</Text>}
                <View style={styles.InfoRow}>
                    <Text style={[styles.InfoTag, MedicineInfoColor.frequency]} numberOfLines={1}>{data?.frequency || '-'}</Text>
                    <Text style={[styles.InfoTag, MedicineInfoColor.duration]} numberOfLines={1}>{data?.duration || '-'}</Text>
                    <Text style={[styles.InfoTag, MedicineInfoColor.time]} numberOfLines={1}>{data?.time || '-'}</Text>
                </View>
            </View>
        </View>
    );
};

export default memo(MedicineCard);

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(50, 165, 255, 0.1)',
        borderRadius: ResponsiveSizeWp(15),
        padding: ResponsiveSizeWp(15),
        marginTop: ResponsiveSizeWp(20),
        gap: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: 'rgba(50, 165, 255, 0.25)',
    },
    IconContainer: {
        backgroundColor: COLOR.BLUE,
        borderRadius: ResponsiveSizeWp(25),
        width: ResponsiveSizeWp(45),
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon: {
        height: ResponsiveSizeWp(20),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
    },
    DetailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    Name: {
        fontSize: ResponsiveSizeWp(17),
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
    },
    Dosage: {
        fontSize: ResponsiveSizeWp(14),
        color: COLOR.BLACK_40,
        marginTop: ResponsiveSizeWp(5),
        fontFamily: FontFamily.Medium,
    },
    InfoRow: {
        flexDirection: 'row',
        marginTop: ResponsiveSizeWp(10),
        gap: ResponsiveSizeWp(5),
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    InfoTag: {
        fontSize: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(7),
        paddingVertical: ResponsiveSizeWp(3),
        paddingHorizontal: ResponsiveSizeWp(10),
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: FontFamily.Medium,
    },
});