import { useEffect, useState } from "react"
import Geolocation from 'react-native-geolocation-service';
import { useLocationAccessPermission } from "./useLocationAccessPermission";

export const useCurrentLocation = () => {

    const { permissionsGranted, checkAndRequestPermissions } = useLocationAccessPermission();
    const [city, setCity] = useState('');
    const [coordinate, setCoordinate] = useState(null);

    useEffect(() => {
        if (permissionsGranted) {
            getCurrentLocation();
        } else {
            checkAndRequestPermissions();
        }
    }, [permissionsGranted])

    useEffect(() => {
        if (coordinate != null) getAddressFromCoordinates(coordinate);
    }, [coordinate])

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (pos) => { setCoordinate(pos?.coords); },
            (error) => { console.log("Error " + error.code, error.message); },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
    }

    const getAddressFromCoordinates = async (coordinate) => {
        try {
            const { latitude, longitude } = coordinate;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();

            const { address } = data;

            setCity(
                address.city ?
                    address.city :
                    address.state_district ? address.state_district.toString().replace(" District", "") : "");
        } catch (error) {
            console.log('Error retrieving address:', error);
        }
    }

    return {
        city,
    }
}
