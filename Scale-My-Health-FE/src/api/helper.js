export const sockets = {
    JoinSocket: 'join-socket',
    LeaveSocket: 'leave-socket',
    LoginExpire: 'login-expire',
    Doctor: {
        holiday: 'doctor-holidays-update',
    },
    Appointment: {
        complete: {
            default: 'AppointmentComplete',
            patient: 'AppointmentCompleteForPatient',
            doctor: 'AppointmentCompleteForDoctor',
        },
        reschedule: {
            default: 'AppointmentReschedule',
            patient: 'AppointmentRescheduleForPatient',
            doctor: 'AppointmentRescheduleForDoctor',
        },
    },
    VideoCall: {
        offer: 'offer',
        answer: 'answer',
        reconnectOffer: 'reconnect-offer',
        reconnectAnswer: 'reconnect-answer',
        hangup: 'hangup',
        candidate: 'candidate',
        missCallNotification: 'miss-call-notification',
        incomingCallNotification: 'incoming-call-notification',
        acceptCall: 'accept-call',
        declineCall: 'decline-call',
        remoteCameraEnable: 'remote-camera-enable',
    }
}