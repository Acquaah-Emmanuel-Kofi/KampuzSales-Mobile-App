import { auth, firestore } from "../config";

export const loginUser = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        alert("Email and Password is required!")
    }
}

export const registerUser = async (email, password, username, phoneNumber) => {
    await auth.createUserWithEmailAndPassword(email, password, username, phoneNumber)
    .then(() => {
        auth.currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://kampuzsales-mobile-app-90a08.firebaseapp.com',
        })
        .then(() => {
            alert("Verification email sent!")
        })
        .catch((error) => {
            // alert(error.message)
            console.log(error.message)
        })
        .then(() => {
            firestore.collection('users')
            .doc(auth.currentUser.uid)
            .set({
                username: username,
                email: email,
                phoneNumber: phoneNumber,
            })
        })
        .catch((error) => {
            alert(error.message)
            console.log(error.message)
        })
    })
    .catch((error) => {
        alert("All fields are required!")
        console.log(error.message)
    })
}