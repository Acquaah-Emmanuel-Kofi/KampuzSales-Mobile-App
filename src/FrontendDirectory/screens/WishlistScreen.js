import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import  AppColors  from "../data/Colors";
import WishlistProducts from "../components/WishlistScreenComponents/WishlistProducts";

function WishlistScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <HeadTitleWithBackIcon 
                title={"Wishlist"}
                previousScreen={() => navigation.goBack()}
            />
            <WishlistProducts />
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