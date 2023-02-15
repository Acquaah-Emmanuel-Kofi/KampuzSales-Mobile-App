import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  Colors  from "../data/colors";

function WishlistScreen() {
    return (
        <View style={styles.container}>
            <HeadTitle title={"Favorites"} />
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