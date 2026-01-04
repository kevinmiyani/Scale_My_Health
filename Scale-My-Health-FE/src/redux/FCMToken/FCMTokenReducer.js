import { FETCH_FCM_TOKEN, REMOVE_FCM_TOKEN, } from "../constants";

const initialState = '';

export const FCMTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FCM_TOKEN:
            return action.data;
        case REMOVE_FCM_TOKEN:
            return '';
        default:
            return state;
    }
}