import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { CustomButton } from "../components/buttons";
import CartItems from "../components/CartScreenComponents/CartItems";
import CediSign from "../components/CediSign";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import  AppColors  from "../data/Colors";
import { auth, firestore } from "../../BackendDirectory/config";


function CartScreen({navigation}) {

    const [ cartData, setCartData ] = useState([]);
    const [ totalAmount, setTotalAmount ] = useState(null);
    const [ deleted, setDeleted ] = useState(false);

    const fetchProducts = async () => {
        try {
            
            let productData = [];
            let productsPrices = [];

            await firestore.collection('cart')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { productTitle, price, userId } = doc.data();
                    productData.push({
                        id: doc.id,
                        productTitle,
                        price,
                        userId,
                    })
                })
            })

            setCartData(productData);

            
            productData && productData.map((product) => {
                {auth.currentUser.uid === product.userId ? 
                    productsPrices.push(product.price)
                : null }
            })
            
            let prices = productsPrices.reduce((accumulator, currentValue) => {
                const numericValue = parseFloat(currentValue);
                return accumulator + numericValue;
            }, 0);

            setTotalAmount(prices);

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleCheckOut = async () => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userRef = firestore.collection('users').doc(currentUser.uid);
            const userDoc = await userRef.get();
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.firstTimeCheckingOut === true) {
                    Alert.alert(
                        "First Time Purchasing?",
                        "Please, provide your information for a good service."
                    )
        
                    navigation.navigate("BuyerInfo", cartData);
                } else {
                    alert("Checked all out")
                }
            }
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
        setDeleted(false)
    }, [deleted, totalAmount, cartData]);

    return (
        <View style={styles.container}>
            <HeadTitleWithBackIcon previousScreen={() => navigation.goBack()} title={"Cart"} />
            <CartItems />
            <View style={styles.totalMarginHorizontal}>
                { totalAmount ? (
                    <>
                    <View style={styles.totalBox}>
                        <View>
                            <Text style={styles.totalText}>Total</Text>
                        </View>
                        <View>
                            <Text style={styles.totalAmount}><CediSign /> {totalAmount ? totalAmount : "0.00"}</Text>
                        </View>
                    </View>
                    <CustomButton onPress={() => handleCheckOut()} buttonText={"Check out"}  />
                    </>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
    totalMarginHorizontal: {
        marginHorizontal: 30,
        marginBottom: 30
    },
    totalBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    totalText: {
        fontSize: 20, 
        fontWeight: '700',
        color: AppColors.totalColor,
    },
    totalAmount: {
        fontSize: 20, 
        fontWeight: '700',
        color: AppColors.totalAmountColor,
    },
  });

export default CartScreen;