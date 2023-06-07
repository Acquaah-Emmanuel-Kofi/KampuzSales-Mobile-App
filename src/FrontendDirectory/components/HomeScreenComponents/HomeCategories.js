import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import  AppColors  from "../../data/Colors";
import categoriesData from "../../data/categoriesData";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function HomeCategories() {

  const renderCategoryItem = ({ item }) => {
    return (
      <View>
        <Pressable style={styles.navCategoryItems}>
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
      alignItems: 'center',
      justifyContent: 'center',
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

export default HomeCategories;