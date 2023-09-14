import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../../data/Colors";
import { auth, firestore, storage, firebase } from "../../../BackendDirectory/config";
import Fontisto from "react-native-vector-icons/Fontisto";
import CediSign from "../CediSign";
import { generateNewDownloadLink } from "../../../BackendDirectory/functionalities/functions";
import { CustomButton } from "../buttons";


function WishlistProducts() {
    const navigation = useNavigation();
    
    const [ dataFromState, setDataFromState ] = useState([]);
    const [ product, setProduct ] = useState(null);
    const [ cartIds, setCartIds ] = useState([]);
    const [ deleted, setDeleted ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    const [ uploading, setUploading ] = useState(false);

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
                        productTitle,
                        image: productImage,
                        description,
                        price,
                        postTime,
                        userId
                    })

                    let data = {
                        details: doc.data(),
                        productId : doc.id
                    }
                    setProduct(data)
                })
            })

            setDataFromState(productData);

        } catch (error) {
            return;
        }
    }

    const addToCart = async (originalUrl, newFolder, productId) => {
        if(cartIds && cartIds.includes(product.id)){
            alert("Item is already in cart!");
            setUploading(false);
        } else {
            setUploading(true);
            let imageUrl = await generateNewDownloadLink(originalUrl, newFolder);
            
            if(imageUrl){
                cartDetails(imageUrl, productId);
                setUploading(false)

                navigation.navigate("Cart");
            }
        }
    }

    const cartDetails = (imageUrl, productId) => {
        firestore.collection('cart')
        .add({
            userId: auth.currentUser.uid,
            productTitle: product?.details?.productTitle,
            productId: product?.productId,
            price: product?.details?.price,
            category: product?.details?.category,
            productImage: imageUrl ? imageUrl : product?.details?.productImage,
            description: product?.details?.description,
            postTime: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
            Alert.alert(
                'Added Cart!',
                'Your product is added successfully!',
            );
            deletePost(productId)
            setUploading(false)
        })
        .catch((error) => {
            setUploading(false)
            alert(error.message)
            console.log(error);
        })
    }

    const handleDeleteModal = (postId) => {
        Alert.alert(
            'Remove Product From Wishlist',
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
        firestore.collection('wishlist')
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

    const getCartIds = async () => {
        
        let productIds = [];
        await firestore.collection("cart")
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const { userId, productId } = doc.data();

                {auth.currentUser.uid === userId ? 
                    (productIds.push(productId))
                : null }
                
            })
        })
        setCartIds(productIds);
    }

    useEffect(() => {
        fetchProducts();
        getCartIds();
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
            { dataFromState.length == 0 ? 
            (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 70,
                }}>
                    <Image style={{width: 300, height: 300}} source={require("../../../../assets/wish-list.png")} />
                    <Text style={{
                        marginTop: 20,
                        fontSize: 18,
                    }}>Your Wishlist is Empty!</Text>
                    <Text style={{textAlign: 'center', marginVertical: 10}}>
                        Start adding items you love by browsing through the products from the homepage and tapping the wishlist icon.
                    </Text>
                    <Text style={{fontSize: 12, color: AppColors.primary}}>Happy shopping! 🎉</Text>
                </View>
            ) : 
            (
                <>
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
                                    <Image style={styles.image} source={{uri: product.image}} alt={product.productTitle} />
                                </View>
                                <View style={styles.productDetailsBox}>
                                    <Text style={styles.productName}>{product.productTitle}</Text>
                                    <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                                <Pressable 
                                    style={styles.addToCart}
                                    disabled={uploading ? true : false} 
                                    onPress={() => addToCart(product?.image, "cart", product.id)}>
                                    <Text style={{color: AppColors.white}}>{ uploading ? <ActivityIndicator size="small" color={AppColors.white} /> : "Add to Cart"}</Text>
                                </Pressable>
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
                { dataFromState.length >= 1 ? (
                    <View style={styles.totalMarginHorizontal}>
                        <CustomButton onPress={() => alert("Checked all items out!")} buttonText={"Add all to my cart"}  />
                    </View>
                ) : null}
                </>
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

export default WishlistProducts;