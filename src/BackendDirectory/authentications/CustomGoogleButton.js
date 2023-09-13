import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import AppColors from "../../FrontendDirectory/data/Colors";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import {AsyncStorage} from 'react-native';
import { auth } from "../config";
import { useEffect, useState } from "react";


function CustomGoogleButton() {

    const [ userInfo, setUserInfo ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const [ request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "706268555196-lsg23qd4gnrrl7d0hhfumpv44dkc4bsp.apps.googleusercontent.com",
        iosClientId: "706268555196-lsg23qd4gnrrl7d0hhfumpv44dkc4bsp.apps.googleusercontent.com",
        androidClientId: "706268555196-a3shb8lqvgu7frc1fo71hl0jhf208gfi.apps.googleusercontent.com",
    })

    const checkLocalUser = async () => {
        try {
            setLoading(true);
            const userJSON = await AsyncStorage.getItem("@user");
            const userData = userJSON ? JSON.parse(userJSON) : null;
            console.log("Local Storage: ", userData);
            setUserInfo(userData);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSignWithGoogle = async () => {
        if(response?.type === "success"){
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }

    useEffect(() => {
        handleSignWithGoogle();
    }, [response])

    useEffect(() => {
        checkLocalUser();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user){
                console.log(JSON.stringify(user, null, 2));
                setUserInfo(user);
                await AsyncStorage.setItem("@user", JSON.stringify(user));
            } else {
                console.log("No User");
            }
        })

        return () => unsubscribe();
    }, [])

    return (
        <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
            { loading ? "Signing in... " : 
            (<View style={{
                flexDirection:"row",
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
            }}>
                <Image style={{width: 20, height: 20,}} source={require("../../../assets/google.png")} />
                <Text style={styles.googleButtonText}> Sign in with Google</Text>
                <View style={{width: 20}}></View>
            </View>)
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    googleButton: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.borderGray,
        backgroundColor: AppColors.white,
        paddingHorizontal: 10,
        paddingVertical: 14,
        marginVertical: 12,
        width: '85%',
    },
    googleButtonText: {
        color: AppColors.labelGray,
        fontWeight: '500',
        fontSize: 16,
    },
})

export default CustomGoogleButton;