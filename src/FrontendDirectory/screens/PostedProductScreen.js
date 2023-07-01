import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import PostedProducts from "../components/PostedProductsScreenComponents/PostedProducts";

function PostedProductScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <HeadTitle title={"Products Posted"} />
            <PostedProducts />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
  });

export default PostedProductScreen;