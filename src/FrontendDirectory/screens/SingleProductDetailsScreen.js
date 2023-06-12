import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ScrollView, Text, View, Pressable, SafeAreaView, Platform, Dimensions, Alert } from "react-native";
import { BackButton } from "../components/buttons";
import CediSign from "../components/CediSign";
import  AppColors  from "../data/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import { firestore, firebase, auth, storage } from "../../BackendDirectory/config";
import { Device } from 'expo-device';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function SingleProductDetailsScreen({route}) {
    
    const navigation = useNavigation();
    
    const product = route.params;
    
    const [ ids, setIds ] = useState([]);
    const [ activeImage, setActiveImage ] = useState(0);

    const handleOnchange = (nativeEvent) => {
        if(nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != activeImage) {
                setActiveImage(slide);
            }
        }
    }  

    const getProductIds = async () => {
        try {
            
            let productData = [];
            let productIds = [];

            await firestore.collection('cart')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { productId, userId } = doc.data();
                    productData.push({
                        id: doc.id,
                        productId,
                        userId
                    })
                })
            })

            productData && productData.map((product) => {
                {auth.currentUser.uid === product.userId ?
                productIds.push(product.productId)
                : null }
            })

            setIds(productIds);


        } catch (error) {
            console.log(error.message);
        }
    }

    const addToCart = () => {
        if(ids && ids.includes(product.id)){
            alert("Item is already in cart!");
        } else {
            firestore.collection('cart')
            .add({
                userId: auth.currentUser.uid,
                productId: product.id,
                productTitle: product.name,
                price: product.price,
                category: product.category,
                productImage: product.image,
                description: product.description,
                popular: 'popular',
                postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
                Alert.alert(
                    'Added Cart!',
                    'Your product is added successfully!',
                );
            })
            .catch((error) => {
                alert(error.message)
            })
        }

        navigation.navigate("Cart")
 }

 const addToWishlist = () => {
    if(ids && ids.includes(product.id)){
        alert("Item is already in your Wishlist!")
    } else {
        firestore.collection('wishlist')
        .add({
            userId: auth.currentUser.uid,
            productId: product.id,
            productTitle: product.name,
            price: product.price,
            category: product.category,
            productImage: product.image,
            description: product.description,
            popular: 'popular',
            postTime: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
            Alert.alert(
                'Added Wishlist!',
                'Your product is added successfully!',
            );
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    navigation.navigate("WhishList")
    }


      useEffect(() => {
        getProductIds();
    }, []);

    return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageWrapper}>
                    <BackButton previousScreen={() => navigation.navigate("Home")} />
                    <ScrollView
                        onScroll={(event) => handleOnchange(event.nativeEvent)}
                        scrollEventThrottle={16} 
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.imageWrapper}
                    >
                   {
                    product?.image && product?.image?.map((e, index) => 
                        <View key={index}>
                            <Image style={styles.imageWrapper} resizeMode='stretch' source={{uri: e}} />
                        </View>
                    )
                   }
                    </ScrollView>
                    <View style={styles.imageWrapperNav}>
                        {
                            product?.image && product?.image?.map((e, index) => 
                                <Text 
                                    key={e}
                                    style={activeImage == index ? styles.activeImageNav : styles.activeImage}
                                ></Text>
                            )
                        }
                    </View>
                    
                </View>
                    <View style={styles.productDetailesContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                        { product.postTime && <Text style={styles.postedTime}>Posted: {moment(product.postTime.toDate()).fromNow()}</Text>}
                        <View style={styles.productDetailsRow}>
                            {product.condition ? <Text style={styles.productDescriptionName}>Condition:</Text> : ""}
                            {product.condition ? <Text style={styles.productDescription}>{product.condition}</Text> : ""}
                        </View>
                        {
                            product.description ? (
                            <View style={styles.productDetailsRow}>
                                {product.description ? <Text style={styles.productDescriptionName}>Description:</Text> : ""}
                                {product.description ? <Text style={styles.productDescription}>{product.description}</Text> : ""}
                            </View>
                            ) : ""
                        }
                    </View>
                    <View style={styles.productDetailesContactRow}>
                        <Pressable style={ (ids && ids.includes(product.id)) ? styles.productFavoriteIconActive : styles.productFavoriteIcon} onPress={addToWishlist}>
                            <Ionicons name="bookmark-outline" size={24} color={ (ids && ids.includes(product.id)) ? AppColors.white : AppColors.subBlack} />
                        </Pressable>
                        <Pressable style={styles.addToCartButton} onPress={addToCart}>
                            <Text style={styles.buttonText}>Add to cart</Text>
                        </Pressable>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
      paddingTop: Device === "ios" ? 40 : 30,
    },
    imageWrapper: {
        width: WIDTH,
        height: HEIGHT * 0.60,
    },
    imageWrapperNav: {
        position: 'absolute',
        bottom: 27,
        right: 27,
        flexDirection: 'row',
    },
    activeImageNav: {
        margin: 3, 
        backgroundColor: AppColors.primary,
        width: 30,
        height: 4,
        borderRadius: 50,
    },
    activeImage: {
        margin: 3, 
        backgroundColor: AppColors.white,
        width: 15,
        height: 4,
        borderRadius: 50,
    },
    productImage: {
        width: '100%',
        height: 300,
        position: 'relative',
        zIndex: -1,
    },
    productBackButton: {
        position: 'absolute',
        top: 53,
        left: 32,
        zIndex: 999,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.favIconBg,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.favIconBg,
    },
    productDetailesContainer: {
        width: '100%',
        maxHeight: 500,
        paddingHorizontal: 20,
        borderWidth: 3,
        borderColor: AppColors.borderGray,
        marginVertical: 20,
    },
    productName: {
        fontSize: 22,
        fontWeight: '400',
        color: AppColors.labelGray,
        marginBottom: 2,
    },
    productPrice: {
        fontSize: 26,
        fontWeight: '600',
        color: AppColors.black,
        marginBottom: 10,
    },
    postedTime: {
        fontSize: 14
    },
    productDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    productDescriptionName: {
        color: AppColors.black,
        fontWeight: '700',
        fontSize: 14,
    },
    productDescription: {
        width: '50%',
        textAlign: 'right'
    },
    productDetailesContactRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 50,
    },
    productFavoriteIcon: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.favIconBg,
        width: 56,
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.favIconBg,
        ...Platform.select({
            ios: {
              shadowColor: AppColors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    productFavoriteIconActive: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.primary,
        width: 56,
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.primary,
        ...Platform.select({
            ios: {
              shadowColor: AppColors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    addToCartButton: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.primary,
        backgroundColor: AppColors.primary,
        paddingHorizontal: 10,
        paddingVertical: 14,
        gap: 8,
        marginVertical: 12,
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        ...Platform.select({
            ios: {
              shadowColor: AppColors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    buttonText: {
        color: AppColors.white,
        fontWeight: '500',
        fontSize: 16,
    }
  });

export default SingleProductDetailsScreen;