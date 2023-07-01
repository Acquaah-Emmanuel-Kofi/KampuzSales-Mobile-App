import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../../data/Colors";
import { auth, firestore, storage } from "../../../BackendDirectory/config";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CediSign from "../CediSign";

function PostedProducts() {
    const navigation = useNavigation();
    
    const [ dataFromState, setDataFromState ] = useState([]);
    const [ deleted, setDeleted ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);    

    let product = dataFromState && dataFromState?.map((item) => {
        return item;
    })


    const fetchProducts = async () => {
        try {
            
            let productData = [];

            await firestore.collection('products')
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
            'Delete Product Forever',
            'Are you sure you want to delete this product from the database?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => deletePost(postId),
                }
            ],
            { cancelable: false}
        )
    }

    const deletePost = (postId) => {
        firestore.collection('products')
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
        firestore.collection('products')
        .doc(postId)
        .delete()
        .then(() => {
            Alert.alert(
                'Product Deleted!',
                'Your product has been deleted succefully!'
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
                            <Pressable style={styles.addToCart} onPress={() => {}}>
                                <Text style={{color: AppColors.white}}>Edit Product</Text>
                            </Pressable>
                            </View>
                            <Pressable onPress={() => handleDeleteModal(product.id)}>
                                <MaterialIcons name="delete-forever" size={30} color={AppColors.danger} />
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
        borderColor: AppColors.borderGray,
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
    addToCart: {
        backgroundColor: AppColors.primary,
        width: 120,
        height: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    totalMarginHorizontal: {
        marginBottom: 10
    },
});

export default PostedProducts;