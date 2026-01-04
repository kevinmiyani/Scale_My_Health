import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'

const ReviewCard = ({
    data,
}) => {
    return (
        <View style={styles.Container}>
            <View style={styles.HeaderContainer}>
                <Image
                    style={styles.IconStyle}
                    source={require('../../../assets/icons/star.png')}
                    resizeMode='contain'
                />
                <Text style={styles.RatingText}>{data?.Rating}</Text>
                <Text style={styles.TimeText}>{data?.days} days ago</Text>
            </View>
            <Text style={styles.ReviewText}>{data?.Review}</Text>
            <Text style={styles.ReviewByText}>- {data?.Reviewby}</Text>
            <View style={styles.FooterLine} />
        </View>
    )
}

export default memo(ReviewCard)

const styles = StyleSheet.create({
    Container: {
        marginTop: ResponsiveSizeWp(25),
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(7),
    },
    IconStyle: {
        tintColor: COLOR.BLUE,
        width: ResponsiveSizeWp(15),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
    },
    RatingText: {
        fontSize: ResponsiveSizeWp(14),
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
    },
    TimeText: {
        flex: 1,
        textAlign: 'right',
        fontSize: ResponsiveSizeWp(11),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK_50,
    },
    ReviewText: {
        fontSize: ResponsiveSizeWp(12),
        fontFamily: FontFamily.Italic,
        color: COLOR.BLACK,
        marginVertical: ResponsiveSizeWp(10),
    },
    ReviewByText: {
        fontSize: ResponsiveSizeWp(14),
        fontFamily: FontFamily.SemiBoldItalic,
        color: COLOR.BLACK,
    },
    FooterLine: {
        width: '100%',
        borderRadius: ResponsiveSizeWp(10),
        height: ResponsiveSizeWp(2),
        backgroundColor: COLOR.LIGHTGRAY,
        marginTop: ResponsiveSizeWp(15),
    }
})