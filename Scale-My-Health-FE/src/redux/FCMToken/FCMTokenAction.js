import { FETCH_FCM_TOKEN, REMOVE_FCM_TOKEN, } from "../constants"

export const setFCMTokenInRedux = (data) => {
    return {
        type: FETCH_FCM_TOKEN,
        data: data,
    }
}

export const removeFCMTokenFromRedux = () => {
    return {
        type: REMOVE_FCM_TOKEN,
        data: '',
    }
}