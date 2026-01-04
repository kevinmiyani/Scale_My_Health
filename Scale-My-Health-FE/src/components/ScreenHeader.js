import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../constants/Colors'
import { ResponsiveSizeWp } from '../constants/Responsive'
import { FontFamily } from '../constants/Fonts'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScreenHeader = ({
    title,
    subTitle,
    navigation,
    children,
    rightButton,
}) => {
    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <View style={[styles.HeaderContainer]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons
                        size={ResponsiveSizeWp(30)}
                        color={COLOR.WHITE}
                        name={'arrow-back'}
                    />
                </TouchableOpacity>
                <View style={styles.TitleContainer}>
                    <Text style={styles.HeaderText} numberOfLines={1}>
                        {title}
                    </Text>
                    {
                        subTitle &&
                        <Text style={styles.SubTitleText} numberOfLines={1}>
                            {subTitle}
                        </Text>
                    }
                </View>
                {rightButton}
            </View>
            {children}
        </View>
    )
}

export default memo(ScreenHeader)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    HeaderContainer: {
        backgroundColor: COLOR.PRIMARYCOLOR,
        width: '100%',
        paddingTop: Platform.OS == 'android' ? ResponsiveSizeWp(55) : ResponsiveSizeWp(65),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ResponsiveSizeWp(15),
        paddingBottom: ResponsiveSizeWp(20),
    },
    TitleContainer: {
        flex: 1,
        marginLeft: ResponsiveSizeWp(10),
    },
    HeaderText: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.WHITE,
    },
    SubTitleText: {
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(15),
        color: COLOR.WHITE,
    },
})