import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ScrollView, Text, View, Pressable, SafeAreaView, Platform, Dimensions, Alert, ActivityIndicator } from "react-native";
import { BackButton } from "../components/buttons";
import CediSign from "../components/CediSign";
import  AppColors  from "../data/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import { firestore, firebase, auth } from "../../BackendDirectory/config";
import { generateNewDownloadLink } from "../../BackendDirectory/functionalities/functions";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function SingleProductDetailsScreen({route}) {
    
    const navigation = useNavigation();
    
    const product = route.params;

    const [ cartIds, setCartIds ] = useState([]);
    const [ wishlistIds, setWishlistIds ] = useState([]);
    const [ activeImage, setActiveImage ] = useState(0);
    const [ uploading, setUploading ] = useState(false);

    
    useEffect(() => {
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
    
        const getWishlistIds = async () => {
        
            let productIds = [];
            await firestore.collection("wishlist")
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
            setWishlistIds(productIds);
        }

        getCartIds();
        getWishlistIds();
    }, []);

    const handleOnchange = (nativeEvent) => {
        if(nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != activeImage) {
                setActiveImage(slide);
            }
        }
    } 

    const cartDetails = (image) => {
        firestore.collection('cart')
        .add({
            userId: auth.currentUser.uid,
            productTitle: product?.name,
            productId: product?.id,
            price: product?.price,
            category: product?.category,
            productImage: image,
            description: product?.description,
            postTime: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
            Alert.alert(
                'Added Cart!',
                `Your product ${product?.name} is added successfully!`,
            );
        })
        .catch((error) => {
            alert(error.message)
        })
    }

 const wishlistDetails = (image) => {
        firestore.collection('wishlist')
        .add({
            userId: auth.currentUser.uid,
            productId: product?.id,
            productTitle: product?.name,
            price: product?.price,
            category: product?.category,
            productImage: image,
            description: product?.description,
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

    const addToCart = async (originalUrl, newFolder) => {
        setUploading(true);

        if(cartIds && cartIds.includes(product.id)){
            alert("Item is already in cart!");
            setUploading(false);
        } else {
            setUploading(true);
            let imagesUrl = [];
            let imageUrl = await generateNewDownloadLink(originalUrl, newFolder);
            imagesUrl.push(imageUrl);
            
            if(imagesUrl.length > 1){
                setUploading(false)
                cartDetails(imagesUrl[0]);

                navigation.navigate("Cart");
            }
        }
    }

    const addToWishlist = async (originalUrl, newFolder) => {
        setUploading(true);

        if(wishlistIds && wishlistIds.includes(product.id)){
            alert("Item is already in your Wishlist!");
            setUploading(false);
        } else {
            setUploading(true);
            let imagesUrl = [];
            let imageUrl = await generateNewDownloadLink(originalUrl, newFolder);
            imagesUrl.push(imageUrl);
            
            if(imagesUrl){
                wishlistDetails(imagesUrl[0]);
                setUploading(false)

                navigation.navigate("Wishlist")
            }
        }
    }

    return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageWrapper}>
                    <BackButton previousScreen={() => navigation.goBack()} />
                    <ScrollView
                        onScroll={(event) => handleOnchange(event.nativeEvent)}
                        scrollEventThrottle={16} 
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.imageWrapper}
                    >
                   {
                    Array.isArray(product?.image) ?
                    (product?.image?.map((e, index) => 
                        <View key={index}>
                            <Image style={styles.imageWrapper} resizeMode='stretch' source={{uri: e}} />
                        </View>
                    )) : 
                    (product?.image ?
                        <View>
                            <Image style={styles.imageWrapper} resizeMode='stretch' source={{uri: product.image}} />
                        </View> : null
                    )
                   }
                    </ScrollView>
                    <View style={styles.imageWrapperNav}>
                        {
                            Array.isArray(product?.image) ?
                            (product?.image?.map((e, index) => 
                                <Text 
                                    key={e}
                                    style={activeImage == index ? styles.activeImageNav : styles.activeImage}
                                ></Text>
                            )) : null
                        }
                    </View>
                    
                </View>
                    <View style={styles.productDetailesContainer}>
                        <Text style={styles.productName}>{product?.name}</Text>
                        <Text style={styles.productPrice}><CediSign /> {product?.price}</Text>
                        { product?.postTime && <Text style={styles.postedTime}>Posted: {moment(product?.postTime.toDate()).fromNow()}</Text>}
                        <View style={styles.productDetailsRow}>
                            {product?.condition ? <Text style={styles.productDescriptionName}>Condition:</Text> : null}
                            {product?.condition ? <Text style={styles.productDescription}>{product?.condition}</Text> : null}
                        </View>
                        {
                            product?.description ? (
                            <View style={styles.productDetailsRow}>
                                {product?.description ? <Text style={styles.productDescriptionName}>Description:</Text> : null}
                                {product?.description ? <Text style={styles.productDescription}>{product?.description}</Text> : ""}
                            </View>
                            ) : null
                        }
                    </View>
                    <View style={styles.productDetailesContactRow}>
                        <Pressable 
                            style={ (wishlistIds && wishlistIds.includes(product?.id)) ? 
                            styles.productFavoriteIconActive : 
                            styles.productFavoriteIcon} 
                            disabled={uploading ? true : false}
                            onPress={() => addToWishlist(product?.image[0], "whislist")}>
                            <Ionicons name="bookmark-outline" size={24} color={ (wishlistIds && wishlistIds.includes(product?.id)) ? AppColors.white : AppColors.subBlack} />
                        </Pressable>
                        <Pressable 
                            style={styles.addToCartButton} 
                            onPress={() => addToCart(product?.image[0], "cart")}
                            disabled={uploading ? true : false} 
                        >
                            <Text style={styles.buttonText}>{uploading ? <ActivityIndicator size="small" color={AppColors.white} /> : "Add To Cart"}</Text>
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
      paddingTop: 40,
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