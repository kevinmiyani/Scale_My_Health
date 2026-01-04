import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message'
import { FontFamily } from '../constants/Fonts';
import { COLOR } from '../constants/Colors';

const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            text1Style={{
                fontSize: 14,
                fontFamily: FontFamily.SemiBold,
                color: COLOR.BLACK,
                fontWeight: '500',
            }}
            text2Style={{
                fontSize: 12,
                fontFamily: FontFamily.Regular,
                color: COLOR.GRAY,
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red' }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            text1Style={{
                fontSize: 14,
                fontFamily: FontFamily.SemiBold,
                color: 'red',
                fontWeight: '500',
            }}
            text2Style={{
                fontSize: 12,
                fontFamily: FontFamily.Regular,
                color: COLOR.GRAY,
            }}
        />
    ),
    info: (props) => (
        <InfoToast
            {...props}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            text1Style={{
                fontSize: 14,
                fontFamily: FontFamily.SemiBold,
                color: COLOR.BLACK,
                fontWeight: '500',
            }}
            text2Style={{
                fontSize: 12,
                fontFamily: FontFamily.Regular,
                color: COLOR.GRAY,
            }}
        />
    ),
};

const ToastConfig = () => {
    return (
        <Toast config={toastConfig} />
    )
}

export default ToastConfig

const styles = StyleSheet.create({})