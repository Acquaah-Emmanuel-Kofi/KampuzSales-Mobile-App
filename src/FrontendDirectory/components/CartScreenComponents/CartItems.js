import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import products from "../../data/testProducts";
import CediSign from "../CediSign";
import Colors from "../../data/colors";
import Fontisto from "react-native-vector-icons/Fontisto";

function CartItems() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollViewContainer} 
                showsVerticalScrollIndicator={false}>
            {
                products.slice(0,3).map((product) => (
                    <Pressable key={product._id} style={styles.productBox} onPress={() => navigation.navigate("Single", product)}>
                        <View style={styles.imageBox}>
                            <Image style={styles.image} source={{uri:product.image}} alt={product.name} />
                        </View>
                        <View style={styles.productDetailsBox}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                        </View>
                        <Pressable>
                            <Fontisto name="close" size={24} color={Colors.black} />
                        </Pressable>
                    </Pressable>
                ))
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 20,
    },
    productBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: Colors.borderGray,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productDetailsBox: {
        width: '55%'
    },
    productName: {
        color: Colors.deepGray,
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        marginBottom: 10
    },
    productPrice: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal'
    }
});

export default CartItems;