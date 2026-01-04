import Toast from "react-native-toast-message";

export const SuccessToast = (title, message) => {
    Toast.show({
        type: 'success',
        text1: title,
        text2: message,
    });
}

export const ErrorToast = (title, message) => {
    Toast.show({
        type: 'error',
        text1: title,
        text2: message,
    });
}

export const InfoToast = (title, message) => {
    Toast.show({
        type: 'info',
        text1: title,
        text2: message,
    });
}