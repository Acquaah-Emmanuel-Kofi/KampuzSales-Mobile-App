import React from "react";
import { StyleSheet ,Text, TextInput, View, ScrollView, Image } from "react-native";
import { CustomButton, PlaneCustomButton } from "../components/buttons";
import  AppColors  from "../data/Colors";

function CreatePasswordScreen({navigation}) {

    return (
        <View style={styles.container}>
            <ScrollView  contentContainerStyle={styles.signUpContainer}>
            <View style={styles.headerBox}>
                <Image style={styles.logo} source={require("../../../assets/KampuzSales-Logo.png")} />
                <Text style={styles.heading}>Create New Password</Text>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.textInputBox} 
                    secureTextEntry={true}
                    placeholderTextColor={AppColors.secondary}
                    placeholder="*************" 
                />
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.textInputBox} 
                    secureTextEntry={true}
                    placeholderTextColor={AppColors.secondary}
                    placeholder="*************" 
                />
            </View>
            <View style={styles.customButton}>
                <CustomButton onPress={() => navigation.navigate("Login")} buttonText={"Sign Up"} />
            </View>
            <PlaneCustomButton buttonText={"Sign up with Google"} />
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
      justifyContent: 'center',
      backgroundColor: AppColors.white,
    },
    signUpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        marginTop: 100,
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
    }
  });

export default CreatePasswordScreen;