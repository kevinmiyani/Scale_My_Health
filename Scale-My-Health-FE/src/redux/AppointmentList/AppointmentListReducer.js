import { FETCH_APPOINTMENT_LIST, REMOVE_APPOINTMENT_LIST, } from "../constants";

const initialState = [];

export const AppointmentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APPOINTMENT_LIST:
            return action.data;
        case REMOVE_APPOINTMENT_LIST:
            return [];
        default:
            return state;
    }
}