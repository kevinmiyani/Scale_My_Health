import axios from "axios";
import socketServices from "./Socket";
import { sockets } from "./helper";

export const DOMAIN = `ADD_YOUR_DOMAIN_URL_HERE`; 
const BASE_URL = `${DOMAIN}/api`;

// BASE URL
const PATIENT_BASE_URL = `${BASE_URL}/patient`;
const DOCTOR_BASE_URL = `${BASE_URL}/doctor`;
const APPOINTMENT_BASE_URL = `${BASE_URL}/appointment`;
const CASE_BASE_URL = `${BASE_URL}/case`;
const PRESCRIPTION_BASE_URL = `${BASE_URL}/prescription`;

// API URL
const PATIENT_LOGIN_URL = `${PATIENT_BASE_URL}/login`;
const PATIENT_SEND_OTP_URL = `${PATIENT_BASE_URL}/send-otp`;
const PATIENT_REGISTER_URL = `${PATIENT_BASE_URL}/register`;
const PATIENT_FCM_UPDATE_URL = `${PATIENT_BASE_URL}/fcm-update`;
const GET_PATIENT_FOR_DOCTOR_URL = `${PATIENT_BASE_URL}/for-doctor`;

const DOCTOR_LOGIN_URL = `${DOCTOR_BASE_URL}/login`;
const DOCTOR_FCM_UPDATE_URL = `${DOCTOR_BASE_URL}/fcm-update`;
const DOCTOR_DETAILS_UPDATE_URL = `${DOCTOR_BASE_URL}/update`;
const DOCTOR_SEARCH_URL = `${DOCTOR_BASE_URL}/search`;
const TIMELINE_BASE_URL = `${DOCTOR_BASE_URL}/timeline`;
const HOLIDAYS_MANAGE_URL = `${DOCTOR_BASE_URL}/holidays`;
const SPECIALITY_BASE_URL = `${DOCTOR_BASE_URL}/specialities`;
const QUALIFICATION_BASE_URL = `${DOCTOR_BASE_URL}/qualifications`;

const APPOINTMENT_TIME_SLOT_URL = `${APPOINTMENT_BASE_URL}/time-slot`;
const RESCHEDULE_APPOINTMENT_URL = `${APPOINTMENT_BASE_URL}/reschedule`;
const APPOINTMENT_CREATE_URL = `${APPOINTMENT_BASE_URL}/create`;
const APPOINTMENT_STATUS_UPDATE_URL = `${APPOINTMENT_BASE_URL}/complete`;
const GET_APPOINTMENT_BY_DOCTOR_URL = `${APPOINTMENT_BASE_URL}/doctor`;
const GET_APPOINTMENT_BY_PATIENT_URL = `${APPOINTMENT_BASE_URL}/patient`;
const GET_APPOINTMENT_BY_PATIENT_AND_DOCTOR_URL = `${APPOINTMENT_BASE_URL}/doctor-patient`;

const CASE_CREATE_URL = `${CASE_BASE_URL}/create`;
const GET_CASE_BY_DOCTOR_URL = `${CASE_BASE_URL}/doctor`;
const GET_CASE_BY_PATIENT_URL = `${CASE_BASE_URL}/patient`;
const GET_CASE_BY_PATIENT_AND_DOCTOR_URL = `${CASE_BASE_URL}/doctor-patient`;

const PRESCRIPTION_ADD_URL = `${PRESCRIPTION_BASE_URL}/add`;
const GET_PRESCRIPTION_BY_DOCTOR_URL = `${PRESCRIPTION_BASE_URL}/doctor`;
const GET_PRESCRIPTION_BY_PATIENT_URL = `${PRESCRIPTION_BASE_URL}/patient`;
const GET_PRESCRIPTION_BY_CASE_URL = `${PRESCRIPTION_BASE_URL}/case`;
const GET_PRESCRIPTION_BY_PATIENT_AND_DOCTOR_URL = `${PRESCRIPTION_BASE_URL}/doctor-patient`;

// GET
export const getPatientDataByIdAPI = async (id) => {
    const res = await axios.get(`${PATIENT_BASE_URL}/${id}`);
    return res;
}

export const getAllDoctorsAPI = async () => {
    const res = await axios.get(`${DOCTOR_BASE_URL}`);
    return res;
}

export const getDoctorDataByIdAPI = async (id) => {
    const res = await axios.get(`${DOCTOR_BASE_URL}/${id}`);
    return res;
}

export const getAppointmentByPatientAPI = async (id) => {
    const res = await axios.get(`${GET_APPOINTMENT_BY_PATIENT_URL}/${id}`);
    return res;
}

export const getAppointmentByDoctorAPI = async (id) => {
    const res = await axios.get(`${GET_APPOINTMENT_BY_DOCTOR_URL}/${id}`);
    return res;
}

export const getCasesByPatientAPI = async (id) => {
    const res = await axios.get(`${GET_CASE_BY_PATIENT_URL}/${id}`);
    return res;
}

export const getCasesByDoctorAPI = async (id) => {
    const res = await axios.get(`${GET_CASE_BY_DOCTOR_URL}/${id}`);
    return res;
}

export const getPatientsForDoctorAPI = async (id) => {
    const res = await axios.get(`${GET_PATIENT_FOR_DOCTOR_URL}/${id}`);
    return res;
}

export const getPrescriptionByPatientAPI = async (id) => {
    const res = await axios.get(`${GET_PRESCRIPTION_BY_PATIENT_URL}/${id}`);
    return res;
}

