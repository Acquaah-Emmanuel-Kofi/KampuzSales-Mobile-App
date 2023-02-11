import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import  Colors  from "../data/colors";

function MainNavbar({title}) {
    return (
        <SafeAreaView>
            <View style={styles.headerWrapper}>
                <View>
                    <Feather name="menu" size={24} color={Colors.black} />
                </View>
                <Text>{title}</Text>
                <View>
                    <MaterialCommunityIcons name="message-arrow-right-outline" size={24} color={Colors.black} />
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
      paddingHorizontal: 30,
      paddingVertical: 20,
    }
  });

export default MainNavbar;