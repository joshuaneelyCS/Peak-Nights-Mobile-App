import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '../context/authContext'
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack 
          screenOptions={{
            headerShown: false
          }}
        />
      </AuthProvider>
    </GestureHandlerRootView>
  )
}

export default _layout
