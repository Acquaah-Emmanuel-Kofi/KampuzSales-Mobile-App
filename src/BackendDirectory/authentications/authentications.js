import { Alert } from "react-native";
import { auth, firestore, firebase } from "../config";

export let authLoading = false;


export const loginUser = async (email, password) => {
    authLoading = true;
    try {
        if( email !== "" || password !== ""){
            await auth.signInWithEmailAndPassword(email, password);
            authLoading = true;
        } else {
            authLoading = false;
            alert("Email and Password Fields are required!")
        }
    } catch (error) {
        authLoading = false;
        if ( error.message.includes("(auth/user-not-found)")) {
            Alert.alert(
                "Invalid Credentials!",
                "There is no user record corresponding to this credentials."
            )
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
    let validPassword = checkPasswordHealth(password);
    let errors = validPassword.errors;

    let allErrors = errors.map(error => {
        return '\n - ' + error;
    });

    
    if( email !== "" || password !== "" || confirmPassword !== "" || username !== "" || phoneNumber !== ""){
        authLoading = true;

        if(phoneNumber && phoneNumber.length < 10){
            Alert.alert(
                "Invalid Phone Number!",
                "Please check the length of your phone number."
            )
        } else {
            if(!validPassword.isValid){

                Alert.alert(
                    'Invalid Password!',
                    `${allErrors}`
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
                            url: 'https://kampuzsales-db.firebaseapp.com',
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
                                firstTimePosting: true,
                                firstRequestPosting: true,
                                firstRequestViewing: true,
                                joinedDate: firebase.firestore.Timestamp.fromDate(new Date()),
                                notifications: [
                                    {
                                        title: `Hi, ${username}! 🚀`,
                                        message: "Welcome to KampuzSales, feel free to enjoy your shopping!",
                                        postTime: firebase.firestore.Timestamp.fromDate(new Date())
                                    }
                                ]
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
    if(email === ''){
        Alert.alert('Error!', 'You must provide an e-mail!');
    } else {
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
            }
        })
    }
} 

export const handleLogout = () => {
    Alert.alert(
      'Logging Out',
      'Are you sure you want to logout?',
      [
          {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel'
          },
          {
              text: 'Logout',
              onPress: () => auth.signOut(),
          }
      ],
      { cancelable: false}
    )
  }

  export const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account Forever',
      'This action will delete your personal account, products, and activity.',
      [
          {
              text: 'Cancel',
              onPress: () => {},
            //   style: 'cancel'
          },
          {
              text: 'Delete',
              onPress: () => deleteAccount(),
          }
      ],
      { cancelable: false}
    )
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


const deleteAccount = () => {
    const user = auth.currentUser;

        let userId;

        firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
              userId = snapshot.id; 
            }
        })
        .catch((error) => {
          alert(error.message);
        })

    firestore.collection('users')
    .doc(userId)
    .delete()
    .then(() => {
        user.delete().then(() => {
            // User deleted.
                Alert.alert(
                    'Account Deleted!',
                    "😪We're sorry if we couldn't serve you well. Love to see you here back again!"
                )
            }).catch((error) => {
                // An error ocurred
                alert(error.message)
            });
    })
    .catch((error) => {
        console.log(error.message);
    })

    // const credential = promptForCredentials();

    // reauthenticateWithCredential(user, credential).then(() => {
    // // User re-authenticated.
    // }).catch((error) => {
    // // An error ocurred
    // // ...
    // });
}

function checkPasswordHealth(password) {
    const minLength = 8;
    const minUpperCase = 1;
    const minLowerCase = 1;
    const minNumbers = 1;
    const minSpecialChars = 1;
  
    let score = 0;
    const errors = [];
  
    // Check minimum length
    if (password.length < minLength) {
      errors.push(`Password should be at least ${minLength} characters long`);
    } else {
      score++;
    }
  
    // Check uppercase letters
    if (/[A-Z]/.test(password)) {
      score++;
    } else {
      errors.push(`Password should contain at least ${minUpperCase} uppercase letter`);
    }
  
    // Check lowercase letters
    if (/[a-z]/.test(password)) {
      score++;
    } else {
      errors.push(`Password should contain at least ${minLowerCase} lowercase letter.`);
    }
  
    // Check numbers
    if (/[0-9]/.test(password)) {
      score++;
    } else {
      errors.push(`Password should contain at least ${minNumbers} number`);
    }
  
    // Check special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    } else {
      errors.push(`Password should contain at least ${minSpecialChars} special character`);
    }
  
    return {
      score: score,
      isValid: score === 5,
      errors: errors
    };
  }