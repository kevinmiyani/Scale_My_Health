import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'
import { COLOR } from '../../../../constants/Colors'
import { FontFamily } from '../../../../constants/Fonts'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { reducers } from '../../../../redux/helper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Details = () => {
    const data = useSelector(state => state[reducers.UserDataReducer]);
    return (
        <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={styles.ContentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={[styles.ProfileContainer, styles.DetailContainer]}>
                <FastImage
                    source={{ uri: data?.image }}
                    style={styles.ProfileImage}
                    resizeMode='cover'
                />

                <View style={styles.ProfileTextContainer}>
                    <Text style={styles.NameText} numberOfLines={2}>{`Dr ${data?.firstName ? data?.firstName : ''} ${data?.lastName ? data?.lastName : ''}`}</Text>
                    {data?.designation && <Text style={styles.DesignationText} numberOfLines={3}>{data?.designation}</Text>}
                </View>
            </View>

            <View style={[styles.DetailContainer]}>
                <Text style={styles.TitleText} numberOfLines={1}>Contact Information</Text>
                {
                    data?.mobileNo &&
                    <View style={styles.ContactInfoContainer}>
                        <MaterialIcons
                            name={'call'}
                            size={ResponsiveSizeWp(22)}
                            color={COLOR.PRIMARYCOLOR}
                        />
                        <Text style={styles.ContactText} numberOfLines={1}>+91 {data?.mobileNo?.slice(0, 5) + ' ' + data?.mobileNo?.slice(5)}</Text>
                    </View>
                }

                {
                    data?.email &&
                    < View style={styles.ContactInfoContainer}>
                        <MaterialIcons
                            name={'email'}
                            size={ResponsiveSizeWp(22)}
                            color={COLOR.PRIMARYCOLOR}
                        />
                        <Text style={styles.ContactText} numberOfLines={2}>{data?.email}</Text>
                    </View>
                }
            </View>

            <View style={[styles.DetailContainer]}>
                {
                    data?.intro &&
                    <>
                        <Text style={styles.TitleText} numberOfLines={1}>About Me</Text>
                        <Text style={styles.DescText}>{data?.intro}</Text>
                    </>
                }
                {
                    data?.longDesignation &&
                    <>
                        <Text style={styles.TitleText} numberOfLines={1}>Designation</Text>
                        <Text style={styles.DescText}>{data?.longDesignation}</Text>
                    </>
                }

                {
                    data?.speciality?.split(',')?.length > 0 &&
                    <>
                        <Text style={styles.TitleText} numberOfLines={1}>Specializations</Text>
                        <View style={styles.SpecializationContainer}>
                            {data?.speciality?.split(',').map((text, i) => text.trim() && <View style={styles.SpecializationBg} key={i}><Text style={styles.SpecializationText} numberOfLines={1}>{text?.trim()}</Text></View>)}
                        </View>
                    </>
                }
            </View>

            <View style={[styles.DetailContainer]}>
                <Text style={styles.TitleText} numberOfLines={1}>Consultation Details</Text>
                {
                    data?.consultationCharge &&
                    <View style={styles.ContactInfoContainer}>
                        <FontAwesome6
                            name={'money-bill'}
                            size={ResponsiveSizeWp(20)}
                            color={COLOR.PRIMARYCOLOR}
                        />
                        <Text style={styles.ContactText} numberOfLines={1}>Consultation Fee</Text>
                        <Text style={styles.ValueText} numberOfLines={1}>₹{data?.consultationCharge}</Text>
                    </View>
                }

                {
                    data?.averageConsultationTime &&
                    <View style={styles.ContactInfoContainer}>
                        <MaterialCommunityIcons
                            name={'clock'}
                            size={ResponsiveSizeWp(23)}
                            color={COLOR.PRIMARYCOLOR}
                        />
                        <Text style={styles.ContactText} numberOfLines={1}>Average Duration</Text>
                        <Text style={styles.ValueText} numberOfLines={1}>{data?.averageConsultationTime} mins</Text>
                    </View>
                }
            </View>
        </ScrollView>
    )
}

export default memo(Details)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
    },
    ContentContainer: {
        width: '100%',
        gap: ResponsiveSizeWp(10),
        paddingVertical: ResponsiveSizeWp(10),
    },
    DetailContainer: {
        padding: ResponsiveSizeWp(15),
        gap: ResponsiveSizeWp(10),
        width: '100%',
        backgroundColor: COLOR.WHITE,
    },
    ProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveSizeWp(15),
    },
    ProfileImage: {
        width: ResponsiveSizeWp(100),
        aspectRatio: 1 / 1,
        resizeMode: 'cover',
        borderRadius: ResponsiveSizeWp(100),
    },
    ProfileTextContainer: {
        flex: 1,
        top: Platform.OS == 'android' && ResponsiveSizeWp(3),
    },
    NameText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(17),
    },
    DesignationText: {
        color: COLOR.BLACK_50,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(13),
    },
    TitleText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(18),
    },
    ContactInfoContainer: {
        gap: ResponsiveSizeWp(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    ContactText: {
        flex: 1,
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(15),
        top: Platform.OS == 'android' && ResponsiveSizeWp(1),
    },
    ValueText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(15),
        top: Platform.OS == 'android' && ResponsiveSizeWp(1),
        textAlign: 'right',
    },
    DescText: {
        color: COLOR.BLACK_50,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(13),
        lineHeight: ResponsiveSizeWp(22),
    },
    SpecializationContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: ResponsiveSizeWp(10),
    },
    SpecializationBg: {
        backgroundColor: COLOR.LIGHTBLUE2,
        borderRadius: ResponsiveSizeWp(20),
        paddingHorizontal: ResponsiveSizeWp(15),
        paddingVertical: ResponsiveSizeWp(5),
    },
    SpecializationText: {
        color: COLOR.BLUE2,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(14),
    },
})