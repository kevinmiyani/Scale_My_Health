import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';

const DietaryInstructions = ({
    data
}) => {
    return (
        <View style={styles.Container}>
            <Text style={styles.Title}>Dietary Instructions</Text>
            {
                data?.map((item, index) => (
                    <View key={index} style={styles.ItemContainer}>
                        <View style={styles.Bullet} />
                        <Text style={styles.Item}>{item}</Text>
                    </View>
                ))
            }
        </View>
    );
};

export default memo(DietaryInstructions);

const styles = StyleSheet.create({
    Container: {
        borderRadius: ResponsiveSizeWp(15),
        padding: ResponsiveSizeWp(15),
        marginTop: ResponsiveSizeWp(20),
        backgroundColor: COLOR.LIGHTGRAY,
        borderWidth: ResponsiveSizeWp(1),
        borderColor: '#E8E6E6',
    },
    Title: {
        fontSize: ResponsiveSizeWp(15),
        fontFamily: FontFamily.SemiBold,
        marginBottom: ResponsiveSizeWp(5),
        color: COLOR.BLACK,
    },
    ItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: ResponsiveSizeWp(4),
        gap: ResponsiveSizeWp(7),
    },
    Bullet: {
        width: ResponsiveSizeWp(6),
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(7),
        backgroundColor: COLOR.BLACK,
        top: ResponsiveSizeWp(5),
    },
    Item: {
        fontSize: ResponsiveSizeWp(11),
        color: COLOR.BLACK,
        flex: 1,
        fontFamily: FontFamily.Medium,
    },
});