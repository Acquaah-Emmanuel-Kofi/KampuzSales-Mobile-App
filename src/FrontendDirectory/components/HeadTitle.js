import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import AppColors from "../data/Colors";
import { Device } from 'expo-device';

function HeadTitle({title}) {
    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: Device === 'android' ? 50 : 20,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        color: AppColors.black,
        fontWeight: '600',
    },
  });

export default HeadTitle;