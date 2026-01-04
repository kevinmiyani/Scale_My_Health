import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import { ResponsiveSizeWp } from '../../../constants/Responsive'
import HeaderText from './HeaderText'
import { COLOR } from '../../../constants/Colors'
import { FontFamily } from '../../../constants/Fonts'
import { ErrorToast } from '../../../constants/ToastMessage'
import {
    actions,
    RichEditor,
    RichToolbar,
} from "react-native-pell-rich-editor";

const AddLabPrescription = ({
    defaultData,
    title,
    onCancelPress = () => { },
    onAddPress = () => { },
}) => {

    const RichText = useRef();
    const [data, setData] = useState(defaultData ?? '');

    return (
        <View style={styles.Container}>
            <HeaderText onCancelPress={onCancelPress}>
                Add {title}
            </HeaderText>

            <RichEditor
                disabled={false}
                initialContentHTML={defaultData}
                containerStyle={styles.editor}
                ref={RichText}
                style={styles.rich}
                placeholder={`Write ${title}`}
                onChange={(text) => setData(text)}
            />

            <RichToolbar
                style={[styles.richBar]}
                editor={RichText}
                disabled={false}
                iconTint={COLOR.BLACK_40}
                selectedIconTint={COLOR.BLACK}
                iconSize={ResponsiveSizeWp(25)}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.indent,
                    actions.outdent,
                    actions.undo,
                    actions.redo,
                ]}
            />

            <TouchableOpacity
                style={styles.AddButton}
                onPress={() => {
                    if (!data) {
                        ErrorToast('', 'Add Content');
                        return;
                    }
                    onAddPress(data?.toString());
                }}
            >
                <Text style={styles.AddText}>Save {title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(AddLabPrescription)

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
        width: '100%',
        backgroundColor: COLOR.PRIMARYCOLOR,
        borderRadius: ResponsiveSizeWp(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: ResponsiveSizeWp(2),
        borderColor: COLOR.WHITE,
        marginTop: ResponsiveSizeWp(10),
    },
    AddText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(12),
    },
    editor: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
    },
    rich: {
        minHeight: ResponsiveSizeWp(200),
        maxHeight: ResponsiveSizeWp(200),
    },
    richBar: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingHorizontal: ResponsiveSizeWp(7),
    },
    tib: {
        fontWeight: '600',
        fontSize: ResponsiveSizeWp(25),
    }
})