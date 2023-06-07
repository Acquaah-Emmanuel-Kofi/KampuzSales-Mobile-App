import React from "react";
import { StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import  AppColors  from "../data/Colors";
import Feather from "react-native-vector-icons/Feather"

export function CustomButton({onPress, buttonText}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export function GoogleCustomButton({buttonText}) {
    return (
        <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export function BackButton({previousScreen, navigation}) {
    return (
        <Pressable style={styles.productBackButton} onPress={previousScreen}>
            <Feather name="chevron-left" size={24} color={AppColors.black} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.primary,
        backgroundColor: AppColors.primary,
        paddingHorizontal: 10,
        paddingVertical: 14,
        gap: 8,
        marginVertical: 12,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    buttonText: {
        color: AppColors.white,
        fontWeight: '500',
        fontSize: 16,
    },
    googleButton: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.borderGray,
        backgroundColor: AppColors.white,
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
        color: AppColors.labelGray,
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
        borderColor: AppColors.favIconBg,
        backgroundColor: AppColors.favIconBg,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });