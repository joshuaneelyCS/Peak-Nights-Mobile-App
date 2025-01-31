import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeToken(token) {
    try {
        if (token === null || token === undefined) {
            await AsyncStorage.removeItem('token'); // Remove instead of storing null
        } else {
            console.log(`token:${token} stored! `)
            await AsyncStorage.setItem('token', token);
        }
    } catch (error) {
        console.error("Error storing token:", error);
    }
}

export async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        return token || null;
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
}

export async function deleteToken() {
    try {
        await AsyncStorage.removeItem('token'); // Remove the token
        console.log("Token deleted successfully!");
    } catch {
        console.error("Error retrieving token:", error);
        return null;
    }
}