var admin = require('firebase-admin');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

const serviceAccount = require('../scale-my-health-notification-firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Triggers system notifications for frontend
const sendPushNotification = async (to, data = {}, title = 'SMH', body = '') => {
    try {
        const fcmToken = await getFCMToken(to);
        if (fcmToken && fcmToken != '') {
            const message = {
                notification: {
                    title: title,
                    body: body,
                },
                token: fcmToken,
                data: data,
            };

            const response = await admin.messaging().send(message);
            console.log('Notification sent successfully:', response);
        }
    } catch (error) {
        console.log('Error sending notification:', error?.message);
    }
}

// Only wakes app in background for frontend
const sendDataOnlyNotification = async (to, data = {}) => {
    try {
        const fcmToken = await getFCMToken(to);
        if (fcmToken && fcmToken != '') {
            const message = {
                data: data,
                token: fcmToken,
                android: {
                    priority: 'high',
                },
                apns: {
                    headers: {
                        'apns-priority': '10',
                    },
                    payload: {
                        aps: {
                            'content-available': 1,
                        },
                    },
                },
            };

            const response = await admin.messaging().send(message);
            console.log('Data-Only Notification sent successfully:', response);
        }
    } catch (error) {
        console.log('Error sending Data-Only Notification:', error?.message);
    }
}

const getFCMToken = async (id) => {
    const patient = await Patient.findOne({ _id: id }, { fcmToken: 1, _id: 0 });
    if (patient?.fcmToken) return patient?.fcmToken;
    const doctor = await Doctor.findOne({ _id: id }, { fcmToken: 1, _id: 0 });
    if (doctor?.fcmToken) return doctor?.fcmToken;
    return '';
}

module.exports = { sendPushNotification, sendDataOnlyNotification, getFCMToken };