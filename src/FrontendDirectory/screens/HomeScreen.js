import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, RefreshControl, FlatList, SafeAreaView, Pressable, Text } from "react-native";
import HomeNavbar from "../components/HomeScreenComponents/MainNavbar";
import HomeProducts from "../components/HomeScreenComponents/HomeProducts";
import  AppColors  from "../data/Colors";
import { firestore } from "../../BackendDirectory/config";
import { quickCategoriesData } from "../data/categoriesData";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


function HomeScreen() {

  const [ refresh, setRefresh ] = useState(false);
  const [ posts, setPosts ] = useState([]);
  const [ initialPosts, setInitialPosts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ activeCart, setActiveCart ] = useState("All");

  const fetchProducts = async () => {
    let productData = [];

    await firestore.collection('products')
    .orderBy('postTime', 'desc')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            const { productTitle, productImages, description, category, condition, price, postTime, userId} = doc.data();
            productData.push({
                id: doc.id,
                userPostId: userId,
                name: productTitle,
                image: productImages,
                description,
                price,
                category,
                condition,
                postTime,
            })
        })
    })
    .catch((error) => {
        return;
    })

    setPosts(productData);
    setInitialPosts(productData);
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
        setActiveCart(category);
        try {
          setLoading(true);
          const productsRef = firestore.collection('products');
  
          // Apply the category filter
          const filteredProductsQuery = productsRef.where('category', '==', category);
  
          let filteredProducts = [];

          await filteredProductsQuery.get()
          .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                // Extract the filtered products from the query snapshot

                const { productTitle, productImages, description, category ,price, postTime, userId} = doc.data();
                filteredProducts.push({
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

  
        if(filteredProducts.length !== 0){
          setPosts(filteredProducts);
        } else if (category === "All"){
          setPosts(initialPosts);
        } else {
          return null;
        }

        setLoading(false);

        } catch (error) {
          setLoading(false);
          console.error('Error fetching and filtering products:', error);
        }
      };

  const renderCategoryItem = ({ item }) => {
    return (
        <Pressable
          id={item._id}
          style={styles.navCategoryItems} 
          onPress={() => fetchProductsByCategory(item.name)}>
            <View style={[styles.navCategoryIcon, (item.name === activeCart ? {backgroundColor: AppColors.favIconBg} : null)]}>
              <MaterialIcons name={item.image} size={30} color={AppColors.cartIconGray} />
            </View>
          <Text style={styles.navCategoryName}>{item.name}</Text>
        </Pressable>
    )
  }

    return (
        <SafeAreaView style={styles.container}>            
        <HomeNavbar />
            <ScrollView 
              showsVerticalScrollIndicator={false}
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
                  data={quickCategoriesData}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item) => item._id}
                  horizontal={true}
                  flashScrollIndicators={false}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            </View>
              <HomeProducts products={posts} loading={loading} />
            </ScrollView>
        </SafeAreaView>
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