import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import SearchInput from "../components/SearchInput";

function SearchScreen({navigation}) {

  // const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <SafeAreaView>
              <HeadTitleWithBackIcon previousScreen={() => navigation.navigate("Home")} title={'Search'} />
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