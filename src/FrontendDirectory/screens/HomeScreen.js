import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import HomeNavbar from "../components/HomeScreenComponents/MainNavbar";
import HomeProducts from "../components/HomeScreenComponents/HomeProducts";
import  AppColors  from "../data/Colors";
import { firestore } from "../../BackendDirectory/config";

function HomeScreen() {

  const [ refresh, setRefresh ] = useState(false);
  const [ posts, setPosts ] = useState([]);

  const fetchProducts = async () => {
    let productData = [];

    await firestore.collection('products')
    .orderBy('postTime', 'desc')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            const { productTitle, productImages, description, category ,price, postTime, userId} = doc.data();
            productData.push({
                id: doc.id,
                userPostId: userId,
                name: productTitle,
                image: productImages,
                description,
                price,
                category,
                postTime,
            })
        })
    })
    .catch((error) => {
        return;
    })

    setPosts(productData);
}

  const pullToRefresh = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
      fetchProducts();
    }, 2000)
  }

  useEffect(() => {
    fetchProducts();
}, []);

    return (
        <View style={styles.container}>            
        <HomeNavbar />
            <ScrollView 
              contentInsetAdjustmentBehavior="automatic"
              refreshControl={
                <RefreshControl 
                  refreshing={refresh}
                  onRefresh={() => pullToRefresh()}
                />
              }
              >
              <HomeProducts products={posts} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
  });

export default HomeScreen;