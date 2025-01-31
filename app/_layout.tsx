import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '../context/authContext'

const _layout = () => {
  return (
    <AuthProvider>
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      />
    </AuthProvider>
  )
}

export default _layout
