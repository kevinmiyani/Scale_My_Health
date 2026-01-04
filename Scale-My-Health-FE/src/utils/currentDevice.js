import { Platform } from "react-native"
import DeviceInfo from "react-native-device-info"

export const currentDevice = async () => {
    const brand = DeviceInfo.getBrand();
    const deviceId = DeviceInfo.getDeviceId();
    const uniqueId = await DeviceInfo.getUniqueId();
    return {
        device: `${brand}-${deviceId}-${uniqueId}`,
        os: Platform.OS,
    }
}