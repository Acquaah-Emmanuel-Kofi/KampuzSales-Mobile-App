import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import  Colors  from "../../data/colors";
import  products  from "../../data/testProducts";
import CediSign from "../CediSign";
import { auth, firestore } from "../../../BackendDirectory/config";

function HomeProducts() {
    const navigation = useNavigation();

    let productData = [];

    const [ user, setUser ] = useState(null);
    const [ post, setPost ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const fetchProducts = async () => {
        try {
            await firestore.collection('products')
            // .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                // console.log("Total Post", querySnapshot.size);

                querySnapshot.forEach(doc => {
                    const { productTitle, productImage, description, price} = doc.data();
                    productData.push({
                        id: doc.id,
                        name: productTitle,
                        image: productImage,
                        description: description,
                        price: price,
                    })
                })
            })

            setPost(productData);

            if(loading) setLoading(false);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <View style={styles.container}>
        <ScrollView 
            contentContainerStyle={styles.scrollViewContainer} 
            showsVerticalScrollIndicator={false}>
        {
            post && post.map((product) => (
                <Pressable key={product.id} style={styles.productBox} onPress={() => navigation.navigate("Single", product)}>
                    {
                        product  ? (
                        <View style={styles.imageBox}>
                            <Image style={styles.image} resizeMode='stretch' source={{uri: product.image}} alt={product.name} />
                            <Image style={styles.imageCartTag} source={require('../../data/images/Cart.png')} />
                        </View>
                        ) : (
                            <View style={styles.noImage}></View>
                        )
                    }
                    <View style={styles.productDetailsBox}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                        {auth.currentUser.uid === product.id ? <Text>Delete</Text> : null}
                    </View>
                </Pressable>
            ))
        }
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
    },
    scrollViewContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    productBox: {
        width: 157,
        height: 256,
        marginVertical: 5,
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
    noImage: {
        width: 157,
        height: 200,
        borderRadius: 10,
        backgroundColor: Colors.borderGray,
    },
    productDetailsBox: {
        paddingTop: 12,
    },
    productName: {
        color: Colors.labelGray,
        fontSize: 14,
        fontWeight: '400',
    },
    productPrice: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '600',
    }
  });

export default HomeProducts;