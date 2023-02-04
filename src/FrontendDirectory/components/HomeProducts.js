import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import  Colors  from "../data/colors";
import  products  from "../data/testProducts";

function HomeProducts() {
    return (
        <ScrollView 
            contentContainerStyle={styles.container} 
            showsVerticalScrollIndicator={false}>
        {
            products.map((product) => (
                <Pressable key={product._id} style={styles.productBox} onPress={() => alert("Pressed!")}>
                    <View style={styles.imageBox}>
                        <Image style={styles.image} source={{uri:product.image}} alt={product.name} />
                        <Image style={styles.imageCartTag} source={require('../data/images/Cart.png')} />
                    </View>
                    <View style={styles.productDetailsBox}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>GHC {product.price}</Text>
                    </View>
                </Pressable>
            ))
        }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    productBox: {
        width: 157,
        height: 256,
    },
    imageBox: {
        position: 'relative',
    },
    imageCartTag: {
        width: 25,
        height: 25,
        position: 'absolute',
        bottom: 12,
        right: 12,
    },
    image: {
        width: 157,
        height: 200,
        borderRadius: 10,
    },
    productDetailsBox: {
        paddingTop: 12,
    },
    productName: {
        color: Colors.labelGray,
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal'
    },
    productPrice: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'normal'
    }
  });

export default HomeProducts;