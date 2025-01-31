// src/services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error("Error storing user data:", error);
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error retrieving user data:", error);
        return null;
    }
};

export const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (error) {
        console.error("Error logging out:", error);
    }
};