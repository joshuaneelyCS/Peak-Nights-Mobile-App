import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { server } from '@/constants/serverConnection';
import ScreenWrapper from '@/components/ScreenWrapper';
import ProfileImage from '@/components/ProfileImage';

const API_URL_GET_USER = `http://${server.port}:5001/users/getData`;
const API_URL_ADD_MEMBER = `http://${server.port}:5001/members/addMember`;

const AddMemberConfirm = () => {

    // This is passed from the previous page
    const { id, name } = useLocalSearchParams();
    const router = useRouter();
    const [userToShow, setUserToShow] = useState();
    
    useEffect(() => {
      getUserData();
    }, []);

    useEffect(()=>{
      //re-render if necessary
    }, [userToShow])

    const getUserData = async () => {
      try {
        const response = await axios.get(
          API_URL_GET_USER, { 
            params: { 
              user_id: id,
              table: 'users',
              fields: ["first_name", "last_name"]  
            }
        });
        
        if (response.data.success) {
          setUserToShow(response.data.user_data)
        }

      } catch(error) {
        console.log(error)
        Alert.alert("Sorry something went wrong. Could not fetch user")
      }
    }

    const addMember = async () => {
      try {
      const request = await axios.post(
        API_URL_ADD_MEMBER, {
          user_id: id
        });

        if (request.data.success) {
          router.back();
        } else {
          Alert.alert("Sorry there was an error storing as member")
        }
      } catch (error) {

      }
      
    }

  return (
    <ScreenWrapper bg='white'>
      <Pressable onPress={()=>{router.back()}}>
        <Text style={{paddingLeft: 10}}>Back</Text>
      </Pressable>
      <View style={styles.container}>
        <ProfileImage source={require("@/assets/images/profile_example.jpg")} size={100} />
        <Text>{userToShow?.["first_name"] || " "} {userToShow?.["last_name"] || " "}</Text>
        <View style={styles.addMember}>
          <Pressable onPress={addMember}>
            <Text style={{fontSize: 30}}>Add Member</Text>
          </Pressable>
        </View>
      </View>
      
    </ScreenWrapper>
  )
}

export default AddMemberConfirm

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,

  },
  addMember: {
    paddingVertical: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})