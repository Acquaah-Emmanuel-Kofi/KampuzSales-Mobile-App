import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/buttons";
import CartItems from "../components/CartScreenComponents/CartItems";
import CediSign from "../components/CediSign";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import  AppColors  from "../data/Colors";
import { auth, firestore } from "../../BackendDirectory/config";


function CartScreen({navigation}) {

    const [ totalAmount, setTotalAmount ] = useState(null);
    const [ deleted, setDeleted ] = useState(false);

    const fetchProducts = async () => {
        try {
            
            let productData = [];
            let products = [];

            await firestore.collection('cart')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { price, userId } = doc.data();
                    productData.push({
                        id: doc.id,
                        price,
                        userId,
                    })
                })
            })

            
            productData && productData.map((product) => {
                {auth.currentUser.uid === product.userId ? 
                products.push(product.price)
                : null }
            })
            
            let prices = products.reduce((accumulator, currentValue) => {
                const numericValue = parseFloat(currentValue);
                return accumulator + numericValue;
            }, 0);

            setTotalAmount(prices);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
        setDeleted(false)
    }, [deleted, totalAmount]);

    return (
        <View style={styles.container}>
            <View>
                <HeadTitleWithBackIcon previousScreen={() => navigation.navigate("Home")} title={"Cart"} />
            </View>
            <CartItems />
            <View style={styles.totalMarginHorizontal}>
                <View style={styles.totalBox}>
                <View>
                    <Text style={styles.totalText}>Total</Text>
                </View>
                <View>
                    <Text style={styles.totalAmount}><CediSign /> {totalAmount ? totalAmount : "0.00"}</Text>
                </View>
                </View>
                <CustomButton onPress={() => alert("Checked all items out!")} buttonText={"Check out"}  />
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