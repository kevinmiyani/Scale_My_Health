const { Server } = require('socket.io');
const { sendDataOnlyNotification } = require('./notification/notification');
const { disableReschedule } = require('./controllers/appointmentController');
let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join Socket
    socket.on('join-socket', async (userID) => {
      await socket.leave(userID);
      socket.join(userID);
    });

    socket.on('leave-socket', (userID) => {
      socket.leave(userID);
    });

    // Appointments
    socket.on('AppointmentBooked', (data) => {
      const doctor = data?.doctor;
      const patient = data?.patient;

      io.emit('AppointmentTimeSlotChange', data);
      io.to(doctor).emit('NewAppointmentForDoctor', data);
      io.to(patient).emit('NewAppointmentForPatient', data);
    });

    socket.on('AppointmentReschedule', (data) => {
      const doctor = data?.doctor;
      const patient = data?.patient;

      io.emit('AppointmentTimeSlotChange', data);
      io.to(doctor).emit('AppointmentRescheduleForDoctor', data);
      io.to(patient).emit('AppointmentRescheduleForPatient', data);
    });

    socket.on('AppointmentComplete', (data) => {
      const { patient, doctor } = data;
      io.to(doctor).emit('AppointmentCompleteForDoctor', data);
      io.to(patient).emit('AppointmentCompleteForPatient', data);
    });

    // Prescription
    socket.on('PrescriptionAdded', (data) => {
      const { patient, doctor } = data;
      io.to(doctor).emit('PrescriptionAddedForCase', data);
      io.to(doctor).emit('PrescriptionAddedForDoctor', data);
      io.to(patient).emit('PrescriptionAddedForPatient', data);
    });

    // Expire Login Session
    socket.on('login-expire', (id) => {
      io.to(id).emit('login-expire', id);
    });

    // ------------------ Video Call Start ------------------ 

    // Send Incoming Call Notification
    socket.on('incoming-call-notification', async (data) => {
      // console.log(`Incoming Call Notification : ${JSON.stringify(data)}`);
      const notificationData = {
        type: 'incoming-call',
        ...data,
      }

      data?._to && await sendDataOnlyNotification(data?._to, notificationData);

      if (data?.appointmentId) disableReschedule(data?.appointmentId);

      io.to(data?._from).emit('AppointmentRescheduleForDoctor', {});
      io.to(data?._to).emit('AppointmentRescheduleForPatient', {});
      io.to(data?._to).emit('incoming-call-notification', { data: notificationData });
    });

    // Miss Call Notification
    socket.on('miss-call-notification', async (data) => {
      // console.log(`Miss Call Notification: ${JSON.stringify(data)}`);
      const notificationData = {
        type: 'miss-call',
        ...data,
      }

      data?._to && await sendDataOnlyNotification(data?._to, notificationData);

      io.to(data._to).emit('miss-call-notification', { data: notificationData });
    });

    // Accept Call
    socket.on('accept-call', async (data) => {
      // console.log(`Accept Call : ${JSON.stringify(data)}`);
      io.to(data._to).emit('accept-call', data);
    });

    // Decline Call
    socket.on('decline-call', async (data) => {
      // console.log(`Decline Call : ${JSON.stringify(data)}`);
      io.to(data._to).emit('decline-call', data);
    });

    socket.on('remote-camera-enable', async (data) => {
      // console.log(`Decline Call : ${JSON.stringify(data)}`);
      io.to(data._to).emit('remote-camera-enable', data?.enable);
    });


    // Broadcast offer to peer
    socket.on('offer', async (data) => {
      // console.log(`Offer : ${JSON.stringify(data)}`);
      io.to(data._to).emit('offer', data);
    });

    // Broadcast answer to peer
    socket.on('answer', (data) => {
      // console.log(`Answer : ${JSON.stringify(data)}`);
      io.to(data._to).emit('answer', data);
    });

    // Hangup Call
    socket.on('hangup', (data) => {
      // console.log(`Hang Up : ${JSON.stringify(data)}`);
      io.to(data._to).emit('hangup', data);
    });

    // Handle ICE candidate
    socket.on('candidate', (data) => {
      // console.log(`Candidate : ${JSON.stringify(data)}`);
      io.to(data._to).emit('candidate', data);
    });

    // Broadcast reconnection offer to peer
    socket.on('reconnect-offer', async (data) => {
      // console.log(`Offer : ${JSON.stringify(data)}`);
      io.to(data._to).emit('reconnect-offer', data);
    });

    // Broadcast reconnection answer to peer
    socket.on('reconnect-answer', (data) => {
      // console.log(`Answer : ${JSON.stringify(data)}`);
      io.to(data._to).emit('reconnect-answer', data);
    });

    // ------------------ Video Call End ------------------ 

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  return io;

}

module.exports = initializeSocket;
