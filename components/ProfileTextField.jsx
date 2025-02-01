import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'

const ProfileTextField = ({title, style = {}, inputRef, ...props}) => {
  return (
    <View style={[styles.container, style && style]}>
      <View style={styles.titleContainer}>
        <Text>{title}</Text>
      </View>
      <View style={{flex:1, borderBottomWidth: 0.17, borderColor: theme.colors.darkLight}}>
        <TextInput
        style={{flex:1}}
        placeholderTextColor={theme.colors.textLight}
        ref={inputRef && inputRef}
        {...props}
        />
      </View>
    </View>
  )
}

export default ProfileTextField

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      height: hp(5.5),
      borderColor: theme.colors.darkLight,
      paddingLeft: 5,
      gap: 15
  },
  titleContainer: {
    width: wp(20),
    justifyContent: 'center',
  }
})