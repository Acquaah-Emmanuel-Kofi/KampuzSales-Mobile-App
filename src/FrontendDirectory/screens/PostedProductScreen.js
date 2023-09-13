import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import AppColors from "../data/Colors";
import PostedProducts from "../components/PostedProductsComponents/PostedProducts";

function PostedProductScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <HeadTitleWithBackIcon 
                title={"Products Posted"}
                previousScreen={() => navigation.goBack()}
            />
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: AppColors.danger,
              width: '90%',
              marginHorizontal: '5%',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 8,
              marginTop: 5,
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