import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import  Colors  from "../data/colors";

export function CustomButton({onPress, buttonText}) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
    )
}

export function GoogleCustomButton({buttonText}) {
    return (
        <Pressable style={styles.googleButton}>
            <Text style={styles.googleButtonText}>{buttonText}</Text>
        </Pressable>
    )
}

export function BackButton({previousScreen, navigation}) {
    return (
        <Pressable style={styles.productBackButton} onPress={previousScreen}>
            <Text>K</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.main,
        backgroundColor: Colors.main,
        paddingHorizontal: 10,
        paddingVertical: 14,
        gap: 8,
        marginVertical: 12,
        width: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 16,
    },
    googleButton: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.borderGray,
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 14,
        gap: 8,
        marginVertical: 12,
        width: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButtonText: {
        color: Colors.labelGray,
        fontWeight: '500',
        fontSize: 16,
    },
    productBackButton: {
        position: 'absolute',
        top: 53,
        left: 32,
        zIndex: 999,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.favIconBg,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.favIconBg,
    },
  });
  

  

// export default CustomButton;