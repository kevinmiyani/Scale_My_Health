import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { COLOR } from '../../../../constants/Colors'
import { ResponsiveSizeWp } from '../../../../constants/Responsive'
import { FontFamily } from '../../../../constants/Fonts'
import ConfirmationModal from '../../../../components/modal/ConfirmationModal'
import Feather from 'react-native-vector-icons/Feather';
import { format } from 'date-fns'
import HolidayText from './HolidayText'
import moment from 'moment'
import HolidayEditor from './HolidayEditor'

const HolidaysCard = ({
    data,
    onRemove = () => { },
    onEdit = () => { },
}) => {

    const [removeConfirmationModalVisible, setRemoveConfirmationModalVisible] = useState(false);
    const [editorMode, setEditorMode] = useState(false);

    const formattedDate = data?.date ? format(new Date(data?.date), 'dd MMMM, yyyy').toString() : '';
    const today = moment().startOf("day");
    const holidayDate = moment(data?.date, "YYYY-MM-DD").startOf("day");
    const editable = holidayDate.diff(today, "days") > 4;

    return (
        <>
            {

                editorMode ?
                    <HolidayEditor
                        defaultData={data}
                        onSavePress={(data) => { onEdit(data); setEditorMode(false); }}
                        onCancelPress={() => { setEditorMode(false) }}
                    />
                    :
                    <View style={[styles.Container,]}>
                        <View style={styles.ContentContainer}>
                            <Text style={styles.DateText}>{formattedDate}</Text>

                            {
                                editable &&
                                <TouchableOpacity style={styles.Button} onPress={() => { setEditorMode(true); }}>
                                    <Feather
                                        name={'edit'}
                                        color={COLOR.ORANGE}
                                        size={ResponsiveSizeWp(22)}
                                    />
                                </TouchableOpacity>
                            }

                            <TouchableOpacity style={styles.Button} onPress={() => { setRemoveConfirmationModalVisible(true); }}>
                                <Feather
                                    name={'trash-2'}
                                    color={COLOR.RED}
                                    size={ResponsiveSizeWp(22)}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.ContentContainer, { gap: ResponsiveSizeWp(25), justifyContent: 'flex-start', }]}>
                            <HolidayText
                                title={'Holiday Type'}
                                value={data?.time ? 'Half Day' : 'Full Day'}
                            />
                            {
                                data?.time?.from && data?.time?.to &&
                                <HolidayText
                                    title={'Working Hours'}
                                    value={`${data?.time?.from} - ${data?.time?.to}`}
                                />
                            }
                        </View>
                    </View>
            }

            <ConfirmationModal
                title={`${formattedDate}`}
                desc={`Are you sure you want to remove this holiday?`}
                modalVisible={removeConfirmationModalVisible}
                setModalVisible={setRemoveConfirmationModalVisible}
                onYesPress={() => { onRemove(data?._id); setRemoveConfirmationModalVisible(false) }}
            />
        </>
    )
}

export default memo(HolidaysCard)

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.LIGHTGRAY,
        padding: ResponsiveSizeWp(15),
        borderRadius: ResponsiveSizeWp(20),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
        paddingLeft: ResponsiveSizeWp(20),
        gap: ResponsiveSizeWp(5),
    },
    ContentContainer: {
        flexDirection: 'row',
        gap: ResponsiveSizeWp(15),
        alignItems: 'center',
    },
    DateText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(17),
        flex: 1,
        top: Platform.OS == 'android' && ResponsiveSizeWp(2.5),
    },
    Button: {
        width: ResponsiveSizeWp(30),
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})