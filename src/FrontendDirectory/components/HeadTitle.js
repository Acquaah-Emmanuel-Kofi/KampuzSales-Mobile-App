import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Colors from "../data/colors";

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
        marginTop: Platform.OS === 'android' ? 50 : 20,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '600',
    },
  });

export default HeadTitle;