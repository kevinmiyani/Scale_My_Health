import { ActivityIndicator, Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { ErrorToast } from '../../../constants/ToastMessage';

const width = Dimensions.get('window').width - ResponsiveSizeWp(60);

const TimeController = ({
    time,
    onSelectTime = () => { },
    loading,
    timeSlot = [],
    oldTime,
}) => {
    return (
        <View style={styles.Container}>

            <Text style={styles.TitleText}>Available Time Slots</Text>

            {
                loading ?
                    <ActivityIndicator color={COLOR.PRIMARYCOLOR} style={styles.ActivityIndicator} />
                    :
                    <FlatList
                        data={timeSlot}
                        renderItem={
                            ({ item }) =>
                                <View style={styles.ItemMainContainer}>
                                    <View style={[
                                        styles.ItemBorderStyle,
                                        item.isBooked && oldTime != item.time ? { backgroundColor: COLOR.ORANGE_10, borderColor: COLOR.ORANGE } : time == item.time && { backgroundColor: COLOR.PRIMARYCOLOR },
                                    ]}>
                                        <TouchableOpacity
                                            style={styles.ItemButtonStyle}
                                            onPress={() => {
                                                if (item.isBooked && oldTime != item.time) {
                                                    ErrorToast(item.time, 'This time slot is booked.')
                                                } else {
                                                    onSelectTime(item.time);
                                                }
                                            }}
                                            activeOpacity={1}
                                        >
                                            <Text style={[styles.ButtonText, item.isBooked && oldTime != item.time ? { color: COLOR.ORANGE } : time == item.time && { color: COLOR.WHITE }]}>
                                                {item.time}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                        scrollEnabled={false}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        style={{ marginTop: ResponsiveSizeWp(10), }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Text style={styles.EmptyText}>Time slot not available</Text>}
                    />
            }

        </View>
    )
}

export default memo(TimeController)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        padding: ResponsiveSizeWp(15),
        marginTop: ResponsiveSizeWp(5),
    },
    TitleText: {
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
    },
    SubContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ItemMainContainer: {
        width: width / 2,
        padding: ResponsiveSizeWp(5),
    },
    ItemBorderStyle: {
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.PRIMARYCOLOR,
        backgroundColor: COLOR.PRIMARYCOLOR_10,
        borderRadius: ResponsiveSizeWp(10),
    },
    ItemButtonStyle: {
        width: '100%',
        alignItems: 'center',
        padding: ResponsiveSizeWp(7),
    },
    ButtonText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(11),
        top: Platform.OS == 'android' && ResponsiveSizeWp(1.1),
    },
    EmptyText: {
        color: COLOR.LIGHTGRAYBORDER,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(15),
        alignSelf: 'center',
    },
    ActivityIndicator: {
        marginTop: ResponsiveSizeWp(15),
    },
})