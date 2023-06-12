import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import  AppColors  from "../../data/Colors";
import CediSign from "../CediSign";
import categoriesData from "../../data/categoriesData";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function HomeProducts({products}) {
    const navigation = useNavigation();

    const renderCategoryItem = ({ item }) => {
    return (
      <View>
        <Pressable style={styles.navCategoryItems} onPress={() => alert(item.name)}>
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
        <View style={styles.categories}>
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
        <ScrollView 
            contentContainerStyle={styles.scrollViewContainer} 
            showsVerticalScrollIndicator={false}
        >
        {
            products && products.map((product) => (
                <Pressable key={product.id} style={styles.productCard} onPress={() => navigation.navigate("Single", product)}>
                    {
                        product?.image ? (
                        <View style={styles.imageBox}>
                            <Image style={styles.image} resizeMode='stretch' source={{uri: product?.image[0]}} alt={product.name} />
                            <Image style={styles.imageCartTag} source={require('../../data/images/Cart.png')} />
                        </View>
                        ) : (
                            <View style={styles.noImage}>
                              <MaterialIcons name={"broken-image"} size={50} color={AppColors.cartIconGray} />
                            </View>
                        )
                    }
                    <View style={styles.productDetailsBox}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                    </View>
                </Pressable>
            ))
        }
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
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
    },
    scrollViewContainer: {
        backgroundColor: AppColors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    productCard: {
        // width: 157,
        // height: 256,
        width: 180,
        height: 256,
        paddingVertical: 2,
        paddingTop: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: AppColors.white,
        // backgroundColor: 'transparent',
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
    imageBox: {
        position: 'relative',
    },
    imageCartTag: {
        width: 25,
        height: 25,
        position: 'absolute',
        bottom: 12,
        right: 12,
    },
    image: {
        width: 170,
        height: 200,
        borderRadius: 5,
    },
    noImage: {
        width: 170,
        height: 200,
        borderRadius: 5,
        backgroundColor: AppColors.borderGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productDetailsBox: {
        paddingTop: 12,
    },
    productName: {
        color: AppColors.labelGray,
        fontSize: 14,
        fontWeight: '400',
    },
    productPrice: {
        color: AppColors.black,
        fontSize: 14,
        fontWeight: '600',
    }
  });

export default HomeProducts;