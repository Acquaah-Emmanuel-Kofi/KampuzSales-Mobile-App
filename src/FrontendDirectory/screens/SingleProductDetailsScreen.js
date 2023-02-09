import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, ScrollView, Text, View, Pressable } from "react-native";
import { BackButton } from "../components/buttons";
import CediSign from "../components/CediSign";
import  Colors  from "../data/colors";

function SingleProductDetailsScreen({route}) {
    const navigation = useNavigation();
    const product = route.params
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <BackButton previousScreen={() => navigation.navigate("Home")} />
                    <Image style={styles.productImage} source={{uri: product.image}} />
                </View>
                    <View style={styles.productDetailesContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                        <View style={styles.productDetailsRow}>
                            <Text style={styles.productDescriptionName}>Condition: </Text>
                            <Text style={styles.productDescription}>No fault, blah blah blah</Text>
                        </View>
                        <View style={styles.productDetailsRow}>
                            <Text style={styles.productDescriptionName}>RAM: </Text>
                            <Text style={styles.productDescription}>32GB</Text>
                        </View>
                        <View style={styles.productDetailsRow}>
                            <Text style={styles.productDescriptionName}>Storage: </Text>
                            <Text style={styles.productDescription}>1TB SSD</Text>
                        </View>
                        <View style={styles.productDetailsRow}>
                            <Text style={styles.productDescriptionName}>Processor: </Text>
                            <Text style={styles.productDescription}>Intel Core i9</Text>
                        </View>
                        <View style={styles.productDetailsRow}>
                            <Text style={styles.productDescriptionName}>Display Size: </Text>
                            <Text style={styles.productDescription}>17”/17.3”</Text>
                        </View>
                        <View style={styles.productDetailsRow}>
                            <Text style={styles.productDescriptionName}>Location: </Text>
                            <Text style={styles.productDescription}>Market Circle</Text>
                        </View>
                        <View style={styles.productDetailsRow}>
                            <Text style={styles.productDescriptionName}>Description: </Text>
                            <Text style={styles.productDescription}>
                                Brand New Alienware m17r4 with 
                                big storage and a very fast processor. Price is negotiable
                            </Text>
                        </View>
                    </View>
                    <View style={styles.productDetailesContactRow}>
                        <Pressable style={styles.productFavoriteIcon} onPress={() => alert("Back!")}>
                            <Text>H</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => alert("Input field required!")}>
                            <Text style={styles.buttonText}>Contact Seller</Text>
                        </Pressable>
                    </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
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
        fontStyle: 'normal',
    },
    productDescription: {
        width: '50%',
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