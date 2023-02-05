import React from "react";
import { StyleSheet, Text, View } from "react-native";
import  Colors  from "../data/colors";

function WishlistScreen() {
    return (
        <View style={styles.container}>
            <Text>WishlistScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default WishlistScreen;