import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ProfileImage from './ProfileImage';

const UserListItem = ({name, size}) => {
  return (
    <View style={[styles.container, {height: size}]}>
        <ProfileImage source={require("../assets/images/profile_example.jpg")} size={size * 0.8} />
        <View style={styles.memberItem}>
            <Text style={styles.memberText}>{name}</Text>
            <Text style={styles.renewalText}>Last Renewal</Text>
        </View>
        <Text>Status</Text>
    </View>
  );
};

export default UserListItem;

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