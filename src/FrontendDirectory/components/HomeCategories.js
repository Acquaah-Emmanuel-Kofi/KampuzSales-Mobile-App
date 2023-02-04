import React from "react";
import { StyleSheet, Text, View } from "react-native";
import  Colors  from "../data/colors";

function HomeCategories() {
    return (
        <View style={styles.container}>
            <Text>HomeCategories</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomeCategories;