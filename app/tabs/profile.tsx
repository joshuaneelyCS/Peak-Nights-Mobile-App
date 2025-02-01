import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { AuthContext } from '../../context/authContext'

const profile = () => {

    // This pulls the user data from AuthContext
    const { user } = useContext(AuthContext);

    const router = useRouter();
  
    return (
        <ScreenWrapper bg='white'>
            {/* Header */}
            <View style={styles.container}> 
              <View>
                  <Pressable style={styles.settingsText} onPress={()=> {router.push('/settings')}}>
                      <Text>Settings</Text>
                  </Pressable>
              </View>
              <View style={styles.header}>
                  <View style={styles.circle}>
                  <Image style={styles.image} resizeMode='contain' source={require('../../assets/images/profile_example.jpg')} />
                  </View>
                  <Text style={styles.nameText}>{user?.first_name ?? "Guest"} {user?.last_name ?? ""}</Text>
              </View>
            </View>
        </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: hp(20),
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',
    gap: 20 // Centers horizontally
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden', // Ensures the image stays within the circle
    justifyContent: 'center', // Centers image inside the circle
    alignItems: 'center',
  },
  image: {
    width: '100%',  // Ensures image covers the entire container
    height: '100%',
    resizeMode: 'cover', // Ensures the image fills the space without distorting
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