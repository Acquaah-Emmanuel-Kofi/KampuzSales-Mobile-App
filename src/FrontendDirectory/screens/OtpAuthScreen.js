import React, { useState, useRef } from "react";
import { StyleSheet ,Text, TextInput, View, ScrollView, Image, StatusBar, Alert } from "react-native";
import { authLoading } from "../../BackendDirectory/authentications/authentications";
import { CustomButton, PlaneCustomButton } from "../components/buttons";
import  AppColors  from "../data/Colors";
import { auth, firebase } from "../../BackendDirectory/config";
import CustomGoogleButton from "../../BackendDirectory/authentications/CustomGoogleButton";


function OtpAuthScreen({navigation}) {

//   const [ phoneNumber, setPhoneNumber ] = useState('');
//   const [ verificationcode, setVerificationCode ] = useState('');
//   const [ verificationId, setVerificationId ] = useState('');
//   const recaptchaVerifier = useRef(null);

const [phone, setPhone] = useState('');
const [verificationId, setVerificationId] = useState('');
const [otp, setOtp] = useState('');

// Function to send OTP verification code
const sendOTP = async () => {
  try {
    const confirmation = await auth.signInWithPhoneNumber(phone);
    // setVerificationId(confirmation.verificationId);

    console.log(confirmation);
  } catch (error) {
    console.log(error);
  }
};

// Function to verify OTP code
const verifyOTP = async () => {
    try {
      const credential = firebase.auth().PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      await firebase.auth().signInWithCredential(credential);
      // OTP verification successful
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <View style={styles.container}>
          <StatusBar
              animated={true}
              backgroundColor="#61dafb"
              barStyle="dark-content"
          />
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.signInContainer}>
          <View style={styles.headerBox}>
              <Image style={styles.logo} source={require("../../../assets/KampuzSales-Logo.png")} />
              <Text style={styles.heading}>Welcome Back , Login</Text>
          </View>
          <View style={styles.inputBox}>
              <Text style={styles.label}>Login with your phone number.</Text>
              <TextInput 
                  style={styles.textInputBox} 
                //   autoFocus
                  autoCompleteType="tel"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  placeholderTextColor={AppColors.secondary}
                  placeholder="Eg. 0559 XXX XXX"
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                //   autoCorrect={false} 
              />
          </View>
          <View style={styles.customButton}>
              <CustomButton onPress={() => {}} buttonText={authLoading ? "Sending Otp..." : "Send Otp Code"} />
          </View>
          <CustomGoogleButton />
          <PlaneCustomButton onPress={() => navigation.navigate("Login")} buttonText={"Sign in with Email"} />
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
    backgroundColor: AppColors.white,
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

export default OtpAuthScreen;