export const getPrescriptionByDoctorAPI = async (id) => {
    const res = await axios.get(`${GET_PRESCRIPTION_BY_DOCTOR_URL}/${id}`);
    return res;
}

export const getPrescriptionByCaseAPI = async (id) => {
    const res = await axios.get(`${GET_PRESCRIPTION_BY_CASE_URL}/${id}`);
    return res;
}

// POST
export const SendPatientOTPAPI = async (params) => {
    const res = await axios.post(PATIENT_SEND_OTP_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const PatientLoginAPI = async (params) => {
    const res = await axios.post(PATIENT_LOGIN_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const PatientRegisterAPI = async (params) => {
    const res = await axios.post(PATIENT_REGISTER_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const DoctorLoginAPI = async (params) => {
    const res = await axios.post(DOCTOR_LOGIN_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const DoctorSearchAPI = async (params) => {
    const res = await axios.post(DOCTOR_SEARCH_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const GetAppointmentTimeSlotForPatientAPI = async (params) => {
    const res = await axios.post(APPOINTMENT_TIME_SLOT_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const CreateAppointmentAPI = async (params) => {
    const res = await axios.post(APPOINTMENT_CREATE_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const AppointmentStatusByPatientAPI = async (id, status) => {
    const res = await axios.post(`${GET_APPOINTMENT_BY_PATIENT_URL}/${id}`, status && { status });
    return res;
}

export const AppointmentDateByDoctorAPI = async (id, date) => {
    const res = await axios.post(`${GET_APPOINTMENT_BY_DOCTOR_URL}/${id}`, { date });
    return res;
}

export const CreateCaseAPI = async (params) => {
    const res = await axios.post(CASE_CREATE_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const getAllAppointmentByPatientDoctorAPI = async (params) => {
    const res = await axios.post(`${GET_APPOINTMENT_BY_PATIENT_AND_DOCTOR_URL}`, params);
    return res;
}

export const getAllCasesByPatientDoctorAPI = async (params) => {
    const res = await axios.post(`${GET_CASE_BY_PATIENT_AND_DOCTOR_URL}`, params);
    return res;
}

export const getAllPrescriptionByPatientDoctorAPI = async (params) => {
    const res = await axios.post(`${GET_PRESCRIPTION_BY_PATIENT_AND_DOCTOR_URL}`, params);
    return res;
}

export const AddPrescriptionAPI = async (params) => {
    const res = await axios.post(PRESCRIPTION_ADD_URL, params).catch((e) => { console.log(e) });
    return res;
};

export const AddTimeLineAPI = async (id, params) => {
    const res = await axios.post(`${TIMELINE_BASE_URL}/${id}`, params).catch((e) => { console.log(e) });
    return res;
};

export const AddSpecialityAPI = async (id, params) => {
    const res = await axios.post(`${SPECIALITY_BASE_URL}/${id}`, params).catch((e) => { console.log(e) });
    return res;
};

export const AddQualificationAPI = async (id, params) => {
    const res = await axios.post(`${QUALIFICATION_BASE_URL}/${id}`, params).catch((e) => { console.log(e) });
    return res;
};

export const ManageHolidaysAPI = async (id, params) => {
    const res = await axios.post(`${HOLIDAYS_MANAGE_URL}/${id}`, params).catch((e) => { console.log(e) });
    return res;
};

// PATCH
export const CompleteAppointmentStatusAPI = async (id, users) => {
    const res = await axios.patch(`${APPOINTMENT_STATUS_UPDATE_URL}/${id}`);
    socketServices.emit(sockets.Appointment.complete.default, users);
    return res;
}

export const RescheduleAppointmentAPI = async (id, params, users) => {
    const res = await axios.patch(`${RESCHEDULE_APPOINTMENT_URL}/${id}`, params).catch((e) => { console.log(e) });
    socketServices.emit(sockets.Appointment.reschedule.default, users);
    return res;
};

export const UpdatePatientFCMTokenAPI = async (id, data) => {
    const res = await axios.patch(`${PATIENT_FCM_UPDATE_URL}/${id}`, data);
    return res;
}

export const UpdateDoctorFCMTokenAPI = async (id, data) => {
    const res = await axios.patch(`${DOCTOR_FCM_UPDATE_URL}/${id}`, data);
    return res;
}

export const UpdateDoctorDetailsAPI = async (id, data) => {
    const res = await axios.patch(`${DOCTOR_DETAILS_UPDATE_URL}/${id}`, data);
    return res;
}

export const EditTimeLineAPI = async (id, params) => {
    const res = await axios.patch(`${TIMELINE_BASE_URL}/${id}`, params).catch((e) => { console.log(e) });
    return res;
};

export const EditSpecialityAPI = async (id, params) => {
    const res = await axios.patch(`${SPECIALITY_BASE_URL}/${id}`, params).catch((e) => { console.log(e) });
    return res;
};

export const EditQualificationAPI = async (id, params) => {
    const res = await axios.patch(`${QUALIFICATION_BASE_URL}/${id}`, params).catch((e) => { console.log(e) });
    return res;
};

// DELETE
export const RemoveTimeLineAPI = async (id, data) => {
    const res = await axios.delete(`${TIMELINE_BASE_URL}/${id}`, { data });
    return res;
}

export const RemoveSpecialityAPI = async (id, data) => {
    const res = await axios.delete(`${SPECIALITY_BASE_URL}/${id}`, { data });
    return res;
}

export const RemoveQualificationAPI = async (id, data) => {
    const res = await axios.delete(`${QUALIFICATION_BASE_URL}/${id}`, { data });
    return res;
}
