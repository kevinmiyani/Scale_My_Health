import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ResponsiveSizeWp, screenWidth } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import RenderHTML from 'react-native-render-html';
import { systemFonts, tagsStyles } from '../../utils/html-render-helper';

const LabPrescription = ({
    data,
    rightButton,
}) => {
    return (
        <View style={styles.Container}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Title} numberOfLines={1}>{data?.title}</Text>
                {rightButton}
            </View>
            {
                data?.content &&
                <RenderHTML
                    contentWidth={screenWidth}
                    source={{ html: data?.content }}
                    systemFonts={systemFonts}
                    tagsStyles={tagsStyles}
                />
            }
        </View>
    );
};

export default memo(LabPrescription);

const styles = StyleSheet.create({
    Container: { width: '100%' },
    TitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: ResponsiveSizeWp(10),
    },
    Title: {
        flex: 1,
        fontSize: ResponsiveSizeWp(18),
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