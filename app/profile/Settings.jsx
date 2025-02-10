import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { deleteToken } from '@/helpers/authToken'
import { AuthContext } from '@/context/authContext'
import Icon from 'react-native-vector-icons/Ionicons';

const Settings = () => {
  const { deleteAllUserData } = useContext(AuthContext);
  
  const logout = () => {
    
    deleteToken()

    // delete local user data
    deleteAllUserData()
    
    router.replace('auth/Login');
  }

  const router = useRouter();
  return (
    <ScreenWrapper>
      <Pressable style={styles.backButton} onPress={()=>{router.back()}}>
        <Icon name="chevron-back-outline" size={30} color="#000" />
      </Pressable>
      <View style={styles.container}>
          <View style={styles.list}>
            <Text style={{paddingTop: 10}}>Account</Text>
            <Text>Notifications</Text>
            <Text>Saved</Text>
            <Text style={{fontWeight: 'bold', paddingTop: 5}}>Admin Tools:</Text>
            <Pressable style={styles.listItem} onPress={()=>{router.push('/profile/settings/admin/manageMemberships/viewMembers')}}>
              <Text>Manage Memberships</Text>
            </Pressable>
            <Pressable style={styles.listItem} onPress={()=>{router.push('/profile/settings/admin/manageCourse/CourseOverview')}}>
              <Text>Manage Course</Text>
            </Pressable>
            <Pressable style={{paddingTop: 5}} onPress={()=>{logout()}}>
              <Text>Logout</Text>
            </Pressable>
            
          </View>
      </View>
    </ScreenWrapper>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  listItem: {
    paddingLeft: 10
  },
  backButton: {
    paddingLeft: 10
  },
  list: {
    gap: 10
  }
})