import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import  Colors  from "../data/colors";

function GoogleCustomButton({buttonText}) {
    return (
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
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
    buttonText: {
        color: Colors.labelGray,
        fontWeight: '500',
        fontSize: 16,
    }
  });

export default GoogleCustomButton;