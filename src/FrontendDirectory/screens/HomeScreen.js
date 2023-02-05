import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeCategories from "../components/HomeCategories";
import HomeProducts from "../components/HomeProducts";
import  Colors  from "../data/colors";

function HomeScreen() {
    return (
        <View style={styles.container}>
            <HomeCategories />
            <HomeProducts />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default HomeScreen;