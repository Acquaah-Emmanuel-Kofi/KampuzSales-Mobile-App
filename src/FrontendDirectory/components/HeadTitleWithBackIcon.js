import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import  AppColors  from "../data/Colors";
import { Device } from 'expo-device';

function HeadTitleWithBackIcon({title, previousScreen}) {
    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <View style={styles.headWrapper}>
                <Ionicons onPress={previousScreen} style={styles.searchBackIcon} name="chevron-back-sharp" size={30} color={AppColors.black} />
                <Text style={styles.title}>{title}</Text>
                <View style={styles.searchRightSpace}></View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: Device === 'android' ? 50 : 20,
    },
    title: {
        fontSize: 16,
        color: AppColors.black,
        fontWeight: '600',
    },
    searchRightSpace: {
        width: 30,
        height: 25,
    },
    searchBackIcon: {
        zIndex: 999
    }
  });

export default HeadTitleWithBackIcon;