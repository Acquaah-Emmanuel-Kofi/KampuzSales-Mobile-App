import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../../data/Colors";
import { auth, firestore, storage } from "../../../BackendDirectory/config";
import Fontisto from "react-native-vector-icons/Fontisto";
import CediSign from "../CediSign";

function CartItems() {
    const navigation = useNavigation();
    
    const [ dataFromState, setDataFromState ] = useState([]);
    const [ deleted, setDeleted ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);


    const fetchProducts = async () => {
        try {
            
            let productData = [];

            await firestore.collection('cart')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { productTitle, productImage, description, price, postTime, userId} = doc.data();
                    productData.push({
                        id: doc.id,
                        name: productTitle,
                        image: productImage,
                        description,
                        price,
                        postTime,
                        userId
                    })
                })
            })

            setDataFromState(productData);

        } catch (error) {
            console.log(error.message);
        }
    }


    const handleDeleteModal = (postId) => {
        Alert.alert(
            'Remove Product From Cart',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                }
            ],
            { cancelable: false}
        )
    }

    const deletePost = (postId) => {
        firestore.collection('cart')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                const {productImage} = documentSnapshot.data();

                if (productImage !== null) {
                    const storageRef = storage.refFromURL(productImage);
                    const imageRef = storage.ref(storageRef.fullPath);

                    imageRef.delete()
                    .then(() => {
                        deleteFirestoreData(postId);
                        setDeleted(true)
                    })
                    .catch((error) => {
                        console.log("Error deleting image", error);
                        if (error) deleteFirestoreData(postId);
                    })
                } else {
                    deleteFirestoreData(postId);
                }

                // if the post image is not available
            } else{
                deleteFirestoreData(postId);
            }
        })
    }

    const deleteFirestoreData = (postId) => {
        firestore.collection('cart')
        .doc(postId)
        .delete()
        .then(() => {
            Alert.alert(
                'Product Removed!',
                'Your product has been removed succefully!'
            )
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchProducts();
    }, [deleted]);

    useEffect(() => {
        fetchProducts();
        setDeleted(false)
    }, [deleted]);

    const pulledToRefresh = () => {
      setRefresh(true);
      fetchProducts();
  
      setTimeout(() => {
        setRefresh(false);
      }, 2000)
    }

    return (
        <View style={styles.container}>
            { dataFromState.length == 0 ? 
            (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 70,
                }}>
                    <Image style={{width: 250, height: 250}} source={require("../../../../assets/online-shopping.png")} />
                    <Text style={{
                        marginTop: 20,
                        fontSize: 18,
                    }}>Your Cart is Empty!</Text>
                    <Text style={{textAlign: 'center', marginVertical: 10}}>
                        Looks like your cart is currently empty. 
                        Start adding items to your cart by browsing the products from the homepage.
                    </Text>
                    <Text style={{fontSize: 12, color: AppColors.primary}}>Happy shopping!</Text>
                </View>
            ): 
            (
                <ScrollView 
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"
                refreshControl={
                  <RefreshControl 
                    refreshing={refresh}
                    onRefresh={() => pulledToRefresh()}
                  />
                }>
                {
                    dataFromState && dataFromState.map((product, index) => (
                        <View key={index}>
                        {auth.currentUser.uid === product.userId ? 
                            <Pressable style={styles.productBox} onPress={() => navigation.navigate("Single", product)}>
                                <View style={styles.imageBox}>
                                    <Image style={styles.image} source={{uri: product.image}} alt={product.name} />
                                </View>
                                <View style={styles.productDetailsBox}>
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                                </View>
                                <Pressable onPress={() => handleDeleteModal(product.id)}>
                                    <Fontisto name="close" size={24} color={AppColors.black} />
                                </Pressable>
                            </Pressable>
                        : null}
                        </View>
                    ))
                }
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 20,
        marginTop: 30,
        flex: 1
    },
    productBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: AppColors.borderGray,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productDetailsBox: {
        ...Platform.select({
            ios: {
                width: '55%',
            },
            android: {
                width: '45%',
            },
        })
    },
    productName: {
        color: AppColors.deepGray,
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 10
    },
    productPrice: {
        color: AppColors.black,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CartItems;