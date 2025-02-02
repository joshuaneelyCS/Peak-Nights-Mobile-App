import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper';
import ProfileImage from '../components/ProfileImage';
import ProfileTextField from '../components/ProfileTextField'
import { theme } from '@/constants/theme';
import { AuthContext } from '../context/authContext'
import axios from 'axios';
import { server } from '@/constants/serverConnection';

const API_URL_SET_DATA = `http://${server.port}:5001/users/setData`

const EditProfile = () => {

    // This pulls the user data from AuthContext
    const { user, addUserData } = useContext(AuthContext);

    const router = useRouter();

    const [firstName, setFirstName] = useState(user.first_name ?? '');
    const [lastName, setLastName] = useState(user.last_name ?? '');
    const [bio, setBio] = useState(user.bio ?? '');
    const [instagram, setInstagram] = useState(user.instagram ?? '');

    const pickImage = () => {

    }
    
    const saveData = async () => {
        try {
            const response = await axios.post(API_URL_SET_DATA, {
                user_id: user.user_id,
                key: { user_id: user.user_id, },
                users: { 
                    first_name: firstName, 
                    last_name: lastName
                },
                user_profiles: {
                    bio: bio,
                    instagram: instagram
                }
            });
    
            if (response.data.success) {
                // Data saved successfully
                addUserData({ 
                    first_name: firstName, 
                    last_name: lastName,
                    bio: bio,
                    instagram: instagram
                })
                router.back();
            } else {
                console.error("Error saving data:", response.data.message);
            }
        } catch (error) {
            console.error("Failed to save data:", error);
        }
    };
    
  return (
    <ScreenWrapper bg='white'>
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={()=>{router.back()}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>Back</Text>
                </Pressable>
                <Pressable onPress={saveData}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: theme.colors.primary}}>Save</Text>
                </Pressable>
            </View>
            
            <Pressable onPress={()=>{pickImage}} style={styles.profileImage}>
                <ProfileImage source={require('../assets/images/profile_example.jpg')} size={100} />
                <Text>Edit Picture</Text>
            </Pressable>
            <View style={{paddingTop: 15}}>
                <ProfileTextField 
                title="First Name"
                placeholder="Enter your first name"
                style={{borderTopWidth: 0.17,}} 
                defaultValue={firstName}
                onChangeText={setFirstName}
                />
                <ProfileTextField 
                title="Last Name"
                placeholder="Enter your last name" 
                defaultValue={lastName}
                onChangeText={setLastName}
                />
                <ProfileTextField 
                title="Bio"
                placeholder="Enter text here"
                defaultValue={bio}
                onChangeText={setBio}
                />
                <ProfileTextField 
                title="Instagram"
                placeholder="Insert link here"
                defaultValue={instagram}
                onChangeText={setInstagram}
                />
                <ProfileTextField 
                title="Time Start"
                placeholder="Select Data"
                />
            </View>
            
        </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    container: {
        paddingHorizontal: 10,
    },
    profileImage: {
        alignItems: 'center',
        gap: 10,
    }

})