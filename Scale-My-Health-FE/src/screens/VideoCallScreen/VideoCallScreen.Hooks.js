import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import socketServices from "../../api/Socket";
import { sockets } from "../../api/helper";
import InCallManager from "react-native-incall-manager";
import { Alert, BackHandler } from "react-native";
import { useWebrtcForVC } from "../../hooks/video-call/useWebrtcForVC";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { ErrorToast, SuccessToast } from "../../constants/ToastMessage";
import { AddPrescriptionAPI } from "../../api/utils";
import { useSocketContext } from "../../components/socket/SocketContext";

const useScreenHooks = () => {

    // Variables
    const route = useRoute();
    const navigation = useNavigation();
    const { localUserId, remoteUserId, caller, username, type } = route?.params;
    const appointment = route?.params?.appointment;
    const remoteUserName = username ?? 'Scale My Health';
    const { socketConnected } = useSocketContext();
    const userRole = useSelector(state => state[reducers.UserDataReducer])?.role;
    const [isReconnecting, setIsReconnecting] = useState(false);

    const onCreateOffer = (offer) => {
        socketServices.emit(sockets.VideoCall.offer, {
            _from: localUserId,
            _to: remoteUserId,
            offer: offer,
        });
    }

    const onReconnectOfferCreate = (offer) => {
        socketServices.emit(sockets.VideoCall.reconnectOffer, {
            _from: localUserId,
            _to: remoteUserId,
            offer: offer,
        });
    }

    const onAnswerOffer = (answer) => {
        socketServices.emit(sockets.VideoCall.answer, {
            _from: localUserId,
            _to: remoteUserId,
            answer: answer,
        });
    }

    const onReconnectOfferAnswer = (answer) => {
        socketServices.emit(sockets.VideoCall.reconnectAnswer, {
            _from: localUserId,
            _to: remoteUserId,
            answer: answer,
        });
    }

    const onIceCandidate = (candidate) => {
        socketServices.emit(sockets.VideoCall.candidate, {
            _from: localUserId,
            _to: remoteUserId,
            candidate: candidate,
        });
    }

    const {
        localStream,
        remoteStream,
        callConnected,
        isBigScaleLocalView,
        micEnable,
        speakerEnable,
        cameraEnable,
        frontCameraMode,

        onStartCall,
        onCallAccept,
        onViewScaleChange,
        onToggleMic,
        onToggleSpeaker,
        onToggleCamera,
        onSwitchCameraMode,
        onRenegotiateConnection,
        onCallReconnected,

        handleAnswer,
        handleCandidate,
        cleanUpStream,

        audioOutput,
        availableDevices,
        switchAudioOutput,
    } = useWebrtcForVC({
        onIceCandidate,
        onCreateOffer,
        onAnswerOffer,
        onReconnectOfferCreate,
        onReconnectOfferAnswer,
    });


    // UseStates
    const [callStatus, setCallStatus] = useState('');
    const [remoteCameraEnable, setRemoteCameraEnable] = useState(true);
    const [appointmentCompletionModalVisible, setAppointmentCompletionModalVisibility] = useState(false);

    const [caseSelectionModalVisible, setCaseSelectionModalVisibility] = useState(false);
    const [prescribeModalVisible, setPrescribeModalVisibility] = useState(false);
    const [caseInfo, setCaseInfo] = useState({});
    const [prescribeData, setPrescribeData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => { backHandler.remove(); }
    }, [])

    useEffect(() => {
        if (type == 'callee') {
            InCallManager.stopRingtone();
            setCallStatus('Connecting...');
            socketServices.emit(sockets.VideoCall.acceptCall, {
                _from: localUserId,
                _to: remoteUserId,
            });
        }

        if (type == 'caller') {
            sendCallNotification();
        }

        setIsReconnecting(true);

        return () => {
            onHangup();
        }
    }, [])

    useEffect(() => {
        if (socketConnected) {
            socketServices.on(sockets.VideoCall.answer, (data) => {
                handleAnswer(data);
                setCallStatus('Connecting...');
            });

            socketServices.on(sockets.VideoCall.candidate, (data) => {
                handleCandidate(data);
                setCallStatus('');
            });

            socketServices.on(sockets.VideoCall.hangup, handleRemoteHangup);
            socketServices.on(sockets.VideoCall.remoteCameraEnable, setRemoteCameraEnable);
            socketServices.on(sockets.VideoCall.reconnectOffer, (data) => { onCallReconnected({ offer: data?.offer }) });
            socketServices.on(sockets.VideoCall.reconnectAnswer, handleAnswer);

            if (type == 'callee') {
                socketServices.on(sockets.VideoCall.offer, (data) => { onCallAccept({ offer: data?.offer }) });
            }

            if (type == 'caller') {
                socketServices.on(sockets.VideoCall.acceptCall, onStartCall);
                socketServices.on(sockets.VideoCall.declineCall, handleCallDecline);
            }
        }

        return () => {
            socketServices.removeListener(sockets.VideoCall.offer);
            socketServices.removeListener(sockets.VideoCall.answer);
            socketServices.removeListener(sockets.VideoCall.candidate);
            socketServices.removeListener(sockets.VideoCall.hangup);
            socketServices.removeListener(sockets.VideoCall.acceptCall);
            socketServices.removeListener(sockets.VideoCall.declineCall);
            socketServices.removeListener(sockets.VideoCall.reconnectOffer);
            socketServices.removeListener(sockets.VideoCall.reconnectAnswer);
        }
    }, [socketConnected])

    useEffect(() => {
        if (isReconnecting == true && socketConnected == true) onRenegotiateConnection();
    }, [socketConnected])

    useEffect(() => {
        socketServices.emit(sockets.VideoCall.remoteCameraEnable, { enable: cameraEnable, _to: remoteUserId });
    }, [cameraEnable])


    // Methods
    const sendCallNotification = async () => {
        setCallStatus('Ringing...');
        InCallManager.startRingback();
        socketServices.emit(sockets.VideoCall.incomingCallNotification, {
            _from: localUserId,
            _to: remoteUserId,
            username: caller?.name,
            profileImage: caller?.profile,
            appointmentId: appointment?._id,
        });
    }

    const onHangup = () => {
        InCallManager.stopRingtone();
        InCallManager.stopRingback();
        socketServices.emit(sockets.VideoCall.hangup, { _from: localUserId, _to: remoteUserId });
    }

    const onHangUpPress = () => {
        type == 'caller' && !callConnected && socketServices.emit(sockets.VideoCall.missCallNotification, {
            _from: localUserId,
            _to: remoteUserId,
            username: caller?.name,
            profileImage: caller?.profile,
        });

        if (userRole == 'doctor' && callConnected) {
            setAppointmentCompletionModalVisibility(true);
        } else {
            cleanUpStream();
            navigation.canGoBack() && navigation.goBack();
        }
    };

    const handleRemoteHangup = () => {
        try {
            InCallManager.stopRingback();

            if (userRole == 'doctor') {
                setAppointmentCompletionModalVisibility(true);
            } else {
                cleanUpStream();
                Alert.alert('Consultation', 'Consultation has been ended.');
                navigation.canGoBack() && navigation.goBack();
            }
        } catch (error) {
            console.log(`Handle Remote Hangup Error: ${error}`)
        }
    }

    const handleCallDecline = () => {
        try {
            InCallManager.stopRingback();
            Alert.alert('Consultation', 'Consultation has been decline.');
            cleanUpStream();
            navigation.canGoBack() && navigation.goBack();
        } catch (error) {
            console.log(`Handle Remote Hangup Error: ${error}`)
        }
    }

    const onAppointmentCompletePress = () => {
        cleanUpStream();
        if (caseInfo?._id && (prescribeData?.medicine?.length > 0 || prescribeData?.dietaryInstructions?.length > 0 || prescribeData?.labPrescriptions?.length > 0)) {
            savePrescription();
        } else {
            setAppointmentCompletionModalVisibility(false);
            navigation.canGoBack() && navigation.goBack();
            SuccessToast('', 'Consultation Completed.');
        }
    }

    const onSelectCasePress = () => { setCaseSelectionModalVisibility(true); }

    const onPrescribePress = () => { setPrescribeModalVisibility(true); }

    const onCaseSelect = (info) => { setCaseInfo(info); }

    const onDonePrescribe = (data) => { setPrescribeData(data); }

    const savePrescription = async () => {
        try {
            setIsLoading(true);
            const params = {
                caseId: caseInfo?._id,
                patient: caseInfo?.patient?._id,
                doctor: caseInfo?.doctor?._id,
                ...prescribeData,
            }
            const res = await AddPrescriptionAPI(params);
            const msg = res?.data?.message;
            if (res?.data?.status) {
                const data = res?.data?.data;
                socketServices.emit('PrescriptionAdded', { patient: data?.patient, doctor: data?.doctor });
                setAppointmentCompletionModalVisibility(false);
                navigation.canGoBack() && navigation.goBack();
                SuccessToast('', 'Consultation Completed.');
            } else {
                ErrorToast('', `${msg}`);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            ErrorToast('', 'Something went wrong');
            console.log(error);
        }
    }

    return {
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
    };
}

export default useScreenHooks