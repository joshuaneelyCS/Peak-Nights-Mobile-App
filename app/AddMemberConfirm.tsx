import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const AddMemberConfirm = () => {
    // This is passed from the previous page
    const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>addMemberConfirm</Text>
    </View>
  )
}

export default AddMemberConfirm

const styles = StyleSheet.create({})