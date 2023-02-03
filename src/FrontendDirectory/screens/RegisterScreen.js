import React from "react";
import { StyleSheet ,Text, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import GoogleCustomButton from "../components/GoogleCustomButton";
import  Colors  from "../data/colors";

function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create New Account</Text>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Name*</Text>
                <TextInput style={styles.textInputBox} placeholder="Robert Sam" />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    placeholder="robert.sam@gmail.com" 
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Phone number*</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    keyboardType = 'numeric'
                    placeholder="Eg. +233 XXX XXX XXX" 
                />
            </View>
            <CustomButton buttonText={"Sign Up"} />
            <GoogleCustomButton buttonText={"Sign up with Google"} />
            <Text style={styles.switchLoginScreenText}>
                Already have an account? <Text style={styles.switchLoginScreenLinkText}>Sign in</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 20,
        letterSpacing: 2,
    },
    inputBox: {
        width: '85%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        fonfontStyle: 'normal',
        color: Colors.labelGray,
        fontWeight: '500',
        marginBottom: 6,
    },
    textInputBox: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.borderGray,
        paddingHorizontal: 10,
        paddingVertical: 14,
        color: Colors.secondary,
        gap: 8,
    },
    switchLoginScreenText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.secondary,
        marginVertical: 12,
    },
    switchLoginScreenLinkText: {
        color: Colors.main,
    }
  });

export default RegisterScreen;