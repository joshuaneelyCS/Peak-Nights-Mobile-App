import { AuthContext } from '@/context/authContext';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const MyPass = () => {
    
    const { user } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Your Membership QR Code</Text>
            {user.user_id ? (
                <QRCode
                    value={user.user_id} // Convert number to string
                    size={200} // Adjust size
                    backgroundColor="white"
                    color="black"
                />
            ) : (
                <Text>No Membership Number Available</Text>
            )}
        </View>
    );
};

export default MyPass

const styles = StyleSheet.create({})