import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper';
import ProfileImage from '../components/ProfileImage';
import ProfileTextField from '../components/ProfileTextField'

const pickImage = () => {

}

const editProfile = () => {

    const router = useRouter();
    const first_name_ref = useRef("");
    const last_name_ref = useRef("");
  return (
    <ScreenWrapper bg='white'>
        <View style={styles.container}>
            <Pressable onPress={()=>{router.back()}}>
                <Text>Back</Text>
            </Pressable>
            <Pressable onPress={()=>{pickImage()}} style={styles.profileImage}>
                <ProfileImage source={require('../assets/images/profile_example.jpg')} size={100} />
                <Text>Edit Picture</Text>
            </Pressable>
            <View style={{paddingTop: 15}}>
                <ProfileTextField 
                    title="First Name"
                    placeholder="Enter your first name"
                    inputRef={first_name_ref}
                    style={{borderTopWidth: 0.17,}} 
                    />
                <ProfileTextField 
                title="Last Name"
                placeholder="Enter your last name"
                inputRef={first_name_ref}
                />
                <ProfileTextField 
                title="Bio"
                placeholder="Enter text here"
                inputRef={first_name_ref}
                />
                <ProfileTextField 
                title="Instagram"
                placeholder="Insert link here"
                inputRef={first_name_ref}
                />
                <ProfileTextField 
                title="Time Start"
                placeholder="Insert link here"
                inputRef={first_name_ref}
                />
            </View>
            
        </View>
    </ScreenWrapper>
  )
}

export default editProfile

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    profileImage: {
        alignItems: 'center',
        gap: 10,
    }

})