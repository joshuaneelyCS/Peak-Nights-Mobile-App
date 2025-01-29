import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/ScreenWrapper'

const profile = () => {
  return (
  <ScreenWrapper bg='white'>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circle}>
          <Image style={styles.image} resizeMode='contain' source={require('../../assets/images/profile_example.jpg')} />
        </View>
        <Text style={styles.nameText}>Joshua Neely</Text>
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
    alignItems: 'center', // Centers horizontally
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

  }
})