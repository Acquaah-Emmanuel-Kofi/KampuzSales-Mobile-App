import React, { useState } from "react";
import { StyleSheet ,Text, TextInput, View, ScrollView, Image, StatusBar } from "react-native";
import { registerUser } from "../../BackendDirectory/authentications/authentications";
import { CustomButton, GoogleCustomButton } from "../components/buttons";
import  Colors  from "../data/colors";


function RegisterScreen({navigation}) {

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ loading, setLoading ] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <ScrollView  contentContainerStyle={styles.signUpContainer}>
            <View style={styles.headerBox}>
                <Image style={styles.logo} source={require("../data/images/KampuzSales-Logo.png")} />
                <Text style={styles.heading}>Create New Account</Text>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Name</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    placeholderTextColor={Colors.secondary}
                    placeholder="Robert Sam" 
                    onChangeText={(username) => setUsername(username)}
                    autoCorrect={false}
                />
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
                <Text style={styles.label}>Phone number</Text>
                <TextInput 
                    style={styles.textInputBox} 
                    keyboardType = 'numeric'
                    placeholderTextColor={Colors.secondary}
                    placeholder="Eg. +233 XXX XXX XXX"
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
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
            <View style={styles.customButton}>
                <CustomButton onPress={() => {
                    registerUser(email, password, username, phoneNumber)
                    setLoading(true)
                }} buttonText={loading ? "Signing up..." : "Sign Up"} />
            </View>
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
    }
  });

export default RegisterScreen;