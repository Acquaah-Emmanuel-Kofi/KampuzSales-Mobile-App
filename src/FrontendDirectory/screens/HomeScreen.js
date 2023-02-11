import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HomeCategories from "../components/HomeScreenComponents/HomeCategories";
import HomeNavbar from "../components/MainNavbar";
import HomeProducts from "../components/HomeScreenComponents/HomeProducts";
import  Colors  from "../data/colors";

function HomeScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <HomeNavbar />
              <HomeCategories />
              <HomeProducts />
            </ScrollView>
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