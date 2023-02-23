import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/buttons";
import CartItems from "../components/CartScreenComponents/CartItems";
import CediSign from "../components/CediSign";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import  Colors  from "../data/colors";


function CartScreen({navigation}) {
    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
                <HeadTitleWithBackIcon previousScreen={() => navigation.navigate("Home")} title={"Cart"} />
            </View>
            <CartItems />
            <View style={styles.totalMarginHorizontal}>
                <View style={styles.totalBox}>
                <View>
                    <Text style={styles.totalText}>Total</Text>
                </View>
                <View>
                    <Text style={styles.totalAmount}><CediSign />100</Text>
                </View>
                </View>
                <CustomButton onPress={() => alert("Checked all items out!")} buttonText={"Check out"}  />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    totalMarginHorizontal: {
        marginHorizontal: 30,
        marginBottom: 30
    },
    totalBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    totalText: {
        fontSize: 20, 
        fontWeight: '700',
        color: Colors.totalColor,
    },
    totalAmount: {
        fontSize: 20, 
        fontWeight: '700',
        color: Colors.totalAmountColor,
    },
  });

export default CartScreen;