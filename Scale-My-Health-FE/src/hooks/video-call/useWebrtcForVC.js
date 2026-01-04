import { useEffect, useState } from "react";
import InCallManager from 'react-native-incall-manager';
import { mediaDevices } from "react-native-webrtc";
import { usePeerConnection } from "./usePeerConnection";
import { useVideoCallPermissions } from "./useVideoCallPermissions";
import { useAudioDeviceManager } from "./useAudioDeviceManager";

export const videoResolutions = {
    SD_360p: {
        mandatory: {
            minWidth: 640,
            minHeight: 360,
            minFrameRate: 15,
        },
    },
    HD_720p: {
        mandatory: {
            minWidth: 1280,
            minHeight: 720,
            minFrameRate: 30,
        },
    },
    FHD_1080p: {
        mandatory: {
            minWidth: 1920,
            minHeight: 1080,
            minFrameRate: 30,
        },
    },
    QHD_1440p: {
        mandatory: {
            minWidth: 2560,
            minHeight: 1440,
            minFrameRate: 60,
        },
    },
    UHD_4K: {
        mandatory: {
            minWidth: 3840,
            minHeight: 2160,
            minFrameRate: 60,
        },
    },
    UHD_8K: {
        mandatory: {
            minWidth: 7680,
            minHeight: 4320,
            minFrameRate: 60,
        },
    },
};

