import { FETCH_DOCTOR_LIST, REMOVE_DOCTOR_LIST } from "../constants"

export const setDoctorListInRedux = (data) => {
    return {
        type: FETCH_DOCTOR_LIST,
        data: data,
    }
}

export const removeDoctorListFromRedux = () => {
    return {
        type: REMOVE_DOCTOR_LIST,
        data: [],
    }
}