import { FETCH_DOCTOR_LIST, REMOVE_DOCTOR_LIST, } from "../constants";

const initialState = [];

export const DoctorsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DOCTOR_LIST:
            return action.data;
        case REMOVE_DOCTOR_LIST:
            return [];
        default:
            return state;
    }
}