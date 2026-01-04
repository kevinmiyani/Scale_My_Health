import { StyleSheet, TextInput, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { elevation_5 } from '../../constants/styles';
import { allContries, DefaultCountryForPhone, includeContries } from '../../utils/helper';
import CountryPicker from 'react-native-country-picker-modal'

const AuthTextInput = ({
    value,
    onChangeText,
    keyboardType,
    placeholder,
    maxLength,
    editable = true,
    isMobileField,
    style,
    inputStyle,
    defaultCounryCode = DefaultCountryForPhone,
    onCountryCodeSelect = () => { },
}) => {
    return (
        <View style={[styles.Container, elevation_5, style && style]}>
            {
                isMobileField &&
                <View style={styles.TextContainer}>
                    <CountryPicker
                        onSelect={onCountryCodeSelect}
                        excludeCountries={allContries.filter(country => !includeContries.includes(country))}
                        countryCode={defaultCounryCode.code}
                        withFilter
                        withCallingCodeButton
                        withModal
                        withCallingCode
                        withFlagButton={false}
                        containerButtonStyle={styles.CountryCodeStyle}
                        theme={{
                            primaryColor: COLOR.GRAY,
                            primaryColorVariant: COLOR.LIGHTGRAYBORDER,
                            fontFamily: FontFamily.Medium,
                            color: COLOR.BLACK,
                            fontSize: ResponsiveSizeWp(16),
                        }}
                        filterProps={{
                            cursorColor: COLOR.PRIMARYCOLOR,
                            selectionColor: COLOR.PRIMARYCOLOR_10,
                            fontFamily: FontFamily.Medium,
                            color: COLOR.BLACK,
                            fontSize: ResponsiveSizeWp(16),
                        }}
                    />
                </View>
            }
            <TextInput
                style={[styles.InputTextStyle, inputStyle && inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={COLOR.BLACK_40}
                numberOfLines={1}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                editable={editable}
                blurOnSubmit
            />
        </View>
    )
}

export default memo(AuthTextInput)

const styles = StyleSheet.create({
    Container: {
        borderRadius: ResponsiveSizeWp(50),
        height: ResponsiveSizeWp(50),
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: COLOR.WHITE,
        width: '100%',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
    },
    InputTextStyle: {
        flex: 1,
        fontSize: ResponsiveSizeWp(16),
        height: '100%',
        paddingHorizontal: ResponsiveSizeWp(17),
        color: COLOR.BLACK,
        borderRadius: ResponsiveSizeWp(7),
        fontFamily: FontFamily.Regular,
    },
    TextContainer: {
        height: '100%',

        borderRightWidth: ResponsiveSizeWp(1),
        borderRightColor: COLOR.LIGHTGRAYBORDER,
    },
    CountryCodeStyle: {
        width: '100%',
        height: '100%',
        minWidth: ResponsiveSizeWp(50),
        paddingHorizontal: ResponsiveSizeWp(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
})