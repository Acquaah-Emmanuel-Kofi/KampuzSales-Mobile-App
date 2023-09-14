import React, { useState } from "react";
import { StyleSheet ,Text, TextInput, View, ScrollView, Image, StatusBar, Pressable } from "react-native";
import { authLoading, loginUser } from "../../BackendDirectory/authentications/authentications";
import { CustomButton, PlaneCustomButton } from "../components/buttons";
import  AppColors  from "../data/Colors";
import CustomGoogleButton from "../../BackendDirectory/authentications/CustomGoogleButton";

function LoginScreen({navigation}) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic" 
                contentContainerStyle={styles.signInContainer}>
            <View style={styles.headerBox}>
                <Image style={styles.logo} source={require("../../../assets/KampuzSales-Logo.png")} />
                <Text style={styles.heading}>Welcome Back , Login</Text>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.textInputBox} 
                    placeholderTextColor={AppColors.secondary}
                    placeholder="robert.sam@gmail.com" 
                    keyboardType="email-address"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Password</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    secureTextEntry={true}
                    placeholderTextColor={AppColors.secondary}
                    placeholder="*************" 
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <Pressable style={styles.inputBox}  onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPasswordLinkText}>Forgot password?</Text>
            </Pressable>
            <View style={styles.customButton}>
                <CustomButton onPress={() => {
                    loginUser(email, password)
                }} buttonText={authLoading ? "Signing in..." : "Sign In"} />
            </View>
            <Text style={styles.switchLoginScreenText}>
                Don’t have an account? <Text onPress={() => navigation.navigate("Register")} style={styles.switchLoginScreenLinkText}>Sign up!</Text>
            </Text>
            <Text style={{
                color: AppColors.subBlack,
                fontSize: 14,
            }}>Or</Text>
            <CustomGoogleButton />
            <PlaneCustomButton buttonText={"Sign in with OTP"} onPress={() => navigation.navigate("OtpAuth")} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
    signInContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },
    headerBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 110,
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        color: AppColors.black,
        marginBottom: 20,
    },
    inputBox: {
        width: '85%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: AppColors.labelGray,
        fontWeight: '500',
        marginBottom: 6,
    },
    textInputBox: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.borderGray,
        paddingHorizontal: 10,
        paddingVertical: 14,
        color: AppColors.secondary,
        gap: 8,
    },
    customButton: {
        width: '100%',
        paddingHorizontal: 30,
    },
    switchLoginScreenText: {
        fontSize: 14,
        fontWeight: '400',
        color: AppColors.secondary,
        marginVertical: 12,
    },
    switchLoginScreenLinkText: {
        color: AppColors.primary,
    },
    forgotPasswordLinkText: {
        color: AppColors.primary,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'right',
    }
  });

export default LoginScreen;