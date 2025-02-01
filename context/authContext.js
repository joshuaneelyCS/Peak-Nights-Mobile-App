// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserModel } from '../models/userModel'
import { getUser, storeUser, removeUser } from '../services/authServices';

// allows the pages to pull from the variable user
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // Public variable (State) that other script pull from for user data
    const [user, setUser] = useState(null);  

    // Runs right when the component is rendered
    // When app is booted up
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
    
        try {
            const storedUser = await getUser();
    
            if (storedUser) {
                setUser(storedUser);

            } else {
                console.log("AuthProvider: No user found in storage.");
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

        const setUserData = async (userData) => {
            const newUser = { ...UserModel, ...userData };
        
            await storeUser(newUser);
        
            setUser(newUser);
        };

    // ✅ Update user data while keeping existing fields
    const addUserData = async (newData) => {
        try {
            if (!user) {
                console.warn("No user data found, initializing new user.");
                return;
            }

            const updatedUser = { ...user, ...newData }; // Merge old & new data

            await storeUser(updatedUser);  // Save to AsyncStorage
            setUser(updatedUser);  // Update state
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    // ✅ Remove a specific key from user data
    const removeUserData = async (key) => {
        try {
            if (!user || !(key in user)) {
                console.warn(`Key "${key}" does not exist in user data.`);
                return;
            }

            const updatedUser = { ...user, ...UserModel};
            delete updatedUser[key];  // Remove the key

            await storeUser(updatedUser);  // Save to AsyncStorage
            setUser(updatedUser);  // Update state
        } catch (error) {
            console.error("Error removing user data:", error);
        }
    };
    
    // Logout function
    const deleteAllUserData = async () => {
        
        // removes the user item from storage
        await removeUser();

        // removes the data from the public variable
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loadUserData, setUserData, addUserData, addUserData, deleteAllUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
