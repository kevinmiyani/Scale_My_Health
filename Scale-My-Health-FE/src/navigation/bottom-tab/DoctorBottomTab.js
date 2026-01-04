import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'
import { NavigationScreens } from '../helper'

const screens = [
    {
        title: 'My Appointments',
        screen: '',
        icon: require('../../assets/icons/calendar-days.png'),
    },
    {
        title: 'My Patients',
        screen: NavigationScreens.MyPatientsScreen,
        icon: require('../../assets/icons/patients-icon.png'),
    },
    {
        title: 'My Cases',
        screen: NavigationScreens.MyCasesScreen,
        icon: require('../../assets/icons/cases-icon.png'),
    },
]

const DoctorBottomTab = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.Container}>
            {
                screens.map((screen, i) => {
                    const selected = i == 0;
                    return (
                        <TouchableOpacity
                            key={i}
                            style={[styles.TabButton, selected && {
                                backgroundColor: COLOR.PRIMARYCOLOR,
                            }]}
                            activeOpacity={1}
                            onPress={() => { screen?.screen != '' && navigation.navigate(screen.screen) }}
                        >
                            <Image
                                source={screen.icon}
                                style={[styles.TabIcon, selected && {
                                    tintColor: COLOR.WHITE,
                                    transform: [{ scale: 1.3 }]
                                }]}
                                resizeMode='contain'
                            />
                            <Text
                                style={[styles.TabText, selected && {
                                    color: COLOR.WHITE,
                                }]}
                            >
                                {screen.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default memo(DoctorBottomTab)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        backgroundColor: COLOR.LIGHTGRAYBORDER,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        gap: ResponsiveSizeWp(1),
        zIndex: 10,
    },
    TabButton: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ResponsiveSizeWp(20),
    },
    TabIcon: {
        tintColor: COLOR.BLACK,
        height: ResponsiveSizeWp(25),
        aspectRatio: 2 / 1,
    },
    TabText: {
        marginTop: ResponsiveSizeWp(10),
        fontSize: ResponsiveSizeWp(11.5),
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
    },
})