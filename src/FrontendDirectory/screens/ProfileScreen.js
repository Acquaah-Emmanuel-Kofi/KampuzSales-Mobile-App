import React from "react";
import { StyleSheet, Text, View } from "react-native";
import  Colors  from "../data/colors";

function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default ProfileScreen;