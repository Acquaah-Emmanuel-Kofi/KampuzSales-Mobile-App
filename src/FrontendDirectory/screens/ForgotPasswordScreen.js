import React, { useState } from "react";
import { StatusBar, StyleSheet ,Text, TextInput, View } from "react-native";
import { sendPasswordResetLink } from "../../BackendDirectory/authentications/authentications";
import { CustomButton } from "../components/buttons";
import  AppColors  from "../data/Colors";

function ForgotPasswordScreen({navigation}) {

    const [ email, setEmail ] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <Text style={styles.heading}>Forgot Password</Text>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    placeholderTextColor={AppColors.secondary}
                    placeholder="robert.sam@gmail.com" 
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={styles.customButton}>
                <CustomButton onPress={() => {
                    // navigation.navigate("ResetPassword")
                    sendPasswordResetLink(email)
                    // navigation.navigate("Login")
                }} buttonText={"Send reset link"} />
            </View>
            <Text style={styles.switchLoginScreenText}>
                Don’t have an account? <Text onPress={() => navigation.navigate("Register")} style={styles.switchLoginScreenLinkText}>Sign up</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        color: AppColors.black,
        marginBottom: 20,
        letterSpacing: 2,
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
        display: 'flex',
        alignItems: 'center'
    },
    switchLoginScreenLinkText: {
        color: AppColors.primary,
        display: 'flex',
        alignItems: 'center'
    },
  });

export default ForgotPasswordScreen;