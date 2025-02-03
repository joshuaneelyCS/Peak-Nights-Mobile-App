import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import ProfileImage from '../ProfileImage';
import { useRouter } from 'expo-router';

const MemberSearchListComponent = ({name, id, size}) => {
    const router = useRouter();

  return (
    <Pressable
     style={[styles.container, {height: size}]} onPress={() => router.push({ pathname: '/profile/settings/admin/manageMemberships/EditMember', params: { id, name } })}>
        <ProfileImage source={require("@/assets/images/profile_example.jpg")} size={size * 0.8} />
        <View style={styles.memberItem}>
            <Text style={styles.memberText}>{name}</Text>
            <Text style={styles.renewalText}>Last Renewal</Text>
        </View>
        <Text>Status</Text>
    </Pressable>
  );
};

export default MemberSearchListComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems: 'center'
    },
    memberItem: {
        padding: 15,
        flex: 1
    },
    memberText: {
    fontSize: 13,
    fontWeight: 'bold'
    },
    renewalText: {
        fontSize: 12,
        
    }
})