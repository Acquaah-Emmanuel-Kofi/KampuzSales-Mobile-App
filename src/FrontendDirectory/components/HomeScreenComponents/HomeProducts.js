import React from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import  AppColors  from "../../data/Colors";
import ProductCard from "../cards/ProductCard";

function HomeProducts({products, loading}) {

    return (
        <View style={styles.container}>
          {loading ? (
            <View style={styles.activityIndicatorIcon}>
                <ActivityIndicator size="large" color={AppColors.primary} />
            </View>
          ) : (
            <ScrollView 
                contentContainerStyle={styles.scrollViewContainer} 
                showsVerticalScrollIndicator={false}>
                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </ScrollView>
          )}
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
        width: 180,
        height: 256,
        paddingVertical: 2,
        paddingTop: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: AppColors.white,
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
    },
    activityIndicatorIcon:{
        marginTop: '50%',
    }
  });

export default HomeProducts;