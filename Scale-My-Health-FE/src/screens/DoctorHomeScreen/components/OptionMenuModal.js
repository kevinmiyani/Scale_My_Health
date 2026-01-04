import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur';
import { ResponsiveSizeWp } from '../../../constants/Responsive';
import { COLOR } from '../../../constants/Colors';
import { elevation_5 } from '../../../constants/styles';

const OptionMenuModal = ({
    modalVisible,
    setModalVisible,
    children,
}) => {
    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>

                <TouchableOpacity
                    style={[{ height: '100%', width: '100%', }]}
                    onPress={() => { setModalVisible(false) }}
                    activeOpacity={1}
                >

                </TouchableOpacity>

                <View style={[styles.Container, elevation_5]}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default OptionMenuModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    Container: {
        borderTopLeftRadius: ResponsiveSizeWp(30),
        borderTopRightRadius: ResponsiveSizeWp(30),
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        paddingBottom: ResponsiveSizeWp(30),
        paddingTop: ResponsiveSizeWp(30),
        backgroundColor: COLOR.WHITE,
        gap: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(30),
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        minHeight: '30%',
        maxHeight: '75%',
        overflow: 'hidden',
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -10,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLOR.BLACK_40,
    },
})
