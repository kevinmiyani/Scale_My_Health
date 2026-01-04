import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { COLOR, } from '../../../constants/Colors'
import { addDays, eachDayOfInterval, format, } from 'date-fns'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import { FontFamily } from '../../../constants/Fonts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DateController = ({
    value,
    onChange,
}) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const dates = eachDayOfInterval(
        {
            start: new Date(),
            end: addDays(new Date(), 4)
        },
        {
            weekStartsOn: 1,
        }
    );

    const oldDate = value && new Date(value);
    const defaultDate = oldDate ?? dates[0];

    const [day, setDay] = useState(defaultDate.getDate());
    const [month, setMonth] = useState(defaultDate.getMonth());

    return (
        <View style={styles.Container}>

            <View style={styles.HeaderContainer}>
                <Text style={styles.TitleText}>Select Date</Text>
                <Text style={styles.MonthYearText}>{months[month]}</Text>
            </View>

            <View style={styles.ContentContainer}>
                <MaterialIcons
                    name='arrow-back-ios'
                    color={COLOR.BLACK}
                    size={ResponsiveSizeWp(20)}
                />
                <ScrollView
                    horizontal
                    style={{ flex: 1, marginHorizontal: ResponsiveSizeWp(5), }}
                    contentContainerStyle={{
                        paddingVertical: ResponsiveSizeWp(5),
                        paddingHorizontal: -ResponsiveSizeWp(5),
                    }}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                >
                    {
                        dates.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        borderRadius: ResponsiveSizeWp(15),
                                        height: ResponsiveSizeWp(70),
                                        aspectRatio: 1 / 1,
                                        alignItems: 'center',
                                        marginHorizontal: ResponsiveSizeWp(5),
                                        backgroundColor: day === item.getDate() ? COLOR.PRIMARYCOLOR : COLOR.LIGHTGRAY,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    key={i}
                                    activeOpacity={1}
                                    onPress={() => {
                                        setDay(item.getDate())
                                        setMonth(item.getMonth());
                                        onChange(format(new Date(item), 'yyyy-MM-dd'));
                                    }}
                                >
                                    <Text style={{
                                        fontSize: ResponsiveSizeWp(15),
                                        color: day === item.getDate() ? COLOR.WHITE : COLOR.GRAY,
                                        fontFamily: FontFamily.SemiBold,
                                        top: Platform.OS == 'android' ? ResponsiveSizeWp(8) : 0,
                                    }}>
                                        {days[item.getDay()].toUpperCase()}
                                    </Text>
                                    <Text style={{
                                        fontSize: ResponsiveSizeWp(24),
                                        color: day === item.getDate() ? COLOR.WHITE : COLOR.GRAY,
                                        fontFamily: FontFamily.Medium,
                                    }}>
                                        {item.getDate()}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <MaterialIcons
                    name='arrow-forward-ios'
                    color={COLOR.BLACK}
                    size={ResponsiveSizeWp(20)}
                />
            </View>
        </View>
    )
}

export default memo(DateController)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
    },
    ContentContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    TitleText: {
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: ResponsiveSizeWp(15),
        marginBottom: ResponsiveSizeWp(20),
    },
    MonthYearText: {
        color: COLOR.BLUE,
        fontSize: ResponsiveSizeWp(14),
        fontFamily: FontFamily.Regular,
    },
})