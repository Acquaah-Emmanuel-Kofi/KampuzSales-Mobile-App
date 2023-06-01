import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CediSign from "../CediSign";
import Colors from "../../data/colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import { auth, firestore, storage } from "../../../BackendDirectory/config";

function FavoriteProducts() {
    const navigation = useNavigation();
    const [ dataFromState, setDataFromState ] = useState([]);
    const [ deleted, setDeleted ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);

    const fetchProducts = async () => {
        try {
            
            let productData = [];

            await firestore.collection('wishlist')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { productTitle, productImage, description, price, postTime, userId } = doc.data();
                    productData.push({
                        id: doc.id,
                        name: productTitle,
                        image: productImage,
                        description: description,
                        price: price,
                        postTime: postTime,
                        userId,
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
            'Remove Product From Wishlist',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log(""),
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
        // console.log("Delete", postId);
        firestore.collection('wishlist')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                const {productImage} = documentSnapshot.data();

                if (productImage !== null) {
                    const storageRef = storage.refFromURL(productImage);
                    const imageRef = storage.ref(storageRef.fullPath);

                    imageRef
                    .delete()
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
        firestore.collection('wishlist')
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
    }, []);

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
            <ScrollView 
                contentContainerStyle={styles.scrollViewContainer} 
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"
                refreshControl={
                  <RefreshControl 
                    refreshing={refresh}
                    onRefresh={() => pulledToRefresh()}
                  />
                }>
            {
                dataFromState && dataFromState.map((product) => (
                    <View key={product.id}>
                    {auth.currentUser.uid === product.userId ? 
                    <Pressable style={styles.productBox} onPress={() => navigation.navigate("Single", product)}>
                        <View style={styles.imageBox}>
                            <Image style={styles.image} source={{uri:product.image}} alt={product.name} />
                        </View>
                        <View style={styles.productDetailsBox}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                        </View>
                        <Pressable onPress={() => handleDeleteModal(product.id)}>
                            <Fontisto name="close" size={24} color={Colors.black} />
                        </Pressable>
                    </Pressable>
                    : null}
                    </View>
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
        marginTop: 30,
        flex: 1
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
        marginBottom: 10
    },
    productPrice: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default FavoriteProducts;