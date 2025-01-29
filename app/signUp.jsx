import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios';
import { server } from '../constants/serverConnection'

const SignUp = () => {
    const router = useRouter();

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if(!firstNameRef.current || !lastNameRef.current || !emailRef.current || !passwordRef.current ) {
            Alert.alert('Sign Up', "please fill all the fields!");
            return;
        }
        setLoading(true)
        
        console.log({
            first_name: firstNameRef.current,
            last_name: lastNameRef.current,
            email: emailRef.current,
            password: passwordRef.current,
          });

        try {
            const response = await axios.post(`http://${server.port}:5001/createUser`, {
                first_name: firstNameRef.current, 
                last_name: lastNameRef.current, 
                email: emailRef.current, 
                password: passwordRef.current})
            
            if (response.data.success) {
                console.log("Connected to server successfully");
                console.log(`User Created. ID: ${response.data.user_id}`)
                router.push('tabs');
              } else {
                console.log("Connected to server. But it wasn't a success.");
              }
            
            
        } catch(error) {
            Alert.alert("Oops! Something went wrong. Please Try Again")
        }
        setLoading(false)
    }

  return (
    <ScreenWrapper bg='white'>
        <StatusBar style="dark" />
            <View style={styles.container}>
                <Pressable onPress={()=>{router.back()}}>
                    <Text style={styles.backButtonText}>Back</Text>
                </Pressable>

                <View>
                    <Text style={styles.welcomeText}>Let's</Text>
                    <Text style={styles.welcomeText}>Get Started</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                        Please enter the details to create an account
                    </Text>
                    <Input
                        placeholder='First Name'
                        onChangeText={value=> firstNameRef.current = value}
                    />
                    <Input
                        placeholder='Last Name'
                        onChangeText={value=> lastNameRef.current = value}
                    />
                    <Input
                        placeholder='Enter your email'
                        onChangeText={value=> emailRef.current = value}
                    />
                    <Input
                        placeholder='Enter your password'
                        secureTextEntry
                        onChangeText={value=> passwordRef.current = value}
                    />
                    <Button title={'Sign Up'} loading={loading} onPress={onSubmit} />
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account!
                    </Text>
                    <Pressable onPress={()=> router.push('login')}>
                        <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
    </ScreenWrapper>
  )
}

export default SignUp

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