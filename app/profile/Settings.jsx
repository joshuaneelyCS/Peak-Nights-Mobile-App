import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { deleteToken } from '@/helpers/authToken'
import { AuthContext } from '@/context/authContext'

const Settings = () => {
  const { deleteAllUserData } = useContext(AuthContext);
  
  const logout = () => {
    
    deleteToken()

    // delete local user data
    deleteAllUserData()
    
    router.replace('login/Login');
  }

  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={()=>{router.back()}}>
          <Text>Go Back</Text>
        </Pressable>
          <View style={styles.list}>
            <Text>Account</Text>
            <Text>Notifications</Text>
            <Text>Saved</Text>
            <Text style={{fontWeight: 'bold', paddingTop: 5}}>Admin Tools:</Text>
            <Pressable style={styles.backButton} onPress={()=>{router.push('/profile/settings/admin/manageMemberships/viewMembers')}}>
              <Text>Manage Memberships</Text>
            </Pressable>
            <Pressable style={styles.backButton} onPress={()=>{logout()}}>
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
  backButton: {
    paddingBottom: 10
  },
  list: {
    gap: 10
  }
})