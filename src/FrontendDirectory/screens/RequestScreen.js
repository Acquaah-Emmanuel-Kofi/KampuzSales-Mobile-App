import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  AppColors  from "../data/Colors";

function RequestScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <HeadTitle title={"Requests"} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
  });

export default RequestScreen;