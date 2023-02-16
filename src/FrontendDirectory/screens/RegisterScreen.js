import React from "react";
import { StyleSheet ,Text, TextInput, View, ScrollView, Image } from "react-native";
import { CustomButton, GoogleCustomButton } from "../components/buttons";
import  Colors  from "../data/colors";

function RegisterScreen({navigation}) {

    return (
        <View style={styles.container}>
            <ScrollView  contentContainerStyle={styles.signUpContainer}>
            <View style={styles.headerBox}>
                <Image style={styles.logo} source={require("../data/images/KampuzSales-Logo.png")} />
                <Text style={styles.heading}>Create New Account</Text>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Name*</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    placeholderTextColor={Colors.secondary}
                    placeholder="Robert Sam" 
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Phone number*</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    keyboardType = 'numeric'
                    placeholderTextColor={Colors.secondary}
                    placeholder="Eg. +233 XXX XXX XXX" 
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.textInputBox} 
                    secureTextEntry={true}
                    placeholderTextColor={Colors.secondary}
                    placeholder="*************" 
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.textInputBox} 
                    secureTextEntry={true}
                    placeholderTextColor={Colors.secondary}
                    placeholder="*************" 
                />
            </View>
            <CustomButton buttonText={"Sign Up"} />
            <GoogleCustomButton buttonText={"Sign up with Google"} />
            <Text style={styles.switchLoginScreenText}>
                Already have an account? <Text onPress={() => navigation.navigate("Login")} style={styles.switchLoginScreenLinkText}>Sign in</Text>
            </Text>
            <View style={{height: 100}}></View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    signUpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 60,
    },
    headerBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        marginRight: -20,
    },
    heading: {
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 20,
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