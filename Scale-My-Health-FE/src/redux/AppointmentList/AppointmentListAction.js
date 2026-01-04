import { FETCH_APPOINTMENT_LIST, REMOVE_APPOINTMENT_LIST } from "../constants"

export const setAppointmentListInRedux = (data) => {
    return {
        type: FETCH_APPOINTMENT_LIST,
        data: data,
    }
}

export const removeAppointmentListFromRedux = () => {
    return {
        type: REMOVE_APPOINTMENT_LIST,
        data: [],
    }
}