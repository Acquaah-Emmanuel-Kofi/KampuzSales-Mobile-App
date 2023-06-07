import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  AppColors  from "../data/Colors";
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
      backgroundColor: AppColors.white,
    },
  });

export default WishlistScreen;