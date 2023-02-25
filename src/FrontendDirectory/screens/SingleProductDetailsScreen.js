import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Image, ScrollView, Text, View, Pressable, SafeAreaView, Platform, Dimensions } from "react-native";
import { BackButton } from "../components/buttons";
import CediSign from "../components/CediSign";
import  Colors  from "../data/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function SingleProductDetailsScreen({route}) {
    
    const navigation = useNavigation();

    const product = route.params;

    const [ activeImage, setActiveImage ] = useState(0);

    const handleOnchange = (nativeEvent) => {
        if(nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != activeImage) {
                setActiveImage(slide);
            }
        }
    }  

    return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageWrapper}>
                    <BackButton previousScreen={() => navigation.navigate("Home")} />
                    <ScrollView
                        onScroll={(event) => handleOnchange(event.nativeEvent)}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.imageWrapper}
                    >
                   {
                    product.images?.map((e, index) => 
                        <View key={index}>
                            <Image style={styles.imageWrapper} resizeMode='stretch' source={{uri: e}} />
                        </View>
                    )
                   }
                    </ScrollView>
                    <View style={styles.imageWrapperNav}>
                        {
                            product.images?.map((e, index) => 
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
                        <View style={styles.productDetailsRow}>
                            {product.condition ? <Text style={styles.productDescriptionName}>Condition:</Text> : ""}
                            {product.condition ? <Text style={styles.productDescription}>{product.condition}</Text> : ""}
                        </View>
                        {
                            product.ram ? (
                            <View style={styles.productDetailsRow}>
                                {product.ram ? <Text style={styles.productDescriptionName}>Ram:</Text> : ""}
                                {product.ram ? <Text style={styles.productDescription}>{product.ram}</Text> : ""}
                            </View>
                            ) : ""
                        }
                        {
                            product.ram ? (
                            <View style={styles.productDetailsRow}>
                                {product.storage ? <Text style={styles.productDescriptionName}>Storage:</Text> : ""}
                                {product.storage ? <Text style={styles.productDescription}>{product.storage}</Text> : ""}
                            </View>
                            ) : ""
                        }
                        {
                            product.processor ? (
                            <View style={styles.productDetailsRow}>
                                {product.processor ? <Text style={styles.productDescriptionName}>Processor:</Text> : ""}
                                {product.processor ? <Text style={styles.productDescription}>{product.processor}</Text> : ""}
                            </View>
                            ) : ""
                        }
                        {
                            product.displaySize ? (
                            <View style={styles.productDetailsRow}>
                                {product.displaySize ? <Text style={styles.productDescriptionName}>Display Size:</Text> : ""}
                                {product.displaySize ? <Text style={styles.productDescription}>{product.displaySize}</Text> : ""}
                            </View>
                            ) : ""
                        }
                        {
                            product.location ? (
                            <View style={styles.productDetailsRow}>
                                {product.location ? <Text style={styles.productDescriptionName}>Location:</Text> : ""}
                                {product.location ? <Text style={styles.productDescription}>{product.location}</Text> : ""}
                            </View>
                            ) : ""
                        }
                        {
                            product.model ? (
                            <View style={styles.productDetailsRow}>
                                {product.model ? <Text style={styles.productDescriptionName}>Model:</Text> : ""}
                                {product.model ? <Text style={styles.productDescription}>{product.model}</Text> : ""}
                            </View>
                            ) : ""
                        }
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
                        <Pressable style={styles.productFavoriteIcon} onPress={() => alert("Added to favorites")}>
                            <Ionicons name="bookmark-outline" size={24} color={Colors.subBlack} />
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => {
                            alert("Added to cart!")
                            navigation.navigate("Cart")
                        }}>
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
      backgroundColor: Colors.white,
      paddingTop: Platform.OS === "ios" ? 40 : 30,
    },
    imageWrapper: {
        width: WIDTH,
        height: HEIGHT * 0.50,
    },
    imageWrapperNav: {
        position: 'absolute',
        bottom: 27,
        right: 27,
        flexDirection: 'row',
    },
    activeImageNav: {
        margin: 3, 
        backgroundColor: Colors.main,
        width: 30,
        height: 4,
        borderRadius: 50,
    },
    activeImage: {
        margin: 3, 
        backgroundColor: Colors.white,
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
        borderColor: Colors.favIconBg,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.favIconBg,
    },
    productDetailesContainer: {
        width: '100%',
        maxHeight: 500,
        paddingHorizontal: 20,
        borderWidth: 3,
        borderColor: Colors.borderGray,
        marginVertical: 20,
    },
    productName: {
        fontSize: 22,
        fontWeight: '400',
        color: Colors.labelGray,
        marginBottom: 2,
    },
    productPrice: {
        fontSize: 26,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
    },
    productDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    productDescriptionName: {
        color: Colors.black,
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
    },
    productFavoriteIcon: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.favIconBg,
        width: 56,
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.favIconBg,
    },
    button: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.main,
        backgroundColor: Colors.main,
        paddingHorizontal: 10,
        paddingVertical: 14,
        gap: 8,
        marginVertical: 12,
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 16,
    }
  });

export default SingleProductDetailsScreen;