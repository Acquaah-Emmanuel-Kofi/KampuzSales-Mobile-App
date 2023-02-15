import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import  Colors  from "../../data/colors";

function MainNavbar() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.headerWrapper}>
                <Pressable onPress={() => navigation.navigate("Search")}>
                    <Feather name="search" size={24} color={Colors.black} />
                </Pressable>
                <Text style={styles.Logo}>Logo</Text>
                <View>
                    <AntDesign name="shoppingcart" size={24} color={Colors.black} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    Logo: {
        fontSize: 24,
        color: Colors.black,
    },
  });

export default MainNavbar;