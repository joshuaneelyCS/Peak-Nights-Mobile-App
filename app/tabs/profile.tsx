import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { AuthContext } from '../../context/authContext'
import ProfileImage from '@/components/ProfileImage'

const profile = () => {

    // This pulls the user data from AuthContext
    const { user } = useContext(AuthContext);

    const router = useRouter();
  
    return (
        <ScreenWrapper bg='white'>
            {/* Header */}
            <View>
                  <Pressable style={styles.settingsText} onPress={()=> {router.push('/settings')}}>
                      <Text>Settings</Text>
                  </Pressable>
            </View>
            <View style={styles.container}> 
              {/* Profile Image */}
              <View style={styles.header}>
                <ProfileImage source={require('../../assets/images/profile_example.jpg')} size={100} />
                <Text style={styles.nameText}>{user?.first_name ?? "Guest"} {user?.last_name ?? ""}</Text>
              </View>

              <View style={styles.container}>

                <Text>Swing dancer 🕺 | Lover of jazz 🎶 | Always down for a good line dance 💃 #PeakNights</Text>
                <Text>Time Since Being a Member</Text>
                <Text>Links to social Media </Text>

                <View style={styles.profileButtonContainer}>
                  <Pressable style={styles.profileButton} onPress={()=>{router.push('/editProfile')}}>
                    <Text >Edit Profile</Text>
                  </Pressable>
                  <Pressable style={styles.profileButton}>
                    <Text >Share Profile</Text>
                  </Pressable>
                </View>
                <Text>Monthly Stats: How many times attended each month</Text>
                <Text>Total Logged attendances: How many times went</Text>
                <Text>Badges</Text>
                <Text>Dance Level (Peak Level) </Text>
                <View style={styles.profileButtonContainer}>
                  <Text>Favorite Move</Text>
                  <Pressable style={styles.profileButton}>
                    <Text >Add Favorite Move</Text>
                  </Pressable>
                </View>
                <View style={styles.profileButtonContainer}>
                  <Text>Favorite Line Dance</Text>
                  <Pressable style={styles.profileButton}>
                    <Text >Add Favorite Line Dance</Text>
                  </Pressable>
                </View>
                <View style={styles.profileButtonContainer}>
                  <Text>Favorite Dance Song</Text>
                  <Pressable style={styles.profileButton}>
                    <Text >Add Favorite Dance Song</Text>
                  </Pressable>
                </View>

                
                
              </View>
            </View>
        </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  profileButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  profileButton: {
    backgroundColor: theme.colors.darkLight,
    flex: 1,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
  },
  header: {
    height: hp(20),
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',
    gap: 20 // Centers horizontally
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  settingsText: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Pushes content to the right
    paddingHorizontal: 20,
  }
})