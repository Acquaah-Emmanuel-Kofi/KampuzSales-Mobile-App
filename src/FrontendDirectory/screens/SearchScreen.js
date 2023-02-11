import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import  Colors  from "../data/colors";

function SearchScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
              <Text>SearchScreen</Text>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default SearchScreen;