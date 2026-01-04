import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthID = async () => {
    try {
        const value = await AsyncStorage.getItem("AuthId");
        if (value !== null) {
            return value;
        } else {
            return '';
        }
    } catch (error) {
        console.error('Error retrieving Auth Id:', error);
        return '';
    }
};

export const storeAuthID = async (value) => {
    try {
        await AsyncStorage.setItem("AuthId", value.toString());
    } catch (error) {
        console.error('Error saving Auth Id:', error);
    }
};

export const removeAuthID = async () => {
    try {
        await AsyncStorage.removeItem("AuthId");
    } catch (error) {
        console.error('Error removing Auth Id:', error);
    }
};

export const getUserRole = async () => {
    try {
        const value = await AsyncStorage.getItem("UserRole");
        if (value !== null) {
            return value;
        } else {
            return '';
        }
    } catch (error) {
        console.error('Error retrieving User Role:', error);
        return '';
    }
};

export const storeUserRole = async (value) => {
    try {
        await AsyncStorage.setItem("UserRole", value.toString());
    } catch (error) {
        console.error('Error saving User Role:', error);
    }
};

export const removeUserRole = async () => {
    try {
        await AsyncStorage.removeItem("UserRole");
    } catch (error) {
        console.error('Error removing User Role:', error);
    }
};

export const getLastCity = async () => {
    try {
        const value = await AsyncStorage.getItem("LastCity");
        if (value !== null) {
            return value;
        } else {
            return '';
        }
    } catch (error) {
        console.error('Error retrieving Last City:', error);
        return '';
    }
};

export const storeLastCity = async (value) => {
    try {
        await AsyncStorage.setItem("LastCity", value.toString());
    } catch (error) {
        console.error('Error saving Last City:', error);
    }
};
