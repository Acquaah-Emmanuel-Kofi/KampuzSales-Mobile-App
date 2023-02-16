import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
                <Image style={styles.textLogo} source={require("../../data/images/TextLogo.png")} />
                <Pressable onPress={() => navigation.navigate("Cart")}>
                    <AntDesign name="shoppingcart" size={24} color={Colors.black} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    textLogo: {
        width: 300, 
        height: 100,
        marginTop: -50,
        marginRight: -20,
    },
  });

export default MainNavbar;