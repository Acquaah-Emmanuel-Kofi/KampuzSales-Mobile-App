import React, { useState } from "react";
import { StyleSheet ,Text, TextInput, View, ScrollView, Image, StatusBar } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { loginUser } from "../../BackendDirectory/authentications/authentications";
import { CustomButton, GoogleCustomButton } from "../components/buttons";
import  Colors  from "../data/colors";

function LoginScreen({navigation}) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.signInContainer}>
            <View style={styles.headerBox}>
                <Image style={styles.logo} source={require("../data/images/KampuzSales-Logo.png")} />
                <Text style={styles.heading}>Welcome Back , Login</Text>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.textInputBox} 
                    placeholderTextColor={Colors.secondary}
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
                    placeholderTextColor={Colors.secondary}
                    placeholder="*************" 
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <Pressable style={styles.inputBox}  onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPasswordLinkText}>Forgot password</Text>
            </Pressable>
            <View style={styles.customButton}>
                <CustomButton onPress={() => {
                    loginUser(email, password)
                    setLoading(true)
                }} buttonText={loading ? "Signing in..." : "Sign In"} />
            </View>
            <GoogleCustomButton buttonText={"Sign in with Google"} />
            <Text style={styles.switchLoginScreenText}>
                Don’t have an account? <Text onPress={() => navigation.navigate("Register")} style={styles.switchLoginScreenLinkText}>Sign up</Text>
            </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    signInContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        marginTop: 80,
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
        color: Colors.black,
        marginBottom: 20,
    },
    inputBox: {
        width: '85%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
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
    customButton: {
        width: '100%',
        paddingHorizontal: 30,
    },
    switchLoginScreenText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.secondary,
        marginVertical: 12,
    },
    switchLoginScreenLinkText: {
        color: Colors.main,
    },
    forgotPasswordLinkText: {
        color: Colors.main,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'right',
    }
  });

export default LoginScreen;