import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CartItems from "../components/CartScreenComponents/CartItems";
import HeadTitle from "../components/HeadTitle";
import  Colors  from "../data/colors";
import FavoriteProducts from "../components/WishlistScreenComponents/WishlistProducts";

function WishlistScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <HeadTitle title={"Wishlist"} />
            <FavoriteProducts />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default WishlistScreen;