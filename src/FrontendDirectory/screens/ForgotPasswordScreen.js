import React from "react";
import { Pressable, StyleSheet ,Text, TextInput, View } from "react-native";
import { CustomButton } from "../components/buttons";
import  Colors  from "../data/colors";

function ForgotPasswordScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Forgot Password</Text>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    placeholderTextColor={Colors.secondary}
                    placeholder="robert.sam@gmail.com" 
                />
            </View>
            <CustomButton onPress={() => navigation.navigate("ResetPassword")} buttonText={"Send reset link"} />
            <Text style={styles.switchLoginScreenText}>
                Don’t have an account? <Pressable onPress={() => navigation.navigate("Register")}><Text style={styles.switchLoginScreenLinkText}>Sign up</Text></Pressable>
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
        display: 'flex',
        alignItems: 'center'
    },
    switchLoginScreenLinkText: {
        color: Colors.main,
        display: 'flex',
        alignItems: 'center'
    },
  });

export default ForgotPasswordScreen;