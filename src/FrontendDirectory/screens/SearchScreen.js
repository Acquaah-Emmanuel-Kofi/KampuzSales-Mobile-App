import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SearchInput from "../components/HomeScreenComponents/SearchInput";
import MainNavbar from "../components/MainNavbar";

function SearchScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
              <MainNavbar title={'Search'} />
              <SearchInput />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default SearchScreen;