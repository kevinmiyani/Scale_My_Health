import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import HeaderText from './HeaderText'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import Entypo from 'react-native-vector-icons/Entypo';
import { ErrorToast } from '../../../constants/ToastMessage'

const AddDietaryInstruction = ({
    onCancelPress = () => { },
    onAddPress = () => { },
}) => {

    const [diet, setDiet] = useState('');

    return (
        <View style={styles.Container}>
            <HeaderText onCancelPress={onCancelPress}>
                Add Dietary Instruction
            </HeaderText>

            <View style={styles.ContentContainer}>
                <TextInput
                    value={diet}
                    onChangeText={setDiet}
                    style={styles.TextInput}
                    placeholder={'Write here'}
                    placeholderTextColor={COLOR.BLACK_40}
                    numberOfLines={1}
                    keyboardType='default'
                />
                <TouchableOpacity
                    style={styles.AddButton}
                    onPress={() => {
                        if (!diet) {
                            ErrorToast('', 'Enter Dietary Instruction')
                            return;
                        }
                        onAddPress(diet);
                        setDiet('');
                    }}
                >
                    <Entypo
                        size={ResponsiveSizeWp(25)}
                        color={COLOR.WHITE}
                        name={'plus'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(AddDietaryInstruction)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginTop: ResponsiveSizeWp(20),
        backgroundColor: COLOR.LIGHTGRAY,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(20),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        gap: ResponsiveSizeWp(10),
    },
    ContentContainer: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
    },
    TextInput: {
        flex: 1,
        height: ResponsiveSizeWp(45),
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(15),
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
    },
    AddButton: {
        height: ResponsiveSizeWp(45),
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.PRIMARYCOLOR,
        borderRadius: ResponsiveSizeWp(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(2),
        borderColor: COLOR.WHITE,
    },
})