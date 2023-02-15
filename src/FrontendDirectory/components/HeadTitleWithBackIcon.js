import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import  Colors  from "../data/colors";

function HeadTitleWithBackIcon({title, previousScreen}) {
    return (
        <SafeAreaView>
            <View style={styles.headWrapper}>
                <Ionicons onPress={previousScreen} style={styles.searchBackIcon} name="chevron-back-sharp" size={30} color={Colors.black} />
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
        marginTop: 20,
        // marginBottom: 16,
    },
    title: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '600',
    },
    searchRightSpace: {
        width: 30,
        height: 25,
    }
  });

export default HeadTitleWithBackIcon;