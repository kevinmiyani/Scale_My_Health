import { Text, Modal, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { elevation_5 } from '../../constants/styles';

const ConfirmationModal = ({
    title,
    desc,
    modalVisible = false,
    setModalVisible = () => { },
    onYesPress = () => { },
}) => {

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={[styles.Container, elevation_5]}>
                    <Text style={styles.TitleText}>
                        {title}
                    </Text>

                    <Text style={styles.DescText}>
                        {desc}
                    </Text>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.ButtonText}>
                                No
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={onYesPress}
                        >
                            <Text style={[styles.ButtonText, { color: COLOR.BLUE }]}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(30),
    },
    Container: {
        borderRadius: ResponsiveSizeWp(20),
        width: '100%',
        paddingTop: ResponsiveSizeWp(25),
        paddingHorizontal: ResponsiveSizeWp(25),
        paddingBottom: ResponsiveSizeWp(15),
        backgroundColor: COLOR.WHITE,
    },
    TitleText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
    },
    DescText: {
        marginVertical: ResponsiveSizeWp(10),
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(16),
        color: COLOR.BLACK,
    },
    ButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Button: {
        padding: ResponsiveSizeWp(10),
        marginLeft: ResponsiveSizeWp(10),
    },
    ButtonText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.ORANGE,
    },
})