import { Platform, PermissionsAndroid } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const useFilePermissions = () => {
    const checkPermission = async (type) => {
        const status = await check(type);
        return status === RESULTS.GRANTED;
    };

    const requestFilePermission = async () => {
        let granted = false;
        if (Platform.OS === "android") {
            const androidPermissions = Platform.Version >= 33 ? // Android 13 or Above
                [
                    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                    PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
                    PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
                ] : [
                    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
                ];
            const results = await PermissionsAndroid.requestMultiple(androidPermissions);
            granted = Object.values(results).every(result => result === PermissionsAndroid.RESULTS.GRANTED);
        } else {
            granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY) === RESULTS.GRANTED;
        }
        return granted;
    };

    return { checkPermission, requestFilePermission };
};