import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CartItems from "../components/CartScreenComponents/CartItems";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import  Colors  from "../data/colors";

function CartScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View>
                <HeadTitleWithBackIcon previousScreen={() => navigation.navigate("Home")} title={"Cart"} />
            </View>
                <CartItems />
            {/* <ScrollView>
            </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default CartScreen;