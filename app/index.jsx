import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getToken } from '../helpers/authToken';
import { hasVisitedWelcome } from '../helpers/hasVisited';
import { AuthContext } from '../context/authContext';

const Index = () => {
    const { loadUserData, user } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false); // ✅ Prevents re-running

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = await getToken();
                if (!token) {
                    return handleNoUser();
                }
                await loadUserData(); // ✅ Load user first
                setHasCheckedAuth(true); // ✅ Allow the next useEffect() to trigger
            } catch (error) {
                console.error("Error checking authentication:", error);
                handleNoUser();
            }
        };

        checkAuthentication();
    }, []); // ✅ Runs only once

    // ✅ Second `useEffect()` runs only when `user` updates
    useEffect(() => {
        if (hasCheckedAuth) {
            if (user) {
                console.log("User found!", user.first_name);
                router.replace('tabs');
            } else {
                console.log("Login worked but no user data found.");
                handleNoUser();
            }
        }
    }, [user]); // ✅ Runs when `user` updates

    const handleNoUser = async () => {
        const visited = await hasVisitedWelcome();
        router.replace(visited ? '/auth/Login' : '/auth/welcome');
    };

    if (isLoading) return null; // ✅ Prevents unnecessary re-renders

    return null; // No UI needed since it's only redirecting
};

export default Index;