export const useWebrtcForVC = ({
    onCreateOffer = (offer) => { console.log(`onCreateOffer : ${offer}`); },
    onReconnectOfferCreate = (offer) => { console.log(`onReconnectOfferCreate : ${offer}`); },
    onAnswerOffer = (answer) => { console.log(`onAnswerOffer : ${answer}`); },
    onReconnectOfferAnswer = (answer) => { console.log(`onReconnectOfferAnswer : ${answer}`); },
    onIceCandidate = (candidate) => { console.log(`onIceCandidate : ${candidate}`); },
}) => {

    // Custom Hooks
    const { permissionsGranted, checkAndRequestPermissions } = useVideoCallPermissions();
    const { peerConnection, setupPeerConnection, closePeerConnection } = usePeerConnection();
    const { audioOutput, availableDevices, switchAudioOutput, checkAudioDevice } = useAudioDeviceManager();

    // State
    const [localStream, setLocalStream] = useState(null); // Local User
    const [remoteStream, setRemoteStream] = useState(null); // Remote User
    const [callConnected, setCallConnected] = useState(false);
    const [isBigScaleLocalView, setIsBigScaleLocalView] = useState(false);
    const [micEnable, setMicEnable] = useState(true);
    const [speakerEnable, setSpeakerEnable] = useState(true);
    const [cameraEnable, setCameraEnable] = useState(true);
    const [frontCameraMode, setFrontCameraMode] = useState(true);

    // useEffect
    useEffect(() => {
        // Start Local Stream
        startLocalStream();

        // Peer Connection (For Remote Stream)
        const pc = peerConnection.current;
        if (pc && pc != null) {
            pc.ontrack = (event) => { event.streams && event.streams[0] && setRemoteStream(event.streams[0]) }
            pc.onicecandidate = (event) => { event.candidate && onIceCandidate(event.candidate) }
            pc.oniceconnectionstatechange = () => { console.log('ICE Connection State:', pc.iceConnectionState); }
            pc.onconnectionstatechange = () => { console.log('Connection State:', pc.connectionState); }
            pc.onsignalingstatechange = () => { console.log('Signaling State:', pc.signalingState); }
        }
    }, [])

    useEffect(() => {
        InCallManager.stopProximitySensor();
        return () => { InCallManager.startProximitySensor(); }
    }, [])

    useEffect(() => { checkAudioDevice() }, [callConnected])

    // Caller (Make)
    const onStartCall = async () => {
        try {
            if (!permissionsGranted) {
                const permission = await checkAndRequestPermissions();
                if (!permission) return;
            };

            InCallManager.stopRingback();
            InCallManager.start({ media: 'video' });

            const stream = await generateLocalStream();

            peerConnection.current && stream.getTracks().length > 0 && stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
            const offer = await peerConnection.current.createOffer();

            await peerConnection.current.setLocalDescription(offer);

            onCreateOffer(offer);
        } catch (error) {
            console.log('Local Stream error:', error);
        }
    }

    const handleAnswer = async (data) => {
        try {
            await peerConnection.current.setRemoteDescription(data.answer);
            setCallConnected(true);
        } catch (error) {
            console.log(`Handle Answer Error: ${error}`)
        }
    }

    const handleCandidate = (data) => {
        try {
            data?.candidate && peerConnection.current.addIceCandidate(data.candidate);
        } catch (error) {
            console.log(`Handle Candidate Error: ${error}`)
        }
    }

    // Callee (Receive)
    const onCallAccept = async (data) => {
        try {
            if (!permissionsGranted) {
                const permission = await checkAndRequestPermissions();
                if (!permission) return;
            };

            await peerConnection.current.setRemoteDescription(data.offer);

            InCallManager.stopRingback();
            InCallManager.start({ media: 'video' });

            stopMediaStream(localStream);

            const stream = await generateLocalStream();

            stream.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, stream);
            });

            const answer = await peerConnection.current.createAnswer();

            await peerConnection.current.setLocalDescription(answer);

            onAnswerOffer(answer);

            setCallConnected(true);
        } catch (error) {
            console.log(`Incoming Call Error: ${error}`);
        }
    }

    // Call Reconnection 
    const onRenegotiateConnection = async () => {
        try {
            if (!peerConnection.current) return;

            await resetPeerConnection();

            stopMediaStream(localStream);

            const stream = await generateLocalStream();

            stream.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, stream);
            });

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            onReconnectOfferCreate(offer);

        } catch (error) {
            console.log("Error during renegotiation:", error);
        }
    };

    const onCallReconnected = async (data) => {
        try {
            if (!permissionsGranted) {
                const permission = await checkAndRequestPermissions();
                if (!permission) return;
            };

            await resetPeerConnection();

            await peerConnection.current.setRemoteDescription(data.offer);

            InCallManager.stopRingback();
            InCallManager.start({ media: 'video' });

            stopMediaStream(localStream);

            const stream = await generateLocalStream();

            stream.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, stream);
            });

            const answer = await peerConnection.current.createAnswer();

            await peerConnection.current.setLocalDescription(answer);

            onReconnectOfferAnswer(answer);

            setCallConnected(true);
        } catch (error) {
            console.log(`Call Reconnect Error: ${error}`);
        }
    }

    const resetPeerConnection = async () => {
        setSpeakerEnable(true);

        closePeerConnection(peerConnection.current);
        await setupPeerConnection();

        peerConnection.current.ontrack = (event) => {
            if (event.streams && event.streams[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                onIceCandidate(event.candidate);
            }
        };
    }

    const startLocalStream = async () => {
        if (!permissionsGranted) {
            const permission = await checkAndRequestPermissions();
            if (!permission) return;
        };

        await generateLocalStream();
    }

    const generateLocalStream = async () => {
        const stream = await mediaDevices.getUserMedia({
            audio: true,
            video: {
                ...videoResolutions.UHD_8K,
                facingMode: frontCameraMode ? 'user' : 'environment',
            },
        });

        stream.getAudioTracks()?.forEach(track => { track.enabled = micEnable });
        stream.getVideoTracks()?.forEach(track => { track.enabled = cameraEnable });

        setLocalStream(stream);

        return stream;
    }

    // Resource Method
    const cleanUpStream = async () => {
        stopMediaStream(localStream);
        stopMediaStream(remoteStream);
        setLocalStream(null);
        setRemoteStream(null);
        InCallManager.stopRingback();
        InCallManager.stop();
    }

    const stopMediaStream = (stream) => { stream && stream.getTracks().forEach((track) => { track.stop() }) };

    const onViewScaleChange = () => { setIsBigScaleLocalView(pre => !pre) }

    const onToggleMic = () => {
        setMicEnable(pre => !pre);
        toggleAudio(localStream);
    }

    const onToggleSpeaker = () => {
        setSpeakerEnable(pre => !pre);
        toggleAudio(remoteStream);
    }

    const toggleAudio = (stream) => {
        if (stream) stream?.getAudioTracks()?.forEach(track => { track.enabled = !track.enabled });
    }

    const onToggleCamera = async () => {
        setCameraEnable(pre => !pre);
        if (localStream) localStream?.getVideoTracks()?.forEach(track => { track.enabled = !track.enabled });
    }

    const onSwitchCameraMode = async () => {
        if (localStream) {
            localStream?.getVideoTracks()?.forEach(track => { track._switchCamera(); })
            if (cameraEnable) setFrontCameraMode(pre => !pre);
        };
    }

    return {
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

        cleanUpStream,
        handleAnswer,
        handleCandidate,

        audioOutput,
        availableDevices,
        switchAudioOutput,
    }
}