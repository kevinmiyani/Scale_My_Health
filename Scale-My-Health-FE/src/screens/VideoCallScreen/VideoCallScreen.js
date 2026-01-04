import {
    View,
    StatusBar,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import useScreenHooks from './VideoCallScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import DurationView from './components/DurationView';
import Button from './components/Button';
import { RTCView } from 'react-native-webrtc';
import DraggableView from './components/DraggableView';
import AppointmentCompletionModal from '../../components/modal/AppointmentCompletionModal';
import PrescribeModal from '../../components/modal/PrescribeModal';
import CaseSelectionModal from '../../components/modal/CaseSelectionModal';
import CaseSelectionButton from './components/CaseSelectionButton';
import AudioDeviceButton from './components/AudioDeviceButton';

const { width, height } = Dimensions.get('screen');

const VideoCallScreen = (props) => {

    const {
        navigation,
        appointment,
        remoteUserName,
        localStream,
        remoteStream,
        callConnected,
        isBigScaleLocalView,
        micEnable,
        speakerEnable,
        callStatus,
        cameraEnable,
        remoteCameraEnable,
        frontCameraMode,
        userRole,
        caseInfo,
        isLoading,
        appointmentCompletionModalVisible, setAppointmentCompletionModalVisibility,
        caseSelectionModalVisible, setCaseSelectionModalVisibility,
        prescribeModalVisible, setPrescribeModalVisibility,

        onViewScaleChange,
        onToggleMic,
        onToggleSpeaker,
        onToggleCamera,
        onHangUpPress,
        onSwitchCameraMode,
        onAppointmentCompletePress,
        cleanUpStream,
        onSelectCasePress,
        onPrescribePress,
        onCaseSelect,
        onDonePrescribe,

        audioOutput,
        availableDevices,
        switchAudioOutput,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar translucent backgroundColor={COLOR.TRANSPARANT} />
            {
                (callConnected && remoteStream) ?
                    <>
                        <View style={styles.FullScreenPreview}>
                            <RTCView
                                streamURL={isBigScaleLocalView ? localStream?.toURL() : remoteStream?.toURL()}
                                style={styles.RTCViewStyle}
                                objectFit="cover"
                                mirror={isBigScaleLocalView ? frontCameraMode : false}
                            />
                            {
                                ((isBigScaleLocalView && !cameraEnable) || (!isBigScaleLocalView && !remoteCameraEnable)) &&
                                <View style={styles.VideoDisableView}>
                                    <Ionicons name={'videocam-off'} size={ResponsiveSizeWp(50)} color={COLOR.GRAY} />
                                </View>
                            }
                        </View>
                        <View style={[styles.MyViewContainer, {
                            height: height * 0.725,
                            width: width,
                        }]}>
                            <DraggableView
                                x={width}
                                y={height * 0.725}
                                border={ResponsiveSizeWp(25)}
                            >
                                <TouchableOpacity
                                    style={styles.MyPreview}
                                    activeOpacity={1}
                                    onPress={onViewScaleChange}
                                >
                                    <RTCView
                                        streamURL={isBigScaleLocalView ? remoteStream?.toURL() : localStream?.toURL()}
                                        style={styles.RTCViewStyle}
                                        objectFit="cover"
                                        mirror={isBigScaleLocalView ? false : frontCameraMode}
                                    />
                                    {
                                        ((!isBigScaleLocalView && !cameraEnable) || (isBigScaleLocalView && !remoteCameraEnable)) &&
                                        <View style={[styles.VideoDisableView, !cameraEnable && !remoteCameraEnable && {
                                            borderWidth: ResponsiveSizeWp(1),
                                            borderColor: COLOR.GRAY,
                                        }]}>
                                            <Ionicons name={'videocam-off'} size={ResponsiveSizeWp(30)} color={COLOR.GRAY} />
                                        </View>
                                    }
                                </TouchableOpacity>
                            </DraggableView>
                        </View>

                        {
                            userRole == 'doctor' && caseInfo?._id &&
                            <View style={styles.PrescribeButton}>
                                <Button onPress={onPrescribePress}>
                                    <MaterialCommunityIcons name={'clipboard-edit-outline'} size={ResponsiveSizeWp(27.5)} color={COLOR.WHITE} />
                                </Button>
                            </View>
                        }
                    </>
                    :
                    localStream &&
                    <View style={styles.FullScreenPreview}>
                        <RTCView
                            streamURL={localStream.toURL()}
                            style={styles.RTCViewStyle}
                            objectFit="cover"
                            mirror={frontCameraMode}
                        />
                    </View>
            }
            {
                localStream &&
                <View style={styles.InfoContainer}>
                    <DurationView
                        name={remoteUserName}
                        status={callStatus}
                    />

                    {
                        callConnected && userRole == 'doctor' &&
                        <CaseSelectionButton
                            caseId={caseInfo?._id && `#${caseInfo?._id}`}
                            onPress={onSelectCasePress}
                        />
                    }

                    <View style={styles.buttonContainer}>
                        {
                            callConnected &&
                            <>
                                <Button onPress={onSwitchCameraMode}>
                                    <Ionicons name={'camera-reverse'} size={ResponsiveSizeWp(27.5)} color={COLOR.WHITE} />
                                </Button>

                                <Button onPress={onToggleCamera}>
                                    <Ionicons name={cameraEnable ? 'videocam' : 'videocam-off'} size={ResponsiveSizeWp(27.5)} color={COLOR.WHITE} />
                                </Button>

                                <AudioDeviceButton
                                    audioOutput={audioOutput}
                                    availableDevices={availableDevices}
                                    switchAudioOutput={switchAudioOutput}
                                />

                                <Button onPress={onToggleMic}>
                                    <Ionicons name={micEnable ? 'mic' : 'mic-off'} size={ResponsiveSizeWp(27.5)} color={COLOR.WHITE} />
                                </Button>
                            </>
                        }

                        <Button onPress={onHangUpPress} color={'#AE2C2C'}>
                            <Ionicons
                                name='call'
                                size={ResponsiveSizeWp(27)}
                                color={COLOR.WHITE}
                                style={{
                                    transform: [{ rotate: '135deg' }]
                                }}
                            />
                        </Button>
                    </View>
                </View>
            }

            {
                userRole == 'doctor' && appointmentCompletionModalVisible &&
                <AppointmentCompletionModal
                    loading={isLoading}
                    modalVisible={appointmentCompletionModalVisible}
                    data={appointment}
                    onYesPress={onAppointmentCompletePress}
                    onNoPress={() => {
                        cleanUpStream();
                        setAppointmentCompletionModalVisibility(false);
                        navigation.canGoBack() && navigation.goBack();
                    }}
                />
            }

            {
                userRole == 'doctor' &&
                <>
                    <PrescribeModal
                        modalVisible={prescribeModalVisible}
                        setModalVisible={setPrescribeModalVisibility}
                        onDonePress={onDonePrescribe}
                    />

                    <CaseSelectionModal
                        appointment={appointment}
                        modalVisible={caseSelectionModalVisible}
                        setModalVisible={setCaseSelectionModalVisibility}
                        onCaseSelect={onCaseSelect}
                    />
                </>
            }
        </View>
    )
}

export default VideoCallScreen