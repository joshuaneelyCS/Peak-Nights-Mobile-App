import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeVisitFlag() {
    await AsyncStorage.setItem('hasVisitedWelcome', 'true')
}

export async function hasVisitedWelcome() {
    const value = await AsyncStorage.getItem('hasVisitedWelcome');
    return value === 'true';
}