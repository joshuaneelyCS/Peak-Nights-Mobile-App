import { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getToken, storeToken } from '../helpers/authToken';
import { hasVisitedWelcome } from '../helpers/hasVisited';
import { AuthContext } from '../context/authContext'

const Index = () => {

    const { loadUser } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {

            try {
                const token = await getToken();
                if (token) {
                    if (loadUser() != null) {
                        router.replace('tabs'); // Redirect to the main app
                    } else {
                        const visited = await hasVisitedWelcome(); // Ensure this is awaited if async
                    router.replace(visited ? 'login' : 'welcome');
                    }
                } else {
                    const visited = await hasVisitedWelcome(); // Ensure this is awaited if async
                    router.replace(visited ? 'login' : 'welcome');
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                router.replace('login'); // Default to login on error
            }
        };

        checkAuthentication();
    }, []);

    return null; // No UI needed since it's only redirecting
};

export default Index;

const styles = StyleSheet.create({});
