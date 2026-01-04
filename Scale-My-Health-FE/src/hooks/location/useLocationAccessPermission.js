import { useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const useLocationAccessPermission = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);

    const checkAndRequestPermissions = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );

                setPermissionsGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else if (Platform.OS === 'ios') {
                const locationStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

                if (locationStatus !== RESULTS.GRANTED) {
                    await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                }

                const updatedLocationStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                setPermissionsGranted(updatedLocationStatus === RESULTS.GRANTED);
                return updatedLocationStatus === RESULTS.GRANTED;
            }
        } catch (error) {
            console.log('Error checking or requesting location permission:', error);
        }
    };

    return { permissionsGranted, checkAndRequestPermissions };
};