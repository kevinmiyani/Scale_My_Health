import InCallManager from "react-native-incall-manager";
import notifee, { AndroidCategory, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from "react-native";
import { NavigationScreens } from "../../navigation/helper";
import socketServices from "../../api/Socket";
import { sockets } from "../../api/helper";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { ErrorToast } from "../../constants/ToastMessage";

const profilePlaceholder = 'https://cdn-icons-png.flaticon.com/512/4433/4433850.png';

const notAllowedScreensForCalling = [
    NavigationScreens.SplashScreen,
    NavigationScreens.LoginScreen,
    NavigationScreens.InitialInformationScreen,
    NavigationScreens.DoctorLoginScreen,
    NavigationScreens.VideoCallScreen,
]

export const useCallNotification = ({
    navigationRef,
    clearIncomingCallNotification = (channelId) => { console.log(`Initial clear incoming call notification: ${channelId}`); }
}) => {

    var timeoutId = '';

    const handleIncomingCallNotification = async (data) => {
        try {

            InCallManager.stopRingtone();
            InCallManager.startRingtone();

            clearIncomingCallNotification('incoming-call');

            const channelId = await notifee.createChannel({
                id: 'incoming-call',
                name: 'Scale My Health',
                lights: false,
                vibration: false,
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC,
            });

            const { username, profileImage } = data;

            if (Platform.OS == 'ios') {
                await notifee.setNotificationCategories([
                    {
                        id: 'incoming-call',
                        actions: [
                            {
                                title: `Join`,
                                id: 'accept',
                                foreground: true,
                            },
                            {
                                title: `Decline`,
                                id: 'reject',
                            },
                        ],
                    },
                ]);
            }

            await notifee.displayNotification({
                title: username ? username : 'Scale My Health',
                body: `📹 Incoming video call`,
                ios: {
                    categoryId: 'incoming-call',
                    attachments: [
                        {
                            url: profileImage ? profileImage : profilePlaceholder,
                        },
                    ],
                },
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                    visibility: AndroidVisibility.PUBLIC,
                    showTimestamp: true,
                    category: AndroidCategory.CALL,
                    lightUpScreen: true,
                    autoCancel: false,
                    ongoing: false,
                    // smallIcon: 'ic_video_call_icon',
                    largeIcon: profileImage ? profileImage : profilePlaceholder, // User Profile Image
                    timeoutAfter: 1000 * 60, // Swipe notification after ms
                    actions: [
                        {
                            title: `<p style="color: #4CAF50;"><b>Join</b></p>`,
                            pressAction: {
                                id: 'accept',
                                launchActivity: 'default', // Launch app from background or kill mode
                            },
                        },
                        {
                            title: `<p style="color: #F44336;"><b>Decline</b></p>`,
                            pressAction: { id: 'reject' },
                        },
                    ],
                },
                data: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleMissCallNotification = async (data) => {
        try {

            InCallManager.stopRingtone();

            clearIncomingCallNotification('incoming-call');

            const channelId = await notifee.createChannel({
                id: 'miss-call',
                name: 'Scale My Health',
                lights: false,
                vibration: false,
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC,
            });

            const { username, profileImage } = data;

            await notifee.displayNotification({
                title: username ? username : 'Scale My Health',
                body: `Missed video call`,
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                    visibility: AndroidVisibility.PUBLIC,
                    showTimestamp: true,
                    category: AndroidCategory.CALL,
                    largeIcon: profileImage ? profileImage : profilePlaceholder, // User Profile Image
                    lightUpScreen: true,
                    autoCancel: false,
                    ongoing: false,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCallAccept = async (data, notificationId) => {
        InCallManager.stopRingtone();
        if (timeoutId) clearTimeout(timeoutId);
        if (data) {
            const { _from, _to } = data;
            if (_from && _to) {
                if (notAllowedScreensForCalling.includes(navigationRef?.current?.getCurrentRoute()?.name)) {
                    timeoutId = setTimeout(() => {
                        handleCallAcceptAfterSometime(data, notificationId);
                    }, 2000);
                } else {
                    const granted = await checkAndRequestPermissions();
                    if (granted == true) {
                        navigationRef?.current?.navigate(NavigationScreens.VideoCallScreen, {
                            localUserId: _to,
                            remoteUserId: _from,
                            type: 'callee',
                            username: data?.username,
                        });
                        notificationId && await notifee.cancelNotification(notificationId);
                    } else {
                        ErrorToast('Permission', 'Camera and microphone permission require to join.');
                        handleCallReject(data);
                    }
                }
            }
        }
    };

    const handleCallAcceptAfterSometime = async (data, notificationId) => {
        InCallManager.stopRingtone();
        if (timeoutId) clearTimeout(timeoutId);
        if (data) {
            const { _from, _to } = data;
            if (_from && _to) {
                if (!notAllowedScreensForCalling.includes(navigationRef?.current?.getCurrentRoute()?.name)) {
                    const granted = await checkAndRequestPermissions();
                    if (granted == true) {
                        navigationRef?.current?.navigate(NavigationScreens.VideoCallScreen, {
                            localUserId: _to,
                            remoteUserId: _from,
                            type: 'callee',
                            username: data?.username,
                        });
                    } else {
                        const recheck = await checkAndRequestPermissions();
                        if (recheck == true) {
                            navigationRef?.current?.navigate(NavigationScreens.VideoCallScreen, {
                                localUserId: _to,
                                remoteUserId: _from,
                                type: 'callee',
                                username: data?.username,
                            });
                        } else {
                            handleCallReject(data);
                        }
                    }
                    notificationId && await notifee.cancelNotification(notificationId);
                }
            }
        }
    };

    const handleCallReject = (data) => {
        InCallManager.stopRingtone();
        if (data) {
            const { _from, _to } = data;
            !socketServices?.socket?.connected && socketServices.initializeSocket();
            socketServices.emit(sockets.VideoCall.declineCall, { _from: _to, _to: _from });
        }
    };

    const checkAndRequestPermissions = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED;
                const micGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;
                return cameraGranted && micGranted
            } else if (Platform.OS === 'ios') {
                const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
                const micStatus = await check(PERMISSIONS.IOS.MICROPHONE);

                if (cameraStatus !== RESULTS.GRANTED) await request(PERMISSIONS.IOS.CAMERA);
                if (micStatus !== RESULTS.GRANTED) await request(PERMISSIONS.IOS.MICROPHONE);

                const updatedCameraStatus = await check(PERMISSIONS.IOS.CAMERA);
                const updatedMicStatus = await check(PERMISSIONS.IOS.MICROPHONE);

                return updatedCameraStatus === RESULTS.GRANTED && updatedMicStatus === RESULTS.GRANTED;
            }
        } catch (error) {
            console.log('Error checking or requesting permissions:', error);
        }
    };


    return {
        handleIncomingCallNotification,
        handleMissCallNotification,
        handleCallAccept,
        handleCallReject,
    }
}