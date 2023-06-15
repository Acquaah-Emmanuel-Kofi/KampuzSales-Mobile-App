import { Alert } from "react-native";
import { auth, firestore, firebase } from "../config";

export let authLoading = false;


export const loginUser = async (email, password) => {
    try {
        if( email !== "" || password !== ""){
            await auth.signInWithEmailAndPassword(email, password);
            authLoading = true;
        } else {
            alert("Email and Password Fields are required!")
        }
    } catch (error) {
        authLoading = false;
        if ( error.message.includes("(auth/user-not-found)")) {
            alert("There is no user record corresponding to this credentials.")
        } else if ( error.message.includes("(auth/invalid-email)")){
            Alert.alert(
                "Invalid-Email",
                "Your email address is badly formatted. Please enter a valid email address!"
            )
        } else if ( error.message.includes("(auth/wrong-password)")){
            alert("The password does match the email.")
        } else {
            Alert.alert(
                "Network Error!",
                "Failed to get document because the client is offline."
            )
        }
    }
}

export const registerUser = async (email, password, confirmPassword, username, phoneNumber) => {

    if( email !== "" || password !== "" || confirmPassword !== "" || username !== "" || phoneNumber !== ""){
        authLoading = true;

        if(phoneNumber && phoneNumber.length < 10){
            Alert.alert(
                "Invalid Phone Number!",
                "Please check the length of your phone number."
            )
        } else {
        if(password && confirmPassword && password.length < 8){
            authLoading = false;
            Alert.alert(
                "Weak Password!",
                "Password length must be more than 8 characters."
            )
        } else {
            authLoading = true;
            if(password !== confirmPassword){
                authLoading = false;
                alert("Password does not match!");
            } else {
                authLoading = true;
                await auth.createUserWithEmailAndPassword(email, password, username, phoneNumber)
                .then(() => {
                    auth.currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: 'https://kampuzsales-3cb39.firebaseapp.com',
                    })
                    .then(() => {
                        Alert.alert(
                            "Verification!",
                            "Verification link has been sent to your email. Please verify your account!"
                        )
                    })
                    .catch(() => {
                        alert("Couldn't send email verification link!")
                    })
                    .then(() => {
                        firestore.collection('users')
                        .doc(auth.currentUser.uid)
                        .set({
                            username: username,
                            email: email,
                            phoneNumber: phoneNumber,
                            firstPost: true,
                            joinedDate: firebase.firestore.Timestamp.fromDate(new Date()),
                        })
                    })
                    .catch((error) => {
                        alert(error.message);
                    })
                })
                .catch((error) => {
                    authLoading = false;
                    if( email && error.message.includes("(auth/invalid-email)") ){
                        Alert.alert(
                            "Invalid-Email",
                            "Your email address is badly formatted. Please enter a valid email address!"
                        )
                    } else if ( email && error.message.includes("(auth/email-already-in-use)")){
                        Alert.alert(
                            "Invalid-Email",
                            "The email address is already in use by another account."
                        )
                    } else {
                        alert("All input fields are required!")
                    }
                })
                }
            }
        }
        } else {
            authLoading = false;
            alert("All input fields are required!")
        }
}

export const resetPassword = (password) => {
    auth.currentUser.updatePassword(password)
    .then(() => {
        Alert.alert(
            "Success!",
            "A reset link has been sent to your email. Please reset your password from the browser!"
        )
    })
    .catch((error) => {
        if( error.message.includes("(auth/invalid-email)")){
            Alert.alert(
                "Invalid-Email",
                "Your email address is badly formatted. Please enter a valid email address!"
            )
        } else {
            alert("Please enter your email to reset your password!")
        }
    })
} 

export const sendPasswordResetLink = (email) => {
    auth.sendPasswordResetEmail(email)
    .then(() => {
        Alert.alert(
            "Success!",
            "A reset link has been sent to your email. Please reset your password from the browser!"
        )
    })
    .catch((error) => {
        if( error.message.includes("(auth/invalid-email)")){
            Alert.alert(
                "Invalid-Email",
                "Your email address is badly formatted. Please enter a valid email address!"
            )
        } else {
            alert("Please enter your email to reset your password!")
        }
    })
} 

//change passwaord

// const user = firebase.auth().currentUser;
// const newPassword = getASecureRandomPassword();

// user.updatePassword(newPassword).then(() => {
//   // Update successful.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });

// delete account

// const user = firebase.auth().currentUser;

// user.delete().then(() => {
//   // User deleted.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });