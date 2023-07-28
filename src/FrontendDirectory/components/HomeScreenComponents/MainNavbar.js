import React, { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import  AppColors  from "../../data/Colors";
import { auth, firestore } from "../../../BackendDirectory/config";

function MainNavbar() {
    const navigation = useNavigation();

    const [ numOfCart, setNumOfCart ] = useState([]);

    const fetchProducts = async () => {
        try {
            
            let productData = [];
            let items = [];

            await firestore.collection('cart')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { userId } = doc.data();
                    productData.push({
                        id: doc.id,
                        userId
                    })
                })
            })

            for (let i = 0; i < productData.length; i++){
                if (productData[i].userId == auth.currentUser.uid){
                    items.push(1)
                }
            }

            setNumOfCart(items);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [numOfCart]);


    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle="dark-content"
            />
            <View style={styles.headerWrapper}>
                <Pressable onPress={() => navigation.navigate("Search")}>
                    <Feather name="search" size={24} color={AppColors.black} />
                </Pressable>
                <Image style={styles.textLogo} source={require("../../../../assets/TextLogo.png")} />
                <Pressable onPress={() => navigation.navigate("Cart")}  style={styles.cartItems}>
                    <AntDesign name="shoppingcart" size={24} color={AppColors.black} />
                    <View style={styles.badge}>
                        <Text style={styles.numOfItems}>{numOfCart && numOfCart.length}</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 0,
    },
    textLogo: {
        width: 200, 
        height: 50,
    },
    cartItems: {
        flexDirection: 'row',
    },
    badge: {
        backgroundColor: AppColors.danger,
        borderRadius: 50,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -7,
        marginTop: -5
    },
    numOfItems: {
        color: '#fff'
    }
  });

export default MainNavbar;