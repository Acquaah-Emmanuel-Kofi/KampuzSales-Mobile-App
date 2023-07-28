import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import PostedProducts from "../components/PostedProductsComponents/PostedProducts";

function PostedProductScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <HeadTitle title={"Products Posted"} />
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: AppColors.danger,
              width: '90%',
              marginHorizontal: '5%',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 8,
            }}>
              <Text style={{color: AppColors.white}}>Check all products that are still available at your end.</Text>
            </View>
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