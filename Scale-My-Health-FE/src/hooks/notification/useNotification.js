import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';
import { useCallNotification } from '../video-call/useCallNotification';
import { Platform } from 'react-native';
import InCallManager from "react-native-incall-manager";

export const useNotification = ({
    navigationRef,
}) => {

    const clearNotificationByChannelId = async (channelId) => {
        const notifications = await notifee.getDisplayedNotifications();

        const incomingCallNotifications = notifications.filter((notification) => {
            if (Platform.OS == 'android') { return notification.notification.android.channelId == channelId }
            if (Platform.OS == 'ios') { return notification.notification.ios.categoryId == channelId }
        });

        for (const notification of incomingCallNotifications) {
            await notifee.cancelNotification(notification.id);
        }
    }

    const {
        handleIncomingCallNotification,
        handleMissCallNotification,
        handleCallAccept,
        handleCallReject
    } = useCallNotification({
        navigationRef,
        clearIncomingCallNotification: clearNotificationByChannelId,
    });

    // Filter notification based on type of notification received by backend
    const handleNotification = async (remoteMessage, isForeground) => {
        const data = remoteMessage?.data;
        switch (data?.type) {
            case 'incoming-call':
                await handleIncomingCallNotification(data)
                break;
            case 'miss-call':
                await handleMissCallNotification(data)
                break;
            default:
                if (isForeground) await handleDefaulPushNotification(remoteMessage);
                break;
        }
    }

    const handleDefaulPushNotification = async (remoteMessage) => {
        const channelId = await notifee.createChannel({
            id: remoteMessage?.from?.toString(),
            name: 'Scale My Health',
            lights: false,
            vibration: true,
            importance: AndroidImportance.HIGH,
            sound: 'default',
        });

        if (remoteMessage?.notification?.title) {
            await notifee.displayNotification({
                title: remoteMessage.notification.title.toString(),
                body: remoteMessage.notification.body?.toString(),
                android: {
                    channelId,
                    style: {
                        type: AndroidStyle.BIGTEXT,
                        text: remoteMessage.notification.body?.toString(),
                    }
                }
            });
        }
    }

    // Foreground Notification Handler
    messaging().onMessage((remoteMessage) => {
        handleNotification(remoteMessage, true);
    });

    // Foreground Nofication Press
    notifee.onForegroundEvent(async ({ type, detail }) => {
        if (type === EventType.ACTION_PRESS) {
            if (detail.pressAction?.id === 'accept') {
                handleCallAccept(detail.notification?.data);
            } else if (detail.pressAction?.id === 'reject') {
                handleCallReject(detail.notification?.data);
            }
            await notifee.cancelNotification(detail.notification?.id);
        }
        if (type === EventType.DISMISSED) {
            handleCallReject(detail.notification?.data);
            await notifee.cancelNotification(detail.notification?.id);
        }
    });


    // Background Notification Handler (To resolve automatic call of messaging().setBackgroundMessageHandler follow 1st solution of error-fix.md)
    messaging().setBackgroundMessageHandler((remoteMessage) => {
        handleNotification(remoteMessage);
        return Promise.resolve();
    });

    // Background Nofication Press
    // messaging().onNotificationOpenedApp(remoteMessage => { });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (type === EventType.ACTION_PRESS) {
            if (detail.pressAction?.id === 'accept') {
                InCallManager.stopRingtone();
                if (navigationRef?.current?.isReady()) handleCallAccept(detail.notification?.data, detail.notification?.id);
            } else if (detail.pressAction?.id === 'reject') {
                handleCallReject(detail.notification?.data);
                await notifee.cancelNotification(detail.notification?.id);
            }
        }
        if (type === EventType.DISMISSED) {
            handleCallReject(detail.notification?.data);
            await notifee.cancelNotification(detail.notification?.id);
        }
    });


    // App Kill Mode Notification Press
    // messaging().getInitialNotification()?.then(async (remoteMessage) => { });


    const requestNotificationPermission = async () => { await notifee.requestPermission() };

    return { requestNotificationPermission, handleNotification }
};