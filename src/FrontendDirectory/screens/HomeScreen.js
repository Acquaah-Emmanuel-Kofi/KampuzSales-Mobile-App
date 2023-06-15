import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, RefreshControl, FlatList, Pressable, Text } from "react-native";
import HomeNavbar from "../components/HomeScreenComponents/MainNavbar";
import HomeProducts from "../components/HomeScreenComponents/HomeProducts";
import  AppColors  from "../data/Colors";
import { firestore } from "../../BackendDirectory/config";
import categoriesData from "../data/categoriesData";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function HomeScreen() {

  const [ refresh, setRefresh ] = useState(false);
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(false);

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

      // Function to fetch and filter products by category
      const fetchProductsByCategory = async (category) => {
        console.log(category);
        setLoading(true);
        try {
          const productsRef = firestore.collection('products');
  
          // Apply the category filter
          const filteredProductsQuery = productsRef.where('category', '==', category);
  
          // Execute the query
          const querySnapshot = await filteredProductsQuery.get();
  
          // Extract the filtered products from the query snapshot
          const filteredProducts = querySnapshot.docs.map((doc) => doc.data());
  
          console.log(`${category}: `, filteredProducts);
          (filteredProducts.length !== 0 ? setPosts(filteredProducts) : null)
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error fetching and filtering products:', error);
        }
      };

  const renderCategoryItem = ({ item }) => {
    return (
      <View id={item._id}>
        <Pressable style={styles.navCategoryItems} onPress={() => fetchProductsByCategory(item.name)}>
          <View style={styles.navCategoryIcon}>
            <MaterialIcons name={item.image} size={30} color={AppColors.cartIconGray} />
          </View>
          <Text style={styles.navCategoryName}>{item.name}</Text>
        </Pressable>
      </View>
    )
  }

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
          <View style={styles.container}>
            <>
              <FlatList 
                data={categoriesData}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item._id}
                horizontal={true}
                flashScrollIndicators={false}
               />
            </>
          </View>
              <HomeProducts products={posts} loading={loading} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
    categories: {
      flex: 1,
      backgroundColor: AppColors.white,
      alignItems: 'center',
      justifyContent: 'center', 
      ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
          },
          android: {
            elevation: 5,
          },
      })
  },
    navCategoryItems: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    navCategoryIcon: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.favIconBg,
        backgroundColor: AppColors.favIconBg,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navCategoryName: {
      paddingTop: 10,
    }
  });

export default HomeScreen;