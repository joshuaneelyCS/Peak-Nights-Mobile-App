import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Input from '../components/Input'
import Button from '../components/Button'
import { server } from '../constants/serverConnection'
import axios from 'axios'
import { getToken, storeToken } from '../helpers/authToken'
import { AuthProvider, AuthContext } from '../context/authContext'

const Login = () => {

    const { login } = useContext(AuthContext);

    // Router that allows movement between screens
    const router = useRouter();

    // Variables from text fields
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    // When user taps "login"
    const onSubmit = async () => {

        // Return alert if any fields are empty
        if(!emailRef.current || !passwordRef.current) {
            Alert.alert('Login', "please fill all the fields!");
            return;
        }

        // Start loading bar
        setLoading(true)

        try {

            // Send data to server to be authenticated
            const response = await axios.post(`http://${server.port}:5001/login`, {
                email: emailRef.current, 
                password: passwordRef.current})
            
            if (response.data.success) {
                console.log("Got user data!");

                // Stores authetication token
                await storeToken(response.data.auth_token);
                
                try {
                    // Login
                    login({
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        user_id: response.data.user_id
                    });


                    console.log("User successfully stored");
                } catch(error) {
                    console.log("Error: " + error);
                }
                
                // Moves to the main app
                router.push('tabs');

              } else {
                Alert.alert(response.data.message);
              }
            
        } catch(error) {
            console.error(error)
            Alert.alert("Oops! Something went wrong. Please try again")
        }
        setLoading(false)
    }

  return (
        <ScreenWrapper bg='white'>
            <StatusBar style="dark" />
                <View style={styles.container}>
                    <Pressable onPress={()=>{}}>
                        <Text style={styles.backButtonText}></Text>
                    </Pressable>

                    <View>
                        <Text style={styles.welcomeText}>Hey,</Text>
                        <Text style={styles.welcomeText}>Welcome Back</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                            Please login to continue
                        </Text>
                        <Input
                            placeholder='Enter your email'
                            onChangeText={value=> emailRef.current = value}
                        />
                        <Input
                            placeholder='Enter your password'
                            secureTextEntry
                            onChangeText={value=> passwordRef.current = value}
                        />
                        <Text style={styles.forgotPassword}>
                            Forgot Password?
                        </Text>
                        <Button title={'Login'} loading={loading} onPress={onSubmit} />
                    </View>

                    {/* footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Don't have an account?
                        </Text>
                        <Pressable onPress={()=> router.push('signUp')}>
                            <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
                                Sign Up
                            </Text>
                        </Pressable>
                    </View>
                </View>
        </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 40,
        paddingHorizontal: wp(5)
    },
    backButtonText: {
        fontSize: 18
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    form: {
        gap: 25
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    },